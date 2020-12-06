pub mod core;
pub mod fill;
mod utils;

use wasm_bindgen::prelude::*;
use std::fmt;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Tile {
  value: i32,
}

#[wasm_bindgen]
pub struct Grid {
  width: u32,
  height: u32,
  tiles: Vec<Tile>,
}

impl fmt::Display for Grid {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for line in self.tiles.as_slice().chunks(self.width as usize) {
      for &tile in line {
        write!(f, "{}", tile.value)?;
      }
      write!(f, "\n")?;
    }

    Ok(())
  }
}

