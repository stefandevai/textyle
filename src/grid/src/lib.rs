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
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }
}

#[wasm_bindgen]
impl Grid {
    pub fn new(width: u32, height: u32) -> Grid {
        utils::set_panic_hook();

        let tiles = vec![Tile{frame: 1};
                         (width * height + 1) as usize];

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

    pub fn set_value(&mut self, row: u32, column: u32, value: i32) {
        let idx = self.get_index(row, column);
        self.tiles[idx] = Tile{frame: value};
    }

    pub fn get_value(&self, row: u32, column: u32) -> i32 {
        let idx = self.get_index(row, column);

        // TODO: better handling of out of bounds
        if (idx as u32) > self.width * self.height {
            return -1;
        }

        self.tiles[idx].frame
    }

    pub fn tiles(&self) -> *const Tile {
        self.tiles.as_ptr()
    }
}

