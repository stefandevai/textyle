pub mod core;
pub mod fill;
pub mod dump;
mod utils;

use wasm_bindgen::prelude::*;
use std::fmt;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

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

// Write grid in csv format
impl fmt::Display for Grid {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    let mut idx = 0;
    let total_tiles = self.width * self.height - 1;

    for line in self.tiles.as_slice().chunks(self.width as usize) {
      for &tile in line {
        if idx == total_tiles {
          write!(f, "{}", tile.value)?;
        } else {
          write!(f, "{},", tile.value)?;
        }

        idx += 1;
      }
      write!(f, "\n")?;
    }

    Ok(())
  }
}

