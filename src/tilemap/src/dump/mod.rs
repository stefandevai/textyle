pub mod tmx;
pub mod json;
pub mod csv;

use crate::Tilegrid;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl Tilegrid {
  pub fn dump(&self, format: &str) -> String {
    match format {
      "json" => json::dump(self),
      "tmx" => tmx::dump(self),
      "csv" => csv::dump(self),
      _ => "".to_string(),
    }
  }
}
