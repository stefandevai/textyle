/**
 * Handles Shader Programs initialization and manipulation.
 * @module Shader
 */

/** A class that handles WebGL shader programs creation and uniform attribution. */
class ShaderProgram {
  /**
   * Creates a ShaderProgram.
   *
   * @param {WebGLContext} gl - WebGL Context to use the WebGL API.
   * @param {string} vertexSource - vertex shader source to be compiled.
   * @param {string} fragmentSource - fragment shader source to be compiled.
   */
  constructor(gl, vertexSource, fragmentSource) {
    this.gl = gl;
    this.vertexSource = vertexSource;
    this.fragmentSource = fragmentSource;
    this.init();
  }

  /**
   * Compiles and links the Shader program.
   */
  init = () => {
    const vertexShader = this.createShader(this.vertexSource, this.gl.VERTEX_SHADER);
    const fragmentShader = this.createShader(this.fragmentSource, this.gl.FRAGMENT_SHADER);

    this.id = this.gl.createProgram();
    this.gl.attachShader(this.id, vertexShader);
    this.gl.attachShader(this.id, fragmentShader);
    this.gl.linkProgram(this.id);

    if (!this.gl.getProgramParameter(this.id, this.gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program: " + this.gl.getProgramInfoLog(this.id));
    }
  };

  /**
   * Creates a single WebGL shader.
   *
   * @param {string} source - source code of the shader.
   * @param {number} type - either VERTEX_SHADER or FRAGMENT_SHADER.
   *
   * @returns {WebGLShader} A WebGL shader.
   */
  createShader = (source, type) => {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const info = this.gl.getShaderInfoLog(shader);
      console.error("Could not compile shader: " + info);
    }

    return shader;
  }

  /**
   * Uses the shader program.
   */
  use = () => {
    this.gl.useProgram(this.id);
  };

  /**
   * Sets a 4x4 matrix to a uniform in the shader.
   *
   * @param {string} uniformName - Name of the uniform in the shader.
   * @param {mat4} value - 4x4 matrix to be set as uniform value.
   */
  setMat4 = (uniformName, value) => {
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.id, uniformName), false, value);
  };

  /**
   * Sets a single integer to a uniform in the shader.
   *
   * @param {string} uniformName - Name of the uniform in the shader.
   * @param {number} value - integer to be set as uniform value.
   */
  setInt = (uniformName, value) => {
    this.gl.uniform1i(this.gl.getUniformLocation(this.id, uniformName), value);
  };
}

export default ShaderProgram;
