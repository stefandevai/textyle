use super::utils;
use crate::layer::Layer;
use std::collections::HashMap;
use std::fmt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Tilemap {
    layers: HashMap<u32, Layer>,
    next_id: u32,
    width: u32,
    height: u32,
    x: i32,
    y: i32,
}

impl fmt::Display for Tilemap {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for (_, layer) in self.layers.iter() {
            write!(f, "{}\n\n", layer)?;
        }

        Ok(())
    }
}
impl Tilemap {
    fn calculate_dimensions(&mut self) {
        let mut top = 0;
        let mut right = 0;
        let mut bottom = 0;
        let mut left = 0;

        let mut first_time = true;

        for (_, layer) in &self.layers {
            if first_time {
                top = layer.y();
                right = layer.x() + layer.width_in_pixels() as i32;
                bottom = layer.y() + layer.height_in_pixels() as i32;
                left = layer.x();

                first_time = false;
                continue;
            }

            top = std::cmp::min(top, layer.y());
            right = std::cmp::max(right, layer.x() + layer.width_in_pixels() as i32);
            bottom = std::cmp::max(bottom, layer.y() + layer.height_in_pixels() as i32);
            left = std::cmp::min(left, layer.x());
        }

        self.x = left;
        self.y = top;
        self.width = (right - left) as u32;
        self.height = (bottom - top) as u32;
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
            width: 0,
            height: 0,
            x: 0,
            y: 0,
        }
    }

    // Add a new layer and return it's index in the own HashMap
    pub fn add_layer(
        &mut self,
        x: i32,
        y: i32,
        width: u32,
        height: u32,
        tile_width: u32,
        tile_size: u32,
    ) -> u32 {
        let layer = Layer::new(x, y, width, height, tile_width, tile_size);
        let last_id = self.next_id;

        self.layers.insert(self.next_id, layer);
        self.next_id += 1;

        self.calculate_dimensions();

        last_id
    }

    pub fn x(&self) -> i32 {
        self.x
    }

    pub fn y(&self) -> i32 {
        self.y
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
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

    pub fn layer_width(&self, layer_id: u32) -> u32 {
        match self.layers.get(&layer_id) {
            Some(layer) => layer.width(),
            None => 0,
        }
    }

    pub fn layer_height(&self, layer_id: u32) -> u32 {
        match self.layers.get(&layer_id) {
            Some(layer) => layer.height(),
            None => 0,
        }
    }

    pub fn layer_width_in_pixels(&self, layer_id: u32) -> u32 {
        match self.layers.get(&layer_id) {
            Some(layer) => layer.width_in_pixels(),
            None => 0,
        }
    }

    pub fn layer_height_in_pixels(&self, layer_id: u32) -> u32 {
        match self.layers.get(&layer_id) {
            Some(layer) => layer.height_in_pixels(),
            None => 0,
        }
    }

    pub fn layer_x(&self, layer_id: u32) -> i32 {
        match self.layers.get(&layer_id) {
            Some(layer) => layer.x(),
            None => -1,
        }
    }

    pub fn layer_y(&self, layer_id: u32) -> i32 {
        match self.layers.get(&layer_id) {
            Some(layer) => layer.y(),
            None => -1,
        }
    }
}
