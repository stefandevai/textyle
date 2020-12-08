pub mod core;
pub mod fill;
pub mod dump;
mod utils;

use wasm_bindgen::prelude::*;
use std::fmt;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Tilegrid {
  width: u32,
  height: u32,
  tiles: Vec<i32>,
}

#[wasm_bindgen]
pub struct Tilemap {
  grids: Vec<Tilegrid>,
}

// Write grid in csv format
impl fmt::Display for Tilegrid {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    let mut idx = 0;
    let total_tiles = self.width * self.height - 1;

    for line in self.tiles.as_slice().chunks(self.width as usize) {
      for &tile in line {
        if idx == total_tiles {
          write!(f, "{}", tile)?;
        } else {
          write!(f, "{},", tile)?;
        }

        idx += 1;
      }
      write!(f, "\n")?;
    }

    Ok(())
  }
}

impl fmt::Display for Tilemap {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for grid in &self.grids {
      write!(f, "{}\n\n", grid)?;
    }

    Ok(())
  }
}

