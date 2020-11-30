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
  constructor(gl, shaderProgram) {
    this.gl = gl;
    this.shaderProgram = shaderProgram;
    this.create();
  }

  create = () => {
    const maxSprites  = 10000;
    const floatsPerVertex = 6;
    const bytesPerVertex = 4 * floatsPerVertex;
    //const floatsPerVertex = 2;
    const floatsPerSprite = floatsPerVertex * 4;
    const totalFloats = maxSprites * floatsPerSprite;
    const indicesSize = 6 * maxSprites;

    this.vertices = new Float32Array(totalFloats);
    this.indices = createIndices(indicesSize);

    this.VBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.DYNAMIC_DRAW);

    // Position
    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, bytesPerVertex, 0);
    this.gl.enableVertexAttribArray(0);

    // Color
    this.gl.vertexAttribPointer(1, 4, this.gl.FLOAT, false, bytesPerVertex, 2 * 4);
    this.gl.enableVertexAttribArray(1);

    this.EBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.EBO);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);

    // Used for emplacing sprites
    this.vertexIndex = 0;

    // Used for rendering
    this.indexCount = 0;
  }

  emplace = (sprite) => {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();

    // Top left
    this.vertices[this.vertexIndex++] = sprite.position.x;
    this.vertices[this.vertexIndex++] = sprite.position.y;
    this.vertices[this.vertexIndex++] = r;
    this.vertices[this.vertexIndex++] = g;
    this.vertices[this.vertexIndex++] = b;
    this.vertices[this.vertexIndex++] = 1.0;

    // Top right
    this.vertices[this.vertexIndex++] = sprite.position.x + sprite.size.w;
    this.vertices[this.vertexIndex++] = sprite.position.y;
    this.vertices[this.vertexIndex++] = r;
    this.vertices[this.vertexIndex++] = g;
    this.vertices[this.vertexIndex++] = b;
    this.vertices[this.vertexIndex++] = 1.0;

    // Bottom right
    this.vertices[this.vertexIndex++] = sprite.position.x + sprite.size.w;
    this.vertices[this.vertexIndex++] = sprite.position.y + sprite.size.h;
    this.vertices[this.vertexIndex++] = r;
    this.vertices[this.vertexIndex++] = g;
    this.vertices[this.vertexIndex++] = b;
    this.vertices[this.vertexIndex++] = 1.0;

    // Bottom left
    this.vertices[this.vertexIndex++] = sprite.position.x;
    this.vertices[this.vertexIndex++] = sprite.position.y + sprite.size.h;
    this.vertices[this.vertexIndex++] = r;
    this.vertices[this.vertexIndex++] = g;
    this.vertices[this.vertexIndex++] = b;
    this.vertices[this.vertexIndex++] = 1.0;

    this.indexCount += 6;
  }

  flush = () => {
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.vertices.subarray(0, this.vertexIndex));
    this.vertexIndex = 0;
  }

  render = () => {
    if (this.indexCount === 0) {
      return;
    }

    //this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
    //this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.EBO);

    this.gl.drawElements(this.gl.TRIANGLES, this.indexCount, this.gl.UNSIGNED_SHORT, 0);
    this.indexCount = 0;
  }
}
