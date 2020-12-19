/**
 * A WebGL renderer that consumes 2D sprites and renders them using batches.
 * @module Renderer
 */

import reduxStore from "redux/store";
import TilemapInstance from "tilemap";
import ShaderProgram from "renderer/Shader";
import Batch2D from "renderer/Batch2D";
import Texture from "renderer/Texture";
import Camera from "renderer/Camera";
import { UNIFORM_MVP, BATCH_VERTEX_SHADER_SOURCE, BATCH_FRAGMENT_SHADER_SOURCE } from "renderer/constants";

// TODO: Provide a method to change tile size per layer
const tileSize = [32, 32];

/** A class that handles WebGL rendering of tiles using a Batch2D. */
class Renderer {
  hasInitialized = false;

  /**
   * Creates a Renderer.
   *
   * @param {WebGLContext} gl - WebGL Context from a canvas.
   */
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

  /**
   * Sets a color to clear the screen each frame. In this case, it sets the canvas background color.
   *
   * @param {number} r - Red component of the color in the range [0.0, 1.0].
   * @param {number} g - Green component of the color in the range [0.0, 1.0].
   * @param {number} b - Blue component of the color in the range [0.0, 1.0].
   * @param {number} a - Alpha component of the color in the range [0.0, 1.0].
   */
  setClearColor = (r, g, b, a) => {
    this.gl.clearColor(r, g, b, a);
  };

  /**
   * Updates the camera viewport.
   *
   * @param {number} width - New viewport's width.
   * @param {number} height - New viewport's height.
   */
  updateViewport = (width, height) => {
    this.camera.updateViewport(width, height);
  }

  /**
   * Main render loop.
   */
  render = () => {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.renderTilemap();
    window.requestAnimationFrame(this.render);
  };

  /**
   * Batches tiles and renders tilemap.
   */
  renderTilemap = () => {
    // Abort rendering process if the wasm module hasn't been loaded yet
    if (!TilemapInstance.hasInitialized) {
      return;
    }

    this.shaderProgram.use();

    const canvasWidth = this.gl.canvas.width;
    const canvasHeight = this.gl.canvas.height;
    const layersState = reduxStore.getState().layers;
    this.shaderProgram.setMat4(UNIFORM_MVP, this.camera.getMvp());

    this.batch.begin();

    // Iterates through layer names from the redux reduxStore,
    // gets the corresponding tiles and renders them in order.
    for (const layerName of layersState.names) {
      const layer = layersState.layers[layerName];
      if (!layer.visible) {
        continue;
      }

      if (layer.id >= 0) {
        for (let i = 0, y = 0; y < canvasHeight; i++, y += layer.tileSize[1]) {
          for (let j = 0, x = 0; x < canvasWidth; j++, x += layer.tileSize[0]) {
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
