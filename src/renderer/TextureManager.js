import Texture from 'renderer/Texture';

class TextureManager {
  constructor() {
    this.map = new Map();
    this.indexMap = new Map();
  }

  add = (gl, name) => {
    this.indexMap.set(name, this.map.size);
    this.map.set(name, new Texture(gl, name));
  }

  get(name) {
    return this.map.get(name);
  }

  getIndex(name) {
    return this.indexMap.get(name);
  }

  has(name) {
    return this.map.has(name);
  }

  remove(name) {
    this.map.delete(name);
  }
}

export default TextureManager;
