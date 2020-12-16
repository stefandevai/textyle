/**
 * @file Handles the loading of raw WebGL Textures.
 */

import { getImageBitmap } from "utils/file";
import { getTileUV } from "utils/tile";

class Texture {
  constructor(gl, name) {
    this.name = name;
    this.create(gl);
  }

  create = (gl) => {
    this.id = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.id);

    this.width = 1;
    this.height = 1;
    const pixel = new Uint8Array([0, 0, 0, 0]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

    getImageBitmap(this.name).then((bitmap) => {
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

  bind = (gl) => {
    gl.bindTexture(gl.TEXTURE_2D, this.id);
  };

  getUV = (frame, frameSize) => {
    return getTileUV(frame, frameSize, [this.width, this.height]);
  };
}

export default Texture;
