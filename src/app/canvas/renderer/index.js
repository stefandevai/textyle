import ShaderProgram from './shader';
import Batch2D from './batch2d';
import { mat4 } from 'gl-matrix';
import {
  VERTEX_SHADER_SOURCE,
  FRAGMENT_SHADER_SOURCE,
} from '../../../store/constants';

class Renderer {
  init = (gl) => {
    this.gl = gl;
    if (!this.gl) {
      return;
    }

    this.shaderProgram = new ShaderProgram(this.gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
    this.shaderProgram.use();

    const projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 0, 0.1, 100.0);
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -50.0]);

    this.shaderProgram.setMat4('uProjectionMatrix', projectionMatrix);
    this.shaderProgram.setMat4('uModelViewMatrix', modelViewMatrix);

    this.batch = new Batch2D(gl, this.shaderProgram);
  }

  setClearColor = (r, g, b, a) => {
    this.gl.clearColor(r, g, b, a);
  }

  render = () => {
    const tileSize = 32;
    const canvasWidth = this.gl.canvas.clientWidth;
    const canvasHeight = this.gl.canvas.clientHeight;

    for (let i = 0; i < canvasWidth; i += tileSize) {
      for (let j = 0; j < canvasHeight; j += tileSize) {
        this.batch.emplace({ position: {x: i, y: j}, size: {w: tileSize, h: tileSize} });
      }
    }

    this.batch.flush();

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.batch.render();
    //window.requestAnimationFrame (this.render);
  }
}

const MainRenderer = new Renderer();

export default MainRenderer;
