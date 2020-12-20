#![cfg(target_arch = "wasm32")]

extern crate tilemap;
use tilemap::layer::Layer;

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

// ..
// ..
// to
// **
// **
#[wasm_bindgen_test]
fn test_fill_empty_layer() {
    let mut layer = Layer::new(0, 0, 2, 2, 0, 0);
    layer.fill(0, 0, 2);

    let mut expected_layer = Layer::new(0, 0, 2, 2, 0, 0);
    expected_layer.set_tiles(&[(0, 0), (0, 1), (1, 0), (1, 1)], 2);

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
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
    let mut layer = Layer::new(0, 0, 5, 5, 0, 0);
    layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (4, 1),
            (0, 2),
            (4, 2),
            (0, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    layer.fill(2, 2, 2);

    let mut expected_layer = Layer::new(0, 0, 5, 5, 0, 0);
    expected_layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (0, 2),
            (1, 2),
            (2, 2),
            (3, 2),
            (4, 2),
            (0, 3),
            (1, 3),
            (2, 3),
            (3, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
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
    let mut layer = Layer::new(0, 0, 5, 5, 0, 0);
    layer.set_tiles(
        &[
            (1, 1),
            (2, 1),
            (3, 1),
            (1, 2),
            (2, 2),
            (3, 2),
            (1, 3),
            (2, 3),
            (3, 3),
        ],
        2,
    );

    layer.fill(4, 4, 2);

    let mut expected_layer = Layer::new(0, 0, 5, 5, 0, 0);
    expected_layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (0, 2),
            (1, 2),
            (2, 2),
            (3, 2),
            (4, 2),
            (0, 3),
            (1, 3),
            (2, 3),
            (3, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
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
    let mut layer = Layer::new(0, 0, 5, 5, 0, 0);
    layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (1, 1),
            (4, 1),
            (0, 2),
            (4, 2),
            (0, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    layer.fill(3, 2, 2);

    let mut expected_layer = Layer::new(0, 0, 5, 5, 0, 0);
    expected_layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (0, 2),
            (1, 2),
            (2, 2),
            (3, 2),
            (4, 2),
            (0, 3),
            (1, 3),
            (2, 3),
            (3, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
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
    let mut layer = Layer::new(0, 0, 5, 5, 0, 0);
    layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (4, 1),
            (0, 2),
            (4, 2),
            (0, 3),
            (3, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    layer.fill(1, 1, 2);

    let mut expected_layer = Layer::new(0, 0, 5, 5, 0, 0);
    expected_layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (0, 2),
            (1, 2),
            (2, 2),
            (3, 2),
            (4, 2),
            (0, 3),
            (1, 3),
            (2, 3),
            (3, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
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
    let mut layer = Layer::new(0, 0, 5, 5, 0, 0);
    layer.set_tiles(
        &[
            (1, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (3, 1),
            (1, 2),
            (2, 2),
            (3, 2),
            (1, 3),
            (2, 3),
            (3, 3),
        ],
        2,
    );

    layer.fill(4, 4, 2);

    let mut expected_layer = Layer::new(0, 0, 5, 5, 0, 0);
    expected_layer.set_tiles(
        &[
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (0, 2),
            (1, 2),
            (2, 2),
            (3, 2),
            (4, 2),
            (0, 3),
            (1, 3),
            (2, 3),
            (3, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
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
    let mut layer = Layer::new(0, 0, 5, 5, 0, 0);
    layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (4, 0),
            (0, 1),
            (4, 1),
            (0, 2),
            (2, 2),
            (3, 2),
            (4, 2),
            (0, 3),
            (4, 3),
            (0, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    layer.fill(2, 4, 2);

    let mut expected_layer = Layer::new(0, 0, 5, 5, 0, 0);
    expected_layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (4, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (0, 2),
            (1, 2),
            (2, 2),
            (3, 2),
            (4, 2),
            (0, 3),
            (1, 3),
            (2, 3),
            (3, 3),
            (4, 3),
            (0, 4),
            (1, 4),
            (2, 4),
            (3, 4),
            (4, 4),
        ],
        2,
    );

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
}

// ...
// .*.
// ...
// **.
// to
// ***
// ***
// ***
// ***
#[wasm_bindgen_test]
fn test_fill_irregular5() {
    let mut layer = Layer::new(0, 0, 3, 4, 0, 0);
    layer.set_tiles(&[(1, 1), (0, 3), (1, 3)], 2);

    layer.fill(2, 3, 2);

    let mut expected_layer = Layer::new(0, 0, 3, 4, 0, 0);
    //expected_layer.set_tiles(&[(0, 0), (1, 0), (2, 0),
    //(0, 1), (1, 1), (2, 1),
    //(0, 2), (1, 2), (2, 2),
    //(0, 3), (1, 3)],
    //2);
    expected_layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (0, 2),
            (1, 2),
            (2, 2),
            (0, 3),
            (1, 3),
            (2, 3),
        ],
        2,
    );

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
}

// **.*
// ....
// ****
// .***
// to
// ****
// ****
// ****
// .***
#[wasm_bindgen_test]
fn test_fill_irregular6() {
    let mut layer = Layer::new(0, 0, 4, 4, 0, 0);
    layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (3, 0),
            (0, 2),
            (1, 2),
            (2, 2),
            (3, 2),
            (1, 3),
            (2, 3),
            (3, 3),
        ],
        2,
    );

    layer.fill(2, 1, 2);

    let mut expected_layer = Layer::new(0, 0, 4, 4, 0, 0);
    expected_layer.set_tiles(
        &[
            (0, 0),
            (1, 0),
            (2, 0),
            (3, 0),
            (0, 1),
            (1, 1),
            (2, 1),
            (3, 1),
            (0, 2),
            (1, 2),
            (2, 2),
            (3, 2),
            (1, 3),
            (2, 3),
            (3, 3),
        ],
        2,
    );

    assert_eq!(&layer.get_all_tiles(), &expected_layer.get_all_tiles());
}
