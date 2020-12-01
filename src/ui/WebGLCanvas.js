import React, { useEffect } from 'react';
import MainRenderer from 'renderer/Renderer';
import {
  CANVAS_ID,
} from 'ui/constants';

const WebGLCanvas = () => {
  const wrapperRef = React.useRef();
  const canvasRef = React.useRef();


  useEffect(() => {
    // Update current canvas size
    canvasRef.current.width = wrapperRef.current.clientWidth;
    canvasRef.current.height = wrapperRef.current.clientHeight;

    // Initialize renderer
    if (!MainRenderer.hasInitialized) {
      MainRenderer.init(canvasRef.current.getContext('webgl2'));
      MainRenderer.setClearColor(0.0, 0.0, 0.0, 1.0);
      window.requestAnimationFrame(MainRenderer.render);
    }
  });

  return (
    <div className='canvas-wrapper' ref={ wrapperRef } style={{ width: '100%', height: '100%' }}>
      <canvas id={ CANVAS_ID } ref={ canvasRef } style={{ width: '100%', height: '100%'  }}></canvas>
    </div>
  );
}

export default WebGLCanvas;
