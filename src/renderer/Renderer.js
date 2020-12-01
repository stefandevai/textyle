import { mat4 } from 'gl-matrix';
import ShaderProgram from 'renderer/Shader';
import Batch2D from 'renderer/Batch2D';
import Texture from 'renderer/Texture';
import {
  BATCH_VERTEX_SHADER_SOURCE,
  BATCH_FRAGMENT_SHADER_SOURCE,
} from 'renderer/constants';

class Renderer {
  hasInitialized = false

  init = (gl) => {
    console.log('DEBUG: CONSTRUCTING RENDERER');
    this.gl = gl;
    if (!this.gl) {
      return;
    }

    // TODO: Allow changing tileSize
    this.tileSize = 32;

    // TEMP
    this.texture = new Texture(this.gl, 'tileset');
    // TEMP

    this.shaderProgram = new ShaderProgram(this.gl, BATCH_VERTEX_SHADER_SOURCE, BATCH_FRAGMENT_SHADER_SOURCE);
    this.shaderProgram.use();

    const projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, 0, this.gl.canvas.width, this.gl.canvas.height, 0, 0.1, 100.0);
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -50.0]);

    this.shaderProgram.setMat4('uProjectionMatrix', projectionMatrix);
    this.shaderProgram.setMat4('uModelViewMatrix', modelViewMatrix);

    this.batch = new Batch2D(this.gl, this.shaderProgram);
    this.hasInitialized = true;
  }

  setClearColor = (r, g, b, a) => {
    this.gl.clearColor(r, g, b, a);
  }

  updateViewport = (width, height) => {
    this.gl.viewport(0, 0, width, height);
    const projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, 0, width, height, 0, 0.1, 100.0);
    this.shaderProgram.use();
    this.shaderProgram.setMat4('uProjectionMatrix', projectionMatrix);
  }

  render = () => {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.shaderProgram.use();

    const canvasWidth = this.gl.canvas.width;
    const canvasHeight = this.gl.canvas.height;

    this.batch.begin();

    for (let i = 0; i < canvasWidth; i += this.tileSize) {
      for (let j = 0; j < canvasHeight; j += this.tileSize) {
        this.batch.emplace({ position: [i, j],
                             size: [this.tileSize, this.tileSize],
                             frame: 1,
                             texture: 'tileset'});
      }
    }

    this.batch.flush();

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.texture.bind(this.gl);
    this.shaderProgram.setInt('uSampler', 0);

    this.batch.render();

    window.requestAnimationFrame(this.render);
  }
}

export default Renderer;
