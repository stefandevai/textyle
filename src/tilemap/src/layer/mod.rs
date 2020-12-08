pub mod fill;
use wasm_bindgen::prelude::*;
use std::fmt;
extern crate web_sys;

//macro_rules! log {
  //( $( $t:tt )* ) => {
    //web_sys::console::log_1(&format!( $( $t )* ).into());
  //}
//}

#[wasm_bindgen]
pub struct Layer {
  name: String,
  order: u32,
  width: u32,
  height: u32,
  tiles: Vec<i32>,
}

#[wasm_bindgen]
impl Layer {
  pub fn new(width: u32, height: u32) -> Layer {
    let tiles = vec![-1; (width * height) as usize];

    Layer {
      name: "".to_string(),
      order: 0,
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

  pub fn get(&self, x: i32, y: i32) -> i32 {
    let idx = self.get_index(x, y);

    // TODO: better handling of out of bounds
    if (idx as u32) >= self.width * self.height {
      return -1;
    }

    self.tiles[idx]
  }

  pub fn get_name(&self) -> String {
    self.name.to_string()
  }

  pub fn get_order(&self) -> u32 {
    self.order
  }

  pub fn set(&mut self, x: i32, y: i32, value: i32) {
    let idx = self.get_index(x, y);
    // TODO: better handling of out of bounds
    if (idx as u32) >= self.width * self.height {
      return;
    }

    self.tiles[idx] = value;
  }

  pub fn set_name(&mut self, name: &str) {
    self.name = name.to_string();
  }

  pub fn set_order(&mut self, order: u32) {
    self.order = order;
  }
}

impl Layer {
  fn get_index(&self, x: i32, y: i32) -> usize {
    (y * (self.width as i32) + x) as usize
  }

  pub fn get_all_tiles(&self) -> &[i32] {
    &self.tiles
  }

  pub fn set_tiles(&mut self, tiles: &[(i32, i32)], value: i32) {
    for (x, y) in tiles.iter().cloned() {
      let idx = self.get_index(x, y);
      self.tiles[idx] = value;
    }
  }

}

// Write Layer in csv format
impl fmt::Display for Layer {
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
