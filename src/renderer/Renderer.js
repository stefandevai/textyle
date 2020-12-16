/**
 * @file A WebGL renderer that consumes 2D sprites and renders them using batches.
 */

import store from "redux/store";
import TilemapInstance from "tilemap";
import ShaderProgram from "renderer/Shader";
import Batch2D from "renderer/Batch2D";
import Texture from "renderer/Texture";
import Camera from "renderer/Camera";
import { UNIFORM_MVP, BATCH_VERTEX_SHADER_SOURCE, BATCH_FRAGMENT_SHADER_SOURCE } from "renderer/constants";

// TODO: Provide a method to change tile size per layer
const tileSize = [32, 32];

class Renderer {
  hasInitialized = false;

  init = (gl) => {
    this.gl = gl;
    if (!this.gl) {
      return;
    }

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.shaderProgram = new ShaderProgram(this.gl, BATCH_VERTEX_SHADER_SOURCE, BATCH_FRAGMENT_SHADER_SOURCE);
    this.shaderProgram.use();

    this.camera = new Camera(this.gl.canvas.width, this.gl.canvas.height);

    this.shaderProgram.setMat4(UNIFORM_MVP, this.camera.getMvp());

    this.batch = new Batch2D(this.gl, this.shaderProgram);

    this.hasInitialized = true;
  };

  setClearColor = (r, g, b, a) => {
    this.gl.clearColor(r, g, b, a);
  };

  updateViewport = (width, height) => {
    this.camera.updateViewport(width, height);
  }

  render = () => {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.renderGrid();
    window.requestAnimationFrame(this.render);
  };

  renderGrid = () => {
    // Return early if the wasm module hasn't loaded yet
    if (!TilemapInstance.hasInitialized) {
      return;
    }

    this.shaderProgram.use();

    // TODO: Get offset and zoom from camera
    // to get the actual tiles to render from rust
    const canvasWidth = this.gl.canvas.width;
    const canvasHeight = this.gl.canvas.height;
    const layersState = store.getState().layers;
    this.shaderProgram.setMat4(UNIFORM_MVP, this.camera.getMvp());

    this.batch.begin();

    for (const layerName of layersState.names) {
      const layer = layersState.layers[layerName];
      if (!layer.visible) {
        continue;
      }

      if (layer.id >= 0) {
        for (let i = 0, y = 0; y < canvasHeight; i++, y += tileSize[1]) {
          for (let j = 0, x = 0; x < canvasWidth; j++, x += tileSize[0]) {
            const value = TilemapInstance.get(j, i, layer.id);

            if (value != -1) {
              this.batch.emplace(value, [x, y]);
            }
          }
        }
      }
    }

    this.batch.flush();
    this.batch.render();
  };
}

const RendererInstance = new Renderer();

export default RendererInstance;
