use super::{Grid, Tile, utils};
use wasm_bindgen::prelude::*;

extern crate web_sys;

//macro_rules! log {
  //( $( $t:tt )* ) => {
    //web_sys::console::log_1(&format!( $( $t )* ).into());
  //}
//}

impl Grid {
  fn get_index(&self, x: i32, y: i32) -> usize {
    (y * (self.width as i32) + x) as usize
  }

  pub fn get_all_tiles(&self) -> &[Tile] {
    &self.tiles
  }

  pub fn set_tiles(&mut self, tiles: &[(i32, i32)], value: i32) {
    for (x, y) in tiles.iter().cloned() {
      let idx = self.get_index(x, y);
      self.tiles[idx] = Tile{value};
    }
  }

}

#[wasm_bindgen]
impl Grid {
  pub fn new(width: u32, height: u32) -> Grid {
    utils::set_panic_hook();

    let tiles = vec![Tile{value: -1};
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

    self.tiles[idx] = Tile{value};
  }

  pub fn get(&self, x: i32, y: i32) -> i32 {
    let idx = self.get_index(x, y);

    // TODO: better handling of out of bounds
    if (idx as u32) >= self.width * self.height {
      return -1;
    }

    self.tiles[idx].value
  }
}
