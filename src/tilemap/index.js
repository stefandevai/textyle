import * as formats from 'ui/sidebar/export/formats';
import { dumpJson } from 'utils/dump';

class Tilemap {
  constructor() {
    console.log('DEBUG: CONSTRUCTING GRID');
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

  addLayer = (x, y, width, height) => {
    // Set default position to (0,0)
    if (!x || !y) {
      x = 0;
      y = 0;
    }

    // Set default size to the map size
    if (!width || !height) {
      width = TilemapInstance.width();
      height = TilemapInstance.height();
    }

    this.map.add_layer(x, y, width, height);
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

  dump = (format) => {
    switch (format) {
      case formats.FORMAT_JSON:
        return dumpJson();
      default:
        return null;
    }
  }
}

const TilemapInstance = new Tilemap();
export default TilemapInstance;
