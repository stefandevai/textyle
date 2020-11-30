import ShaderProgram from './shader';
import Batch2D from './batch2d';
import { mat4 } from 'gl-matrix';

class Renderer {
  init = (gl) => {
    this.gl = gl;
    if (!this.gl) {
      return;
    }

    const vertexSource = `attribute vec2 aVertexPosition;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 0.0, 1.0);
      }
      `;

    const fragmentSource = `void main() {
        gl_FragColor = vec4(9.0, 0.3, 0.6, 1.0);
      }
      `;

    this.shaderProgram = new ShaderProgram(this.gl, vertexSource, fragmentSource);
    this.shaderProgram.use();

    const projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 0, 0.1, 100.0);
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -50.0]);

    this.shaderProgram.setMat4('uProjectionMatrix', projectionMatrix);
    this.shaderProgram.setMat4('uModelViewMatrix', modelViewMatrix);

    this.batch = new Batch2D(gl);
  }

  setClearColor = (r, g, b, a) => {
    this.gl.clearColor(r, g, b, a);
  }

  render = () => {
    this.batch.emplace({ position: {x: 50.0, y: 50.0}, size: {w: 200.0, h: 200.0} });
    this.batch.emplace({ position: {x: 350.0, y: 350.0}, size: {w: 100.0, h: 100.0} });
    this.batch.emplace({ position: {x: 350.0, y: 100.0}, size: {w: 150.0, h: 150.0} });
    this.batch.flush();

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.batch.render(this.shaderProgram);
    //window.requestAnimationFrame (this.render);
  }
}

const MainRenderer = new Renderer();

export default MainRenderer;
