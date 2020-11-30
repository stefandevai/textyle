import ShaderProgram from './shader';
import Batch2D from './batch2d';
import { mat4 } from 'gl-matrix';
import { createTexture } from './texture';
import {
  BATCH_VERTEX_SHADER_SOURCE,
  BATCH_FRAGMENT_SHADER_SOURCE,
  TEST_VERTEX_SHADER_SOURCE,
  TEST_FRAGMENT_SHADER_SOURCE,
} from '../../../store/constants';

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

    const verts = new Float32Array([
      // pos     // texcoords
      0.5,  0.5, 1.0, 1.0, // top-right
      0.5, -0.5, 1.0, 0.0, // bottom-right
     -0.5,  0.5, 0.0, 1.0, // top-left

      0.5, -0.5, 1.0, 0.0, // bottom-right
     -0.5, -0.5, 0.0, 0.0, // bottom-left
     -0.5,  0.5, 0.0, 1.0, // top-left
    ]);
    this.testVBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.testVBO);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, verts, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 4 * 4, 0); // pos
    this.gl.enableVertexAttribArray(0);
    this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 4 * 4, 2 * 4); // texcoords
    this.gl.enableVertexAttribArray(1);
    // TEMP

    //this.shaderProgram = new ShaderProgram(this.gl, BATCH_VERTEX_SHADER_SOURCE, BATCH_FRAGMENT_SHADER_SOURCE);
    //this.shaderProgram.use();

    //const projectionMatrix = mat4.create();
    //mat4.ortho(projectionMatrix, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 0, 0.1, 100.0);
    //const modelViewMatrix = mat4.create();
    //mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -50.0]);

    //this.shaderProgram.setMat4('uProjectionMatrix', projectionMatrix);
    //this.shaderProgram.setMat4('uModelViewMatrix', modelViewMatrix);

    //this.batch = new Batch2D(gl, this.shaderProgram);
  }

  setClearColor = (r, g, b, a) => {
    this.gl.clearColor(r, g, b, a);
  }

  render = () => {
    //const tileSize = 32;
    //const canvasWidth = this.gl.canvas.clientWidth;
    //const canvasHeight = this.gl.canvas.clientHeight;

    //for (let i = 0; i < canvasWidth; i += tileSize) {
      //for (let j = 0; j < canvasHeight; j += tileSize) {
        //this.batch.emplace({ position: {x: i, y: j}, size: {w: tileSize, h: tileSize} });
      //}
    //}

    //this.batch.flush();

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    //this.batch.render();

    this.testShaderProgram.use();
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.testShaderProgram.setInt('uSampler', 0);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.testVBO);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    window.requestAnimationFrame (this.render);
  }
}

const MainRenderer = new Renderer();

export default MainRenderer;
