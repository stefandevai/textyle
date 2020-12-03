import { mat4 } from 'gl-matrix';
import ShaderProgram from 'renderer/Shader';
import Batch2D from 'renderer/Batch2D';
import Texture from 'renderer/Texture';
import {
  BATCH_VERTEX_SHADER_SOURCE,
  BATCH_FRAGMENT_SHADER_SOURCE,
} from 'renderer/constants';

let Grid = {}

class Renderer {
  hasInitialized = false

  init = (gl) => {
    console.log('DEBUG: CONSTRUCTING RENDERER');
    this.wasm = {}
    this.wasmHasLoaded = false;
    this.loadWasm();

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
    this.renderGrid();
    window.requestAnimationFrame(this.render);
  }

  renderGrid = () => {
    // Return early if the wasm module hasn't loaded yet
    if (!this.grid) {
      return;
    }

    this.shaderProgram.use();

    // TODO: Get offset and zoom from camera
    // to get the actual tiles to render from rust
    const canvasWidth = this.gl.canvas.width;
    const canvasHeight = this.gl.canvas.height;

    this.batch.begin();

    for (let i = 0, y = 0; y < canvasHeight; i++, y += this.tileSize) {
      for (let j = 0, x = 0; x < canvasWidth; j++, x += this.tileSize) {
        const value = this.grid.get_value(i, j);

        if (value !== -1) {
          this.batch.emplace({ position: [x, y],
                               size: [this.tileSize, this.tileSize],
                               frame: value,
                               texture: 'tileset'});
        }
      }
    }

    this.batch.flush();

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.texture.bind(this.gl);
    this.shaderProgram.setInt('uSampler', 0);

    this.batch.render();
  }

  loadWasm = async () => {
    try {
      const { memory } = await import('grid/pkg/canvas_bg');
      this.memory = memory;

      const { Grid } = await import('grid/pkg');
      this.grid = Grid.new(this.gl.canvas.width / this.tileSize, this.gl.canvas.height / this.tileSize);
      this.grid.set_value(0, 0, 28);
      this.grid.set_value(1, 1, 28);
    } catch (err) {
      console.error(`[x] Error loading grid: ${err.message}`);
    }
  }
}

const RendererInstance = new Renderer();

export default RendererInstance;
