class ShaderProgram {
  constructor(gl, vertexSource, fragmentSource) {
    this.gl = gl;
    this.vertexSource = vertexSource;
    this.fragmentSource = fragmentSource;
    this.init();
  }

  init = () => {
    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertexShader, this.vertexSource);
    this.gl.compileShader(vertexShader);

    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragmentShader, this.fragmentSource);
    this.gl.compileShader(fragmentShader);

    this.id = this.gl.createProgram();
    this.gl.attachShader(this.id, vertexShader);
    this.gl.attachShader(this.id, fragmentShader);
    this.gl.linkProgram(this.id);

    if (!this.gl.getProgramParameter(this.id, this.gl.LINK_STATUS)) {
      console.log('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.id));
      return null;
    }
  }

  use = () => {
    this.gl.useProgram(this.id);
  }

  setMat4 = (uniformName, value) => {
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.id, uniformName), false, value);
  }
}

export default ShaderProgram;
