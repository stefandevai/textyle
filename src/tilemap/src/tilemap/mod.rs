use crate::layer::Layer;
use super::utils;
use wasm_bindgen::prelude::*;
use std::fmt;

#[wasm_bindgen]
pub struct Tilemap {
  grids: Vec<Layer>,
}

impl fmt::Display for Tilemap {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for grid in &self.grids {
      write!(f, "{}\n\n", grid)?;
    }

    Ok(())
  }
}

#[wasm_bindgen]
impl Tilemap {
  pub fn new() -> Tilemap {
    utils::set_panic_hook();

    Tilemap {
      grids: Vec::new(),
    }
  }

}
