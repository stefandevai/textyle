import Texture from 'renderer/Texture';

class TextureManager {
  constructor() {
    this.map = new Map();
  }

  add(gl, name) {
    //const texture = new Texture(gl, name);
    //return this.map.set(name, texture);
    return this.map.set(name, new Texture(gl, name));
  }

  get(name) {
    return this.map.get(name);
  }

  has(name) {
    return this.map.has(name);
  }

  remove(name) {
    this.map.delete(name);
  }
}

export default TextureManager;
