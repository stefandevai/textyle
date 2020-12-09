use crate::layer::Layer;
use super::utils;
use wasm_bindgen::prelude::*;
use std::collections::HashMap;
use std::fmt;

#[wasm_bindgen]
pub struct Tilemap {
  layers: HashMap<u32, Layer>,
  next_id: u32,
}

impl fmt::Display for Tilemap {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for (_, layer) in self.layers.iter() {
      write!(f, "{}\n\n", layer)?;
    }

    Ok(())
  }
}

#[wasm_bindgen]
impl Tilemap {
  // Creates a new tilemap
  pub fn new() -> Tilemap {
    utils::set_panic_hook();

    Tilemap {
      layers: HashMap::new(),
      next_id: 0,
    }
  }

  // Adds a new layer and return it's index in the own HashMap
  pub fn add_layer(&mut self, width: u32, height: u32) -> u32 {
    let layer = Layer::new(width, height);
    let last_id = self.next_id;

    self.layers.insert(self.next_id, layer);
    self.next_id += 1;

    last_id
  }

  pub fn set(&mut self, x: i32, y: i32, value: i32, layer_id: u32) {
    match self.layers.get_mut(&layer_id) {
      Some(layer) => layer.set(x, y, value),
      None => println!("Layer with id {} not found", layer_id),
    };
  }

  pub fn get(&self, x: i32, y: i32, layer_id: u32) -> i32 {
    match self.layers.get(&layer_id) {
      Some(layer) => layer.get(x, y),
      None => -1,
    }
  }

  pub fn fill(&mut self, x: i32, y: i32, value: i32, layer_id: u32) {
    match self.layers.get_mut(&layer_id) {
      Some(layer) => layer.fill(x, y, value),
      None => println!("Layer with id {} not found", layer_id),
    }
  }
}
