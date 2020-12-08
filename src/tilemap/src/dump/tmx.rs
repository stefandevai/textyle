use crate::layer::Layer;
use xmlwriter::{XmlWriter, Options};
extern crate xmlwriter;

pub fn dump(grid: &Layer) -> String {
  let mut writer = XmlWriter::new(Options::default());
  writer.start_element("map");
  writer.write_attribute("version", "1.4");
  writer.write_attribute("tiledversion", "1.4.3");
  writer.write_attribute("orientation", "orthogonal");
  writer.write_attribute("renderorder", "right-down");
  writer.write_attribute("width", &grid.width().to_string());
  writer.write_attribute("height", &grid.height().to_string());
  writer.write_attribute("tilewidth", "32");
  writer.write_attribute("tileheight", "32");
  writer.write_attribute("infinite", "0");
  writer.write_attribute("nextlayerid", "2");
  writer.write_attribute("nextobjectid", "1");

  writer.start_element("layer");
  writer.write_attribute("id", "1");
  writer.write_attribute("name", "Tile Layer 1");
  writer.write_attribute("width", &grid.width().to_string());
  writer.write_attribute("height", &grid.height().to_string());
  
  writer.start_element("data");
  writer.write_attribute("encoding", "csv");
  writer.write_text(&format!("{}", grid));

  writer.end_document()
}
