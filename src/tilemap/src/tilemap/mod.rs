use crate::layer::Layer;
use super::utils;
use wasm_bindgen::prelude::*;
use std::fmt;

#[wasm_bindgen]
pub struct Tilemap {
  name: String,
  layers: Vec<Layer>,
}

impl fmt::Display for Tilemap {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for layer in &self.layers {
      write!(f, "{}\n\n", layer)?;
    }

    Ok(())
  }
}

#[wasm_bindgen]
impl Tilemap {
  pub fn new() -> Tilemap {
    utils::set_panic_hook();

    Tilemap {
      name: "".to_string(),
      layers: Vec::new(),
    }
  }

  pub fn set_name(&mut self, name: &str) {
    self.name = name.to_string();
  }

  pub fn add_layer(&mut self, width: u32, height: u32, name: &str) {
    let mut layer = Layer::new(width, height);
    layer.set_name(name);
    layer.set_order((self.layers.len() - 1) as u32);
    self.layers.push(layer);
  }

  pub fn reorder_layers(&mut self) {
    self.layers.sort_unstable_by_key(|l| l.get_order());
  }
}
