import ShaderProgram from './shader';
import { mat4 } from 'gl-matrix';

class Renderer {
  init = (gl) => {
    this.gl = gl;
    if (!this.gl) {
      return;
    }

    const vertexSource = `attribute vec4 aVertexPosition;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
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
    mat4.translate(modelViewMatrix, modelViewMatrix, [this.gl.canvas.clientWidth / 2.0, this.gl.canvas.clientHeight / 2.0, -50.0]);
    mat4.scale(modelViewMatrix, modelViewMatrix, [200.0, 200.0, 0.0]);

    this.shaderProgram.setMat4('uProjectionMatrix', projectionMatrix);
    this.shaderProgram.setMat4('uModelViewMatrix', modelViewMatrix);

    const positions = new Float32Array([
      -0.5, -0.5, 0.0, // bottom-left
       0.5, -0.5, 0.0, // botom-right
      -0.5,  0.5, 0.0, // top-left
       0.5,  0.5, 0.0, // top-right
    ]);

    const indices = new Uint16Array([
      0, 1, 2,
      3, 1, 2,
    ]);

    const VBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, VBO);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);

    const EBO = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, EBO);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);
  }

  setClearColor = (r, g, b, a) => {
    this.gl.clearColor(r, g, b, a);
  }

  render = () => {

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame (this.render);
  }
}

const MainRenderer = new Renderer();

export default MainRenderer;
