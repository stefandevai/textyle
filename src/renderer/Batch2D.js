import TextureManager from "renderer/TextureManager";
import TileManagerInstance from "renderer/TileManager";
import {
  ATTRIB_POSITION,
  ATTRIB_TEXTURE_COORD,
  ATTRIB_TEXTURE_IDX,
  ATTRIB_COLOR,
  UNIFORM_SAMPLERS,
} from "renderer/constants";

const createIndices = (indicesSize) => {
  let offset = 0;
  let indices = new Uint16Array(indicesSize);

  for (let i = 0; i < indicesSize; i += 6) {
    indices[i] = offset;
    indices[i + 1] = offset + 1;
    indices[i + 2] = offset + 2;

    indices[i + 3] = offset;
    indices[i + 4] = offset + 2;
    indices[i + 5] = offset + 3;

    offset += 4;
  }

  return indices;
};

export default class Batch2D {
  constructor(gl, shaderProgram) {
    this.gl = gl;
    this.shaderProgram = shaderProgram;
    this.textures = [];
    this.textureManager = new TextureManager();
    this.create();
  }

  create = () => {
    const maxSprites = 10000;
    const floatsPerVertex = 9;
    const bytesPerVertex = 4 * floatsPerVertex;
    const floatsPerSprite = floatsPerVertex * 4;
    const totalFloats = maxSprites * floatsPerSprite;
    const indicesSize = 6 * maxSprites;

    this.vertices = new Float32Array(totalFloats);
    this.indices = createIndices(indicesSize);

    this.VAO = this.gl.createVertexArray();
    this.VBO = this.gl.createBuffer();
    this.EBO = this.gl.createBuffer();

    this.gl.bindVertexArray(this.VAO);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.DYNAMIC_DRAW);

    // Position
    const locPosition = this.gl.getAttribLocation(this.shaderProgram.id, ATTRIB_POSITION);
    this.gl.vertexAttribPointer(locPosition, 2, this.gl.FLOAT, false, bytesPerVertex, 0);
    this.gl.enableVertexAttribArray(locPosition);

    // TextureCoord
    const locTextureCoord = this.gl.getAttribLocation(this.shaderProgram.id, ATTRIB_TEXTURE_COORD);
    this.gl.vertexAttribPointer(locTextureCoord, 2, this.gl.FLOAT, false, bytesPerVertex, 2 * 4);
    this.gl.enableVertexAttribArray(locTextureCoord);

    // TextureIdx
    const locTextureIdx = this.gl.getAttribLocation(this.shaderProgram.id, ATTRIB_TEXTURE_IDX);
    this.gl.vertexAttribPointer(locTextureIdx, 1, this.gl.FLOAT, false, bytesPerVertex, 4 * 4);
    this.gl.enableVertexAttribArray(locTextureIdx);

    // Color
    const locColor = this.gl.getAttribLocation(this.shaderProgram.id, ATTRIB_COLOR);
    this.gl.vertexAttribPointer(locColor, 4, this.gl.FLOAT, false, bytesPerVertex, 5 * 4);
    this.gl.enableVertexAttribArray(locColor);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.EBO);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);

    // Used for emplacing tiles
    this.vertexIndex = 0;

    // Used for rendering
    this.indexCount = 0;
  };

  begin = () => {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
  };

  emplace = (tileValue, position, color) => {
    const tileData = TileManagerInstance.get(tileValue);
    if (!tileData) {
      console.error(`Could not get tile data for tile ${tileData}`);
      return;
    }

    let r = 0.0;
    let g = 0.0;
    let b = 0.0;
    let a = 0.0;

    if (color) {
      r = color.r;
      g = color.g;
      b = color.b;
      a = color.a;
    }

    let textureIdx = 0.0;

    if (this.textureManager.has(tileData.tileset)) {
      textureIdx = this.textureManager.getIndex(tileData.tileset);
    } else {
      this.textureManager.add(this.gl, tileData.tileset);
      textureIdx = this.textureManager.getIndex(tileData.tileset);
    }

    // Top left
    this.vertices[this.vertexIndex++] = position[0];
    this.vertices[this.vertexIndex++] = position[1];
    this.vertices[this.vertexIndex++] = tileData.uv[0][0];
    this.vertices[this.vertexIndex++] = tileData.uv[0][1];
    this.vertices[this.vertexIndex++] = textureIdx;
    this.vertices[this.vertexIndex++] = r;
    this.vertices[this.vertexIndex++] = g;
    this.vertices[this.vertexIndex++] = b;
    this.vertices[this.vertexIndex++] = a;

    // Top right
    this.vertices[this.vertexIndex++] = position[0] + tileData.size[0];
    this.vertices[this.vertexIndex++] = position[1];
    this.vertices[this.vertexIndex++] = tileData.uv[1][0];
    this.vertices[this.vertexIndex++] = tileData.uv[1][1];
    this.vertices[this.vertexIndex++] = textureIdx;
    this.vertices[this.vertexIndex++] = r;
    this.vertices[this.vertexIndex++] = g;
    this.vertices[this.vertexIndex++] = b;
    this.vertices[this.vertexIndex++] = a;

    // Bottom right
    this.vertices[this.vertexIndex++] = position[0] + tileData.size[0];
    this.vertices[this.vertexIndex++] = position[1] + tileData.size[1];
    this.vertices[this.vertexIndex++] = tileData.uv[2][0];
    this.vertices[this.vertexIndex++] = tileData.uv[2][1];
    this.vertices[this.vertexIndex++] = textureIdx;
    this.vertices[this.vertexIndex++] = r;
    this.vertices[this.vertexIndex++] = g;
    this.vertices[this.vertexIndex++] = b;
    this.vertices[this.vertexIndex++] = a;

    // Bottom left
    this.vertices[this.vertexIndex++] = position[0];
    this.vertices[this.vertexIndex++] = position[1] + tileData.size[1];
    this.vertices[this.vertexIndex++] = tileData.uv[3][0];
    this.vertices[this.vertexIndex++] = tileData.uv[3][1];
    this.vertices[this.vertexIndex++] = textureIdx;
    this.vertices[this.vertexIndex++] = r;
    this.vertices[this.vertexIndex++] = g;
    this.vertices[this.vertexIndex++] = b;
    this.vertices[this.vertexIndex++] = a;

    this.indexCount += 6;
  };

  flush = () => {
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.vertices.subarray(0, this.vertexIndex));
    this.vertexIndex = 0;
  };

  render = (shader) => {
    if (this.indexCount === 0) {
      return;
    }

    let idx = 0;
    this.textureManager.map.forEach((texture) => {
      this.gl.activeTexture(this.gl.TEXTURE0 + idx);
      texture.bind(this.gl);
      this.shaderProgram.setInt(`${UNIFORM_SAMPLERS}[${idx}]`, idx);
      ++idx;
    });

    this.gl.activeTexture(this.gl.TEXTURE0);

    this.gl.bindVertexArray(this.VAO);
    this.gl.drawElements(this.gl.TRIANGLES, this.indexCount, this.gl.UNSIGNED_SHORT, 0);
    this.indexCount = 0;
  };
}
