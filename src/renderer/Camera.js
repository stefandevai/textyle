import { mat4 } from 'gl-matrix';

const ZOOM_MAX = 5.0;
const ZOOM_MIN = 0.3;

class Camera {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.zoom = 1.0;
    this.cameraZ = 50.0;
    this.position = [0.0, 0.0, this.cameraZ];
    this.near = 0.1;
    this.far = 100.0;
    this.projection = mat4.create();
    this.modelView = mat4.create();
    this.mvp = mat4.create();

    mat4.translate(this.modelView, this.modelView, [0.0, 0.0, -this.cameraZ]);
    this.calculateMvp();
  }

  setPosition = (x, y) => {
    this.position = [x, y, this.cameraZ];
    this.calculateMvp();
  }

  setZoom = (zoom) => {
    // Clamp zoom value
    this.zoom = this.clampZoom(zoom);
    this.calculateMvp();
  }

  applyZoom = (zoom) => {
    this.zoom *= zoom;
    this.zoom = this.clampZoom(this.zoom);
    this.calculateMvp();
  }

  getMvp = () => {
    return this.mvp;
  }

  calculateMvp = () => {
    mat4.ortho(this.projection,
               this.position[0] / this.zoom,
               (this.width + this.position[0]) / this.zoom,
               (this.height + this.position[1]) / this.zoom,
               this.position[1] / this.zoom,
               this.near,
               this.far);

    mat4.multiply(this.mvp, this.projection, this.modelView);
  }

  clampZoom = (zoom) => {
    return Math.min(Math.max(zoom, ZOOM_MIN), ZOOM_MAX);
  }
};

export default Camera;
