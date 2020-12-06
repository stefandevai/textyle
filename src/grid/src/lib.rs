mod utils;

extern crate web_sys;

use wasm_bindgen::prelude::*;

macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Tile {
    frame: i32,
}

#[wasm_bindgen]
pub struct Grid {
    width: u32,
    height: u32,
    tiles: Vec<Tile>,
}

impl Grid {
    fn get_index(&self, x: u32, y: u32) -> usize {
        (y * self.width + x) as usize
    }

    pub fn local_fill(&mut self, x: u32, y: u32, value: i32, filled_value: i32) {
        let mut my = y;
        let mut mx = x;

        loop {
            let ox = mx;
            let oy = my;

            while my != 0 && self.get(mx, my - 1) == filled_value {
                log!("1");
                my -= 1;
            }
            while mx != 0 && self.get(mx - 1, my) == filled_value {
                log!("2");
                mx -= 1;
            }
            if mx == ox && my == oy {
                break;
            }
        }
        self.local_fill_core(mx, my, value, filled_value);
    }

    pub fn local_fill_core(&mut self, x: u32, y: u32, value: i32, filled_value: i32) {
        let mut last_row_length = 0;
        let mut my = y;
        let mut mx = x;

        loop {

            let mut row_length = 0;
            let mut sx = mx;

            if last_row_length != 0 && self.get(mx, my) != filled_value {
                log!("13");
                loop {
                    last_row_length -= 1;
                    if last_row_length == 0 {
                        return;
                    }
                    log!("14");

                    mx += 1;
                    if self.get(mx, my) == filled_value {
                        break;
                    }
                    log!("15");
                }
                sx = mx;
            }
            else {
                log!("11");
                loop {
                    if mx == 0 || self.get(mx - 1, my) != filled_value {
                        break;
                    }
                    log!("12");

                    mx -= 1;
                    self.set(mx, my, value);

                    if my != 0 && self.get(mx, my - 1) == filled_value {
                        log!("3");
                        self.local_fill(mx, my - 1, value, filled_value);
                        log!("4");
                    }

                    log!("5");
                    log!("{}", row_length);
                    row_length -= 1;
                    log!("16");
                    last_row_length -= 1;
                }

            }


            loop {
                if sx >= self.width || self.get(sx, my) != filled_value {
                    break;
                }
                log!("10");

                self.set(sx, my, value);

                row_length += 1;
                sx += 1;
            }

            if row_length < last_row_length {
                log!("9");
                let end = mx + last_row_length;

                loop {
                    sx += 1;
                    if sx >= end {
                        break;
                    }

                    if self.get(sx, my) == filled_value {
                        self.local_fill_core(sx, my, value, filled_value);
                    }
                }
            }
            else if row_length > last_row_length && my != 0 {
                log!("8");
                let mut ux = mx + last_row_length;
                loop {
                    ux += 1;
                    if ux >= sx {
                        break;
                    }

                    if self.get(ux, my - 1) == filled_value {
                        self.local_fill(ux, my - 1, value, filled_value);
                    }
                }
            }

            log!("7");
            last_row_length = row_length;
            my += 1;
            if last_row_length == 0 && my >= self.height {
                break;
            }
            log!("6");
        }
    }
}

#[wasm_bindgen]
impl Grid {
    pub fn new(width: u32, height: u32) -> Grid {
        utils::set_panic_hook();

        let tiles = vec![Tile{frame: -1};
                         (width * height) as usize];

        Grid {
            width: width,
            height: height,
            tiles: tiles,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn set(&mut self, x: u32, y: u32, value: i32) {
        let idx = self.get_index(x, y);
        // TODO: better handling of out of bounds
        if (idx as u32) > self.width * self.height {
            return;
        }

        self.tiles[idx] = Tile{frame: value};
    }

    pub fn get(&self, x: u32, y: u32) -> i32 {
        let idx = self.get_index(x, y);

        // TODO: better handling of out of bounds
        if (idx as u32) >= self.width * self.height {
            return -1;
        }

        self.tiles[idx].frame
    }

    pub fn fill(&mut self, x: u32, y: u32, value: i32) {
        let current_value = self.get(x, y);
        if current_value != value {
            self.local_fill(x, y, value, current_value);
        }

    }

}

