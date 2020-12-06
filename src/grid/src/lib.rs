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
    fn get_index(&self, x: i32, y: i32) -> usize {
        (y * (self.width as i32) + x) as usize
    }

    fn can_fill(&self, x: i32, y: i32, value_to_fill: i32) -> bool {
        x >= 0 &&
        y >= 0 &&
        x <= self.width as i32 &&
        y <= self.height as i32 &&
        self.get(x, y) == value_to_fill
    }

    fn local_fill(&mut self, x: i32, y: i32, value: i32, value_to_fill: i32) {
        let mut my = y;
        let mut mx = x;

        loop {
            let ox = mx;
            let oy = my;

            //while my != 0 && self.get(mx, my - 1) == value_to_fill {
            while my != 0 && self.can_fill(mx, my - 1, value_to_fill) {
                my -= 1;
            }
            //while mx != 0 && self.get(mx - 1, my) == value_to_fill {
            while mx != 0 && self.can_fill(mx - 1, my, value_to_fill) {
                mx -= 1;
            }
            if mx == ox && my == oy {
                break;
            }
        }
        self.local_fill_core(mx, my, value, value_to_fill);
    }

    fn local_fill_core(&mut self, x: i32, y: i32, value: i32, value_to_fill: i32) {
        let mut last_row_length = 0;
        let mut my = y;
        let mut mx = x;

        loop {

            let mut row_length = 0;
            let mut sx = mx;

            //if last_row_length != 0 && self.get(mx, my) != value_to_fill {
            if last_row_length != 0 && !self.can_fill(mx, my, value_to_fill) {
                loop {
                    last_row_length -= 1;
                    if last_row_length == 0 {
                        return;
                    }

                    mx += 1;
                    //if self.get(mx, my) == value_to_fill {
                    if self.can_fill(mx, my, value_to_fill) {
                        break;
                    }
                }
                sx = mx;
            }
            else {
                loop {
                    //if mx == 0 || self.get(mx - 1, my) != value_to_fill {
                    if mx == 0 || !self.can_fill(mx - 1, my, value_to_fill) {
                        break;
                    }

                    mx -= 1;
                    self.set(mx, my, value);

                    //if my != 0 && self.get(mx, my - 1) == value_to_fill {
                    if my != 0 && self.can_fill(mx, my - 1, value_to_fill) {
                        self.local_fill(mx, my - 1, value, value_to_fill);
                    }

                    row_length -= 1;
                    last_row_length -= 1;
                }

            }


            loop {
                //if sx >= self.width as i32 || self.get(sx, my) != value_to_fill {
                if sx >= self.width as i32 || !self.can_fill(sx, my, value_to_fill) {
                    break;
                }

                self.set(sx, my, value);

                row_length += 1;
                sx += 1;
            }

            if row_length < last_row_length {
                let end = mx + last_row_length;

                loop {
                    sx += 1;
                    if sx >= end {
                        break;
                    }

                    //if self.get(sx, my) == value_to_fill {
                    if self.can_fill(sx, my, value_to_fill) {
                        self.local_fill_core(sx, my, value, value_to_fill);
                    }
                }
            }
            else if row_length > last_row_length && my != 0 {
                let mut ux = mx + last_row_length;
                loop {
                    ux += 1;
                    if ux >= sx {
                        break;
                    }

                    //if self.get(ux, my - 1) == value_to_fill {
                    if self.can_fill(ux, my - 1, value_to_fill) {
                        self.local_fill(ux, my - 1, value, value_to_fill);
                    }
                }
            }

            last_row_length = row_length;
            my += 1;
            if last_row_length == 0 && my >= self.height as i32 {
                break;
            }
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

    pub fn set(&mut self, x: i32, y: i32, value: i32) {
        let idx = self.get_index(x, y);
        // TODO: better handling of out of bounds
        if (idx as u32) >= self.width * self.height {
            return;
        }

        self.tiles[idx] = Tile{frame: value};
    }

    pub fn get(&self, x: i32, y: i32) -> i32 {
        let idx = self.get_index(x, y);

        // TODO: better handling of out of bounds
        if (idx as u32) >= self.width * self.height {
            return -1;
        }

        self.tiles[idx].frame
    }

    pub fn fill(&mut self, x: i32, y: i32, value: i32) {
        let current_value = self.get(x, y);
        if current_value != value {
            self.local_fill(x, y, value, current_value);
        }

    }

}

