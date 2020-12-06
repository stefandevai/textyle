function createShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
    const info = gl.getShaderInfoLog(shader);
    console.error('Could not compile shader: ' + info);
  }

  return shader;
}

class ShaderProgram {
  constructor(gl, vertexSource, fragmentSource) {
    this.gl = gl;
    this.vertexSource = vertexSource;
    this.fragmentSource = fragmentSource;
    this.init();
  }

  init = () => {
    const vertexShader = createShader(this.gl, this.vertexSource, this.gl.VERTEX_SHADER);
    const fragmentShader = createShader(this.gl, this.fragmentSource, this.gl.FRAGMENT_SHADER);

    this.id = this.gl.createProgram();
    this.gl.attachShader(this.id, vertexShader);
    this.gl.attachShader(this.id, fragmentShader);
    this.gl.linkProgram(this.id);

    if (!this.gl.getProgramParameter(this.id, this.gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.id));
      return null;
    }
  }

  use = () => {
    this.gl.useProgram(this.id);
  }

  setMat4 = (uniformName, value) => {
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.id, uniformName), false, value);
  }

  setInt = (uniformName, value) => {
    this.gl.uniform1i(this.gl.getUniformLocation(this.id, uniformName), value);
  }
}

export default ShaderProgram;
