import React, { Component } from 'react';
import MainRenderer from 'renderer/Renderer';
import {
  CANVAS_ID,
} from 'ui/constants';

export default class WebGLCanvas extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // Add resize callback
    this.handleWindowResize = this.handleWindowResize.bind(this);
    window.addEventListener("resize", this.handleWindowResize);

    // Update current canvas size
    this.canvasRef.current.width = this.wrapperRef.current.clientWidth;
    this.canvasRef.current.height = this.wrapperRef.current.clientHeight;

    // Init renderer
    MainRenderer.init(this.canvasRef.current.getContext('webgl2'));
    MainRenderer.setClearColor(0.0, 0.0, 0.0, 1.0);
    window.requestAnimationFrame(MainRenderer.render);
  }

  handleWindowResize() {
    this.canvasRef.current.width = this.wrapperRef.current.clientWidth;
    this.canvasRef.current.height = this.wrapperRef.current.clientHeight;
  }

  render() {
    return (
      <div className='canvas-wrapper' ref={ this.wrapperRef } style={{ width: '100%', height: '100%' }}>
        <canvas id={ CANVAS_ID } ref={ this.canvasRef } style={{ width: '100%', height: '100%'  }}></canvas>
      </div>
    );
  }
};
