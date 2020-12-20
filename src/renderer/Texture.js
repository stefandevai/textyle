/**
 * Handles raw WebGL Textures.
 * @module Texture
 */

import { getImageBitmap } from "utils/file";
import { getTileUV } from "utils/tile";

/** A class that handles WebGL texture creation and binding. */
class Texture {
  /**
   * Creates a Texture.
   *
   * @param {WebGLContext} gl - WebGL Context to use the WebGL API.
   * @param {string} idbKey - Key of the file stored in the idb texture store.
   */
  constructor(gl, idbKey) {
    this.idbKey = idbKey;
    this.id = null;
    this.width = 0;
    this.height = 0;
    this.init(gl);
  }

  /**
   * Initializes a Texture with a file present on the idb.
   *
   * @param {WebGLContext} gl - WebGL Context to use the WebGL API.
   */
  init = (gl) => {
    this.id = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.id);

    // Initializes the texture as a single pixel to avoid
    // blocking the main thread while the actual file is reached.
    this.width = 1;
    this.height = 1;
    const pixel = new Uint8Array([0, 0, 0, 0]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

    // If no idbKey was given, let the texture be a pixel
    if (!this.idbKey) {
      return;
    }

    getImageBitmap(this.idbKey).then((bitmap) => {
      if (!bitmap) {
        return;
      }

      this.width = bitmap.width;
      this.height = bitmap.height;

      gl.bindTexture(gl.TEXTURE_2D, this.id);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    });
  };

  /**
   * Binds the texture.
   *
   * @param {WebGLContext} gl - WebGL Context to use the WebGL API.
   */
  bind = (gl) => {
    gl.bindTexture(gl.TEXTURE_2D, this.id);
  };
}

export default Texture;
