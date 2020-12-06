#![cfg(target_arch = "wasm32")]

extern crate tilegrid;
use tilegrid::Grid;

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

// ..
// ..
// to
// **
// **
#[wasm_bindgen_test]
fn test_fill_empty_grid() {
  let mut grid = Grid::new(2, 2);
  grid.fill(0, 0, 2);

  let mut expected_grid = Grid::new(2, 2);
  expected_grid.set_tiles(&[(0, 0), (0, 1), (1, 0), (1, 1)], 2);

  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());
}

// *****
// *...*
// *...*
// *...*
// *****
// to
// *****
// *****
// *****
// *****
// *****
#[wasm_bindgen_test]
fn test_fill_square() {
  let mut grid = Grid::new(5, 5);
  grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0),
                   (0, 1), (4, 1),
                   (0, 2), (4, 2),
                   (0, 3), (4, 3),
                   (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                   2);

  grid.fill(2, 2, 2);

  let mut expected_grid = Grid::new(5, 5);
  expected_grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0),
                            (0, 1), (1, 1), (2, 1), (3, 1), (4, 1),
                            (0, 2), (1, 2), (2, 2), (3, 2), (4, 2),
                            (0, 3), (1, 3), (2, 3), (3, 3), (4, 3),
                            (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                            2);

  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());
}

// .....
// .***.
// .***.
// .***.
// .....
// to
// *****
// *****
// *****
// *****
// *****
#[wasm_bindgen_test]
fn test_fill_square_outline() {
  let mut grid = Grid::new(5, 5);
  grid.set_tiles(&[(1, 1), (2, 1), (3, 1),
                   (1, 2), (2, 2), (3, 2),
                   (1, 3), (2, 3), (3, 3)],
                   2);

  grid.fill(4, 4, 2);

  let mut expected_grid = Grid::new(5, 5);
  expected_grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0),
                            (0, 1), (1, 1), (2, 1), (3, 1), (4, 1),
                            (0, 2), (1, 2), (2, 2), (3, 2), (4, 2),
                            (0, 3), (1, 3), (2, 3), (3, 3), (4, 3),
                            (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                            2);

  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());
}

// *****
// **..*
// *...*
// *...*
// *****
// to
// *****
// *****
// *****
// *****
// *****
#[wasm_bindgen_test]
fn test_fill_irregular1() {
  let mut grid = Grid::new(5, 5);
  grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0),
                   (0, 1), (1, 1), (4, 1),
                   (0, 2), (4, 2),
                   (0, 3), (4, 3),
                   (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                   2);

  grid.fill(3, 2, 2);

  let mut expected_grid = Grid::new(5, 5);
  expected_grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0),
                            (0, 1), (1, 1), (2, 1), (3, 1), (4, 1),
                            (0, 2), (1, 2), (2, 2), (3, 2), (4, 2),
                            (0, 3), (1, 3), (2, 3), (3, 3), (4, 3),
                            (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                            2);

  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());
}

// *****
// *...*
// *...*
// *..**
// *****
// to
// *****
// *****
// *****
// *****
// *****
#[wasm_bindgen_test]
fn test_fill_irregular2() {
  let mut grid = Grid::new(5, 5);
  grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0),
                   (0, 1), (4, 1),
                   (0, 2), (4, 2),
                   (0, 3), (3, 3), (4, 3),
                   (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                   2);

  grid.fill(1, 1, 2);

  let mut expected_grid = Grid::new(5, 5);
  expected_grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0),
                            (0, 1), (1, 1), (2, 1), (3, 1), (4, 1),
                            (0, 2), (1, 2), (2, 2), (3, 2), (4, 2),
                            (0, 3), (1, 3), (2, 3), (3, 3), (4, 3),
                            (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                            2);

  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());
}

// .*...
// ****.
// .***.
// .***.
// .....
// to
// .****
// *****
// *****
// *****
// *****
#[wasm_bindgen_test]
fn test_fill_irregular3() {
  let mut grid = Grid::new(5, 5);
  grid.set_tiles(&[(1, 0),
                   (0, 1), (1, 1), (2, 1), (3, 1),
                   (1, 2), (2, 2), (3, 2),
                   (1, 3), (2, 3), (3, 3)],
                   2);

  grid.fill(4, 4, 2);

  let mut expected_grid = Grid::new(5, 5);
  expected_grid.set_tiles(&[(1, 0), (2, 0), (3, 0), (4, 0),
                            (0, 1), (1, 1), (2, 1), (3, 1), (4, 1),
                            (0, 2), (1, 2), (2, 2), (3, 2), (4, 2),
                            (0, 3), (1, 3), (2, 3), (3, 3), (4, 3),
                            (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                            2);

  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());
}

// ***.*
// *...*
// *.***
// *...*
// *..**
// to
// *****
// *****
// *****
// *****
// *****
#[wasm_bindgen_test]
fn test_fill_irregular4() {
  let mut grid = Grid::new(5, 5);
  grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (4, 0),
                   (0, 1), (4, 1),
                   (0, 2), (2, 2), (3, 2), (4, 2),
                   (0, 3), (4, 3),
                   (0, 4), (3, 4), (4, 4)],
                   2);

  grid.fill(2, 4, 2);

  let mut expected_grid = Grid::new(5, 5);
  expected_grid.set_tiles(&[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0),
                            (0, 1), (1, 1), (2, 1), (3, 1), (4, 1),
                            (0, 2), (1, 2), (2, 2), (3, 2), (4, 2),
                            (0, 3), (1, 3), (2, 3), (3, 3), (4, 3),
                            (0, 4), (1, 4), (2, 4), (3, 4), (4, 4)],
                            2);

  assert_eq!(&grid.get_all_tiles(), &expected_grid.get_all_tiles());
}
