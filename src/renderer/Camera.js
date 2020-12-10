import { mat4 } from 'gl-matrix';

const ZOOM_MAX = 5.0;
const ZOOM_MIN = 0.25;
const ZOOM_THRESHOLD = 10;

const zoomLevels = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75];

class Camera {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.zoomLevel = 3;
    this.zoom = 0;
    this.perceivedWidth = this.width;
    this.perceivedHeight = this.height;
    this.origin = [0.0, 0.0];
    this.clientOrigin = [0.0, 0.0];
    this.cameraZ = 80.0;
    this.position = [0.0, 0.0, this.cameraZ];
    this.near = 0.1;
    this.far = 100.0;
    this.projection = mat4.create();
    this.modelView = mat4.create();
    this.mvp = mat4.create();

    mat4.translate(this.modelView, this.modelView, [0.0, 0.0, -this.cameraZ]);
    this.calculateMvp();
  }

  setOrigin = (x, y) => {
    this.origin = [this.position[0], this.position[1]];
    this.clientOrigin = [x, y];
  }

  moveTo = (x, y) => {
    this.position = [this.origin[0] + (this.clientOrigin[0] - x), this.origin[1] + (this.clientOrigin[1] - y), this.cameraZ];
    this.calculateMvp();
  }

  setZoom = (zoom) => {
    // Clamp zoom value
    this.zoom = this.clampZoom(zoom);
    this.calculateMvp();
  }

  applyZoom = (zoom) => {
    this.zoom += zoom;

    if (Math.abs(this.zoom) < ZOOM_THRESHOLD) {
      return;
    }

    if (this.zoom < 0) {
      this.zoomLevel = Math.max(0, this.zoomLevel - 1);
    }
    else if (this.zoom > 0) {
      this.zoomLevel = Math.min(zoomLevels.length - 1, this.zoomLevel + 1);
    }

    this.perceivedWidth = this.width / zoomLevels[this.zoomLevel];
    this.perceivedHeight = this.height / zoomLevels[this.zoomLevel];
    this.zoom = 0;
    this.calculateMvp();
  }

  getMvp = () => {
    return this.mvp;
  }

  getZoomLevel = () => {
    return zoomLevels[this.zoomLevel];
  }

  calculateMvp = () => {
    // TODO: Anchor on center when zooming
    const computedPositionX = this.position[0] / zoomLevels[this.zoomLevel];
    const computedPositionY = this.position[1] / zoomLevels[this.zoomLevel];

    mat4.ortho(this.projection,
               computedPositionX,
               this.perceivedWidth + computedPositionX,
               this.perceivedHeight + computedPositionY,
               computedPositionY,
               this.near,
               this.far);

    //mat4.ortho(this.projection,
              //(this.width - this.perceivedWidth) + this.position[0] / zoomLevels[this.zoomLevel],
              //this.perceivedWidth + this.position[0] / zoomLevels[this.zoomLevel],
              //this.perceivedHeight + this.position[1] / zoomLevels[this.zoomLevel],
              //(this.height - this.perceivedHeight) + this.position[1] / zoomLevels[this.zoomLevel],
              //this.near,
              //this.far);

    mat4.multiply(this.mvp, this.projection, this.modelView);
  }
};

export default Camera;
