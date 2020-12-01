import React, { useEffect } from 'react';
import Renderer from 'renderer/Renderer';
import {
  CANVAS_ID,
} from 'ui/constants';

const WebGLCanvas = () => {
  const renderer = new Renderer();
  const canvasRef = React.useRef();

  useEffect(() => {
    // Update current canvas size
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;

    // Initialize renderer
    if (!renderer.hasInitialized) {
      renderer.init(canvasRef.current.getContext('webgl2'));
      renderer.setClearColor(0.0, 0.0, 0.0, 1.0);
      window.requestAnimationFrame(renderer.render);
    }

    // Update canvas if window is resized
    window.addEventListener('resize', () => {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
      renderer.updateViewport(canvasRef.current.width, canvasRef.current.height);
    });
  });

  return (
    <section className="section" style={{ width: '100%', height: '100%' }}>
      <canvas id={ CANVAS_ID } ref={ canvasRef } style={{ width: '100%', height: '100%'  }} className='column' />
    </section>
  );
}

export default WebGLCanvas;
