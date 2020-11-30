const createIndices = (indicesSize) => {
  let offset = 0;
  let indices = new Uint16Array(indicesSize);

  for (let i = 0; i < indicesSize; i += 6)
  {
    indices[i]     = offset;
    indices[i + 1] = offset + 1;
    indices[i + 2] = offset + 2;

    indices[i + 3] = offset;
    indices[i + 4] = offset + 2;
    indices[i + 5] = offset + 3;

    offset += 4;
  }

  return indices;
}

export default class Batch2D {
  constructor(gl) {
    this.gl = gl;
    this.create();
  }

  create = () => {
    const maxSprites  = 10000;
    const floatsPerVertex = 2;
    const floatsPerSprite = floatsPerVertex * 4;
    const totalFloats = maxSprites * floatsPerSprite;
    const indicesSize = 6 * maxSprites;

    this.vertices = new Float32Array(totalFloats);
    this.indices = createIndices(indicesSize);

    this.VBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    this.EBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.EBO);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);

    // Used for emplacing sprites
    this.vertexIndex = 0;

    // Used for rendering
    this.indexCount = 0;
  }

  emplace = (sprite) => {
    // Top left
    this.vertices[this.vertexIndex++] = sprite.position.x;
    this.vertices[this.vertexIndex++] = sprite.position.y;

    // Top right
    this.vertices[this.vertexIndex++] = sprite.position.x + sprite.size.w;
    this.vertices[this.vertexIndex++] = sprite.position.y;

    // Bottom right
    this.vertices[this.vertexIndex++] = sprite.position.x + sprite.size.w;
    this.vertices[this.vertexIndex++] = sprite.position.y + sprite.size.h;

    // Bottom left
    this.vertices[this.vertexIndex++] = sprite.position.x;
    this.vertices[this.vertexIndex++] = sprite.position.y + sprite.size.h;

    this.indexCount += 6;
  }

  flush = () => {
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.vertices.subarray(0, this.vertexIndex));
    this.vertexIndex = 0;
  }

  render = (shader) => {
    if (this.indexCount === 0) {
      return;
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.EBO);

    this.gl.drawElements(this.gl.TRIANGLES, this.indexCount, this.gl.UNSIGNED_SHORT, 0);
    this.indexCount = 0;
  }
}
