#![cfg(target_arch = "wasm32")]

extern crate tilemap;
use tilemap::layer::Layer;

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_create() {
    let layer = Layer::new(0, 0, 3, 4, 0, 0);

    assert_eq!(layer.width(), 3);
    assert_eq!(layer.height(), 4);
}

#[wasm_bindgen_test]
fn test_set() {
    let mut layer = Layer::new(0, 0, 3, 3, 0, 0);
    layer.set(2, 1, 2);

    let mut expected_layer = Layer::new(0, 0, 3, 3, 0, 0);
    expected_layer.set_tiles(&[(2, 1)], 2);

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());

    layer.set(10, 10, 2);
    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());

    layer.set(-4, -4, 2);
    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());

    layer.set(2, 2, 6);
    expected_layer.set_tiles(&[(2, 2)], 6);
    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
}

#[wasm_bindgen_test]
fn test_get() {
    let mut layer = Layer::new(0, 0, 3, 3, 0, 0);
    layer.set_tiles(&[(2, 1), (1, 1)], 2);
    layer.set_tiles(&[(0, 0), (1, 2)], 8);
    assert_eq!(layer.get(2, 2), -1);
    assert_eq!(layer.get(-2, -2), -1);
    assert_eq!(layer.get(8, 4), -1);
    assert_eq!(layer.get(0, 0), 8);
    assert_eq!(layer.get(1, 2), 8);
    assert_eq!(layer.get(2, 1), 2);
    assert_eq!(layer.get(1, 1), 2);
}

#[wasm_bindgen_test]
fn test_get_dimensions() {
    let layer = Layer::new(0, 0, 3, 5, 32, 64);
    assert_eq!(layer.width(), 3);
    assert_eq!(layer.height(), 5);
    assert_eq!(layer.width_in_pixels(), 96);
    assert_eq!(layer.height_in_pixels(), 320);
}
