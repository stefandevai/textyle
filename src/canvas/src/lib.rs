mod utils;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

//#[wasm_bindgen]
//extern {
    //fn alert(s: &str);
//}

#[wasm_bindgen]
pub fn greet() {
    println!("heya");
    //alert("Hello, canvas!");
}
