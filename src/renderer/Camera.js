import { mat4 } from 'gl-matrix';

const ZOOM_MAX = 5.0;
const ZOOM_MIN = 0.25;
const ZOOM_THRESHOLD = 10;

const zoomLevels = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];

class Camera {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.zoomLevel = 3;
    this.zoom = zoomLevels[this.zoomLevel];
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
    this.zoom = 0;
    this.calculateMvp();
  }

  getMvp = () => {
    return this.mvp;
  }

  calculateMvp = () => {
    mat4.ortho(this.projection,
               this.position[0] / zoomLevels[this.zoomLevel],
               (this.width + this.position[0]) / zoomLevels[this.zoomLevel],
               (this.height + this.position[1]) / zoomLevels[this.zoomLevel],
               this.position[1] / zoomLevels[this.zoomLevel],
               this.near,
               this.far);

    mat4.multiply(this.mvp, this.projection, this.modelView);
  }

  clampZoom = (zoom) => {
    //let lastDelta = 0.0;
    //let newLevel = 0.0;
    //let firstLoop = true;

    //for (const zoomLevel of zoomLevels) {
      //if (firstLoop) {
        //lastDelta 
        //firstLoop = false;
      //}
    //}
    //return Math.min(Math.max(zoom, ZOOM_MIN), ZOOM_MAX);
  }
};

export default Camera;
