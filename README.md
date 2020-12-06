# Stella Editor
A high performant web-based tilemap editor.

# Stack
- React (front end)
- Rust (WASM)
- Tailwind (CSS)

# Structure
- JS handles WebGL and Rust handles tile data, it exposes an API for editing the tilemap
  - add_tile(x, y, z)
  - remove_tile(x, y, z)
  - export()
  - create_layer("layer 1")
  - delete_layer("layer 2")
  - select_layer("layer 1")
- React consumes the WASM API, handles the interface and user input

# Goals
- [ ] Multi layer support
- [x] Multiple tilesets
- [ ] JSON export / import
- [ ] Data/entity layers
- [ ] Non tileset images
- [ ] Brushes (automap, randomized tiles)
