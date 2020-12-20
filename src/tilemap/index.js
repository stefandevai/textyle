import * as formats from 'resources/formats';
import { exportJson } from 'utils/export';

class Tilemap {
  constructor() {
    this.hasInitialized = false;
  }

  init = async (width, height) => {
    try {
      this.wasm = await import('./pkg');
      const { memory } = await import('./pkg/tilemap_bg');
      this.map = this.wasm.Tilemap.new();
      this.memory = memory;
      this.hasInitialized = true;
    } catch (err) {
      console.error(`[x] Error loading grid: ${err.message}`);
    }
  }

  width = () => {
    return this.map.width();
  }

  height = () => {
    return this.map.height();
  }

  widthInPixels = () => {
    return 0;
  }

  heightInPixels = () => {
    return 0;
  }

  addLayer = (x, y, width, height, tileSize) => {
    // Set default position to (0,0)
    if (!x || !y) {
      x = 0;
      y = 0;
    }

    // Set default size to the map size
    if (!width || !height) {
      width = TilemapInstance.width()
      height = TilemapInstance.height();
    }

    this.map.add_layer(x, y, width, height, tileSize[0], tileSize[1]);
  }

  get = (x, y, layerId) => {
    return this.map.get(x, y, layerId);
  }

  set = (x, y, value, layerId) => {
    this.map.set(x, y, value, layerId);
  }

  fill = (x, y, targetValue, layerId) => {
    this.map.fill(x, y, targetValue, layerId);
  }

  layerWidth = (layerId) => {
    return this.map.layer_width(layerId);
  }

  layerHeight = (layerId) => {
    return this.map.layer_height(layerId);
  }

  layerX = (layerId) => {
    return this.map.layer_x(layerId);
  }

  layerY = (layerId) => {
    return this.map.layer_y(layerId);
  }

  export = (format) => {
    switch (format) {
      case formats.FORMAT_JSON:
        return exportJson();
      default:
        return null;
    }
  }
}

const TilemapInstance = new Tilemap();
export default TilemapInstance;
