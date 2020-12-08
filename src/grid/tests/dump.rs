#![cfg(target_arch = "wasm32")]

extern crate tilegrid;
use tilegrid::Grid;

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_dump_tmx() {
  let grid = Grid::new(2, 2);

  let data = grid.dump("tmx");

  assert_eq!(data, "<map version=\"1.4\" tiledversion=\"1.4.3\" orientation=\"orthogonal\" renderorder=\"right-down\" width=\"2\" height=\"2\" tilewidth=\"32\" tileheight=\"32\" infinite=\"0\" nextlayerid=\"2\" nextobjectid=\"1\">\n    <layer id=\"1\" name=\"Tile Layer 1\" width=\"2\" height=\"2\">\n        <data encoding=\"csv\">\n            -1,-1,\n-1,-1\n\n        </data>\n    </layer>\n</map>\n");
}

#[wasm_bindgen_test]
fn test_dump_csv() {
  let mut grid = Grid::new(3, 3);
  grid.set_tiles(&[(1, 2)], 47);
  grid.set_tiles(&[(0, 0), (1, 0)], 0);

  let data = grid.dump("csv");

  assert_eq!(data, "0,0,-1,\n-1,-1,-1,\n-1,47,-1\n");
}
