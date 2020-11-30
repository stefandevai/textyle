import { get } from 'idb-keyval';

export async function getImageBitmap(name) {
  const fileData = await get(name);
  if (!fileData) {
    console.error(`It was not possible to get ${name} from IDB`);
    return;
  }

  return createImageBitmap(fileData);
}

export function createTexture(gl, name) {
  const id = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, id);

  const pixel = new Uint8Array([0, 0, 0, 0]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

  getImageBitmap(name).then(data => {
    if (!data) {
      return;
    }

    gl.bindTexture(gl.TEXTURE_2D, id);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);

    gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  });


  return id;
}
