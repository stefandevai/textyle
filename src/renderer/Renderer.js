import { mat4 } from 'gl-matrix';
import ShaderProgram from 'renderer/Shader';
import Batch2D from 'renderer/Batch2D';
import { createTexture } from 'renderer/Texture';
import {
  BATCH_VERTEX_SHADER_SOURCE,
  BATCH_FRAGMENT_SHADER_SOURCE,
  TEST_VERTEX_SHADER_SOURCE,
  TEST_FRAGMENT_SHADER_SOURCE,
} from 'renderer/constants';

//const base64ToBytes = (data) => {
  //const raw = window.atob(data);
  //const rawLength = raw.length;
  //const bytes = new Uint8Array(rawLength);
  //console.log(bytes.length);
  //console.log(raw.length);

  //for (let i = 0; i < rawLength; i++) {
    //bytes[i] = raw.charCodeAt(i);
  //}

  //return bytes;
//}

class Renderer {
  init = (gl) => {
    this.gl = gl;
    if (!this.gl) {
      return;
    }

    // TEMP
    this.texture = createTexture(this.gl, 'tileset');
    this.testShaderProgram = new ShaderProgram(this.gl, TEST_VERTEX_SHADER_SOURCE, TEST_FRAGMENT_SHADER_SOURCE);
    //this.testShaderProgram.use();

    this.verts = new Float32Array([
      // pos     // texcoords
      0.5,  0.5, 1.0, 1.0, // top-right
      0.5, -0.5, 1.0, 0.0, // bottom-right
     -0.5,  0.5, 0.0, 1.0, // top-left

      0.5, -0.5, 1.0, 0.0, // bottom-right
     -0.5, -0.5, 0.0, 0.0, // bottom-left
     -0.5,  0.5, 0.0, 1.0, // top-left
    ]);
    this.testVAO = this.gl.createVertexArray();
    this.testVBO = this.gl.createBuffer();
    this.gl.bindVertexArray(this.testVAO);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.testVBO);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.verts, this.gl.STATIC_DRAW);
    const locPosition = this.gl.getAttribLocation(this.testShaderProgram.id, 'aPosition');
    this.gl.vertexAttribPointer(locPosition, 2, this.gl.FLOAT, false, 4 * 4, 0); // pos
    this.gl.enableVertexAttribArray(locPosition);
    const locTexcoord = this.gl.getAttribLocation(this.testShaderProgram.id, 'aTextureCoord');
    this.gl.vertexAttribPointer(locTexcoord, 2, this.gl.FLOAT, false, 4 * 4, 2 * 4); // texcoords
    this.gl.enableVertexAttribArray(locTexcoord);
    // TEMP

    this.shaderProgram = new ShaderProgram(this.gl, BATCH_VERTEX_SHADER_SOURCE, BATCH_FRAGMENT_SHADER_SOURCE);
    this.shaderProgram.use();

    const projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 0, 0.1, 100.0);
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -50.0]);

    this.shaderProgram.setMat4('uProjectionMatrix', projectionMatrix);
    this.shaderProgram.setMat4('uModelViewMatrix', modelViewMatrix);

    this.batch = new Batch2D(this.gl, this.shaderProgram);
  }

  setClearColor = (r, g, b, a) => {
    this.gl.clearColor(r, g, b, a);
  }

  render = () => {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.shaderProgram.use();

    const tileSize = 32;
    const canvasWidth = this.gl.canvas.clientWidth;
    const canvasHeight = this.gl.canvas.clientHeight;

    this.batch.begin();

    for (let i = 0; i < canvasWidth; i += tileSize) {
      for (let j = 0; j < canvasHeight; j += tileSize) {
        this.batch.emplace({ position: {x: i, y: j}, size: {w: tileSize, h: tileSize} });
      }
    }

    this.batch.flush();
    this.batch.render();

    this.testShaderProgram.use();
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.testShaderProgram.setInt('uSampler', 0);

    this.gl.bindVertexArray(this.testVAO);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    //window.requestAnimationFrame(this.render);
  }
}

const MainRenderer = new Renderer();

export default MainRenderer;
