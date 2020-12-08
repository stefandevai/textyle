// JavaScript wrapper class
class Grid {
  constructor() {
    console.log('DEBUG: CONSTRUCTING GRID');
    this.hasInitialized = false;
  }

  init = async (width, height) => {
    try {
      this.wasm = await import('./pkg');
      const { memory } = await import('./pkg/canvas_bg');
      this.grid = this.wasm.Layer.new(width, height);
      this.memory = memory;
      this.hasLoaded = true;
    } catch (err) {
      console.error(`[x] Error loading grid: ${err.message}`);
    }
  }

  get = (x, y) => {
    return this.grid.get(x, y);
  }

  set = (x, y, value) => {
    this.grid.set(x, y, value);
  }

  fill = (x, y, targetValue) => {
    this.grid.fill(x, y, targetValue);
  }

  dump = (format) => {
    return this.grid.dump(format);
  }
}

const GridInstance = new Grid();

export default GridInstance;
