# Stella Editor
A high performant web-based tilemap editor.

# Stack
- React (front end)
- Rust (WASM)
- Bulma (CSS)

# Structure
- Rust handles OpenGL canvas with SDL, it exposes an API for editing the tilemap
  - add_tile(x, y, z)
  - remove_tile(x, y, z)
  - export()
  - create_layer("layer 1")
  - delete_layer("layer 2")
  - select_layer("layer 1")
- React consumes the WASM API, handles the interface and user input
- How to translate mouse events to rust?
- How to sync tile positions in React and in Rust?

# Goals
- Multi layer support
- Multiple tilesets
- JSON export / import
- Data layers
- Non tileset images
- Brushes (automap, randomized tiles)
