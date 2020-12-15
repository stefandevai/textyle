#![cfg(target_arch = "wasm32")]

extern crate tilemap;
use tilemap::layer::Layer;

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_dump_tmx() {
    let layer = Layer::new(0, 0, 2, 2);

    let data = layer.dump("tmx");

    assert_eq!(data, "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<map version=\"1.4\" tiledversion=\"1.4.3\" orientation=\"orthogonal\" renderorder=\"right-down\" width=\"2\" height=\"2\" tilewidth=\"32\" tileheight=\"32\" infinite=\"0\" nextlayerid=\"2\" nextobjectid=\"1\">\n    <layer id=\"1\" name=\"Tile Layer 1\" width=\"2\" height=\"2\">\n        <data encoding=\"csv\">\n            -1,-1,\n-1,-1\n\n        </data>\n    </layer>\n</map>\n");
}

#[wasm_bindgen_test]
fn test_dump_csv() {
    let mut layer = Layer::new(0, 0, 3, 3);
    layer.set_tiles(&[(1, 2)], 47);
    layer.set_tiles(&[(0, 0), (1, 0)], 0);

    let data = layer.dump("csv");

    assert_eq!(data, "0,0,-1,\n-1,-1,-1,\n-1,47,-1\n");
}
