/**
 * Manages multiple WebGL textures loaded with string keys.
 * @module TextureManager
 */

import Texture from "renderer/Texture";

/** A class that holds a Map to WebGL textures. */
class TextureManager {
  /**
   * Creates a Texture Manager.
   */
  constructor() {
    this.map = new Map();
    this.indexMap = new Map();
  }

  /**
   * Adds a new Texture to the map.
   *
   * @param {WebGLContext} gl - WebGL Context to use the WebGL API.
   * @param {string} name - Key to assign to the Texture.
   */
  add = (gl, name) => {
    this.indexMap.set(name, this.map.size);
    this.map.set(name, new Texture(gl, name));
  };

  /**
   * Gets Texture from the map.
   *
   * @param {string} name - Key previously assigned to the Texture.
   *
   * @returns {Texture} - If the key exists, Texture assigned to the key.
   */
  get(name) {
    return this.map.get(name);
  }

  /**
   * Gets the index of a Texture in the map.
   *
   * @param {string} name - Key previously assigned to the Texture.
   *
   * @returns {number} - Index of the Texture in the map.
   */
  getIndex(name) {
    return this.indexMap.get(name);
  }

  /**
   * Checks if a Texture with a certain name alreay exists on the map.
   *
   * @param {string} name - Key previously assigned to the Texture.
   *
   * @returns {bool} - True if the map has the key, false otherwise.
   */
  has(name) {
    return this.map.has(name);
  }

  /**
   * Removes a Texture from the map.
   *
   * @param {string} name - Key previously assigned to the Texture.
   */
  remove(name) {
    this.map.delete(name);
  }
}

export default TextureManager;
