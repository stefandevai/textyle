pub mod csv;
pub mod json;
pub mod tmx;

use crate::layer::Layer;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl Layer {
    pub fn dump(&self, format: &str) -> String {
        match format {
            "json" => json::dump(self),
            "tmx" => tmx::dump(self),
            "csv" => csv::dump(self),
            _ => "".to_string(),
        }
    }
}
