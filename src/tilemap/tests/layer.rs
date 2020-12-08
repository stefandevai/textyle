#![cfg(target_arch = "wasm32")]

extern crate tilemap;
use tilemap::layer::Layer;

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_create() {
  let grid = Layer::new(3, 4);

  assert_eq!(grid.width(), 3);
  assert_eq!(grid.height(), 4);
}

#[wasm_bindgen_test]
fn test_set() {
  let mut grid = Layer::new(3, 3);
  grid.set(2, 1, 2);

  let mut expected_grid = Layer::new(3, 3);
  expected_grid.set_tiles(&[(2, 1)], 2);

  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());

  grid.set(10, 10, 2);
  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());

  grid.set(-4, -4, 2);
  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());

  grid.set(2, 2, 6);
  expected_grid.set_tiles(&[(2, 2)], 6);
  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());
}

#[wasm_bindgen_test]
fn test_get() {
  let mut grid = Layer::new(3, 3);
  grid.set_tiles(&[(2, 1), (1, 1)], 2);
  grid.set_tiles(&[(0, 0), (1, 2)], 8);
  assert_eq!(grid.get(2, 2), -1);
  assert_eq!(grid.get(-2, -2), -1);
  assert_eq!(grid.get(8, 4), -1);
  assert_eq!(grid.get(0, 0), 8);
  assert_eq!(grid.get(1, 2), 8);
  assert_eq!(grid.get(2, 1), 2);
  assert_eq!(grid.get(1, 1), 2);
}
