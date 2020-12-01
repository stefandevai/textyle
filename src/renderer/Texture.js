import { getTextureBlob } from 'idb';

async function getImageBitmap(name) {
  const fileData = await getTextureBlob(name);
  if (!fileData) {
    console.error(`It was not possible to get ${name} from IDB`);
    return;
  }

  return createImageBitmap(fileData);
}

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

    getImageBitmap(this.name).then(bitmap => {
      if (!bitmap) {
        return;
      }

      this.width = bitmap.width;
      this.height = bitmap.height;

      gl.bindTexture(gl.TEXTURE_2D, this.id);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);

      gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    });
  }

  bind = (gl) => {
    gl.bindTexture(gl.TEXTURE_2D, this.id);
  }

  getFrameUV = (frame, frameSize) => {
    // If the texture has not been initialized yet
    if (this.width == 1 && this.height == 1) {
      return [
        [0.0, 0.0],
        [0.0, 0.0],
        [0.0, 0.0],
        [0.0, 0.0],
      ];
    }

    const frameWidth  = (frameSize[0] * 1.0) / this.width;
    const frameHeight = (frameSize[1] * 1.0) / this.height;
    const hFrames = Math.floor(this.width / frameSize[0]); // 8
    const vFrames = Math.floor(this.height / frameSize[1]); // 8
    const maxFrames = hFrames * vFrames; // 64

    const frameX = Math.floor(frame % hFrames);
    const frameY = Math.floor((frame % maxFrames) / hFrames);
    // Multiply the x coord of the frame in the texture atlas by the normalized value of the width one frame.
    const topLeftX = frameX * (this.width / hFrames) * 1.0 / this.width;
    // Multiply the y coord of the frame in the tile map by the normalized value of the height one frame.
    // Invert the value as the y axis is upwards for OpenGL
    const topLeftY = frameY * (this.height / vFrames) / this.height;

    return [
      [topLeftX, topLeftY],
      [topLeftX + frameWidth, topLeftY],
      [topLeftX + frameWidth, topLeftY + frameHeight],
      [topLeftX, topLeftY + frameHeight],
    ];
  }
}

export default Texture;

