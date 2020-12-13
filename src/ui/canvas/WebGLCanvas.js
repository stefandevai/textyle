import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addLayer } from 'redux/actions';
import RendererInstance from 'renderer/Renderer';
import TilemapInstance from 'tilemap';
import AbsoluteCanvas from 'ui/common/AbsoluteCanvas';
import { TILEMAP_CANVAS_ID } from 'ui/constants';

// TODO: Provide a method to change tile size per layer
const tileSize = [32, 32];

const WebGLCanvas = () => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();
  const tilesCanvasRef = useRef();

  // ====================================
  // Logic
  // ====================================
  useEffect(() => {
    if (!tilesCanvasRef.current) {
      return;
    }

    // Update canvas sizes
    tilesCanvasRef.current.width = tilesCanvasRef.current.clientWidth;
    tilesCanvasRef.current.height = tilesCanvasRef.current.clientHeight;

    if (!TilemapInstance.hasInitialized) {
      // TODO: Remove dispatch from here and add a layer only if there isn't any
      TilemapInstance.init().then(() => {
        dispatch(addLayer(null, 0, 0, Math.floor(tilesCanvasRef.current.width / tileSize[0]) + 1,
                                      Math.floor(tilesCanvasRef.current.height / tileSize[1]) + 1));
      });
    }

    if (!RendererInstance.hasInitialized) {
      RendererInstance.init(tilesCanvasRef.current.getContext('webgl2'));
      //RendererInstance.setClearColor(55.0 / 255.0, 65.0 / 255.0, 81.0 / 255.0, 1.0);
      RendererInstance.setClearColor(31.0 / 255.0, 41.0 / 255.0, 55.0 / 255.0, 1.0);
      window.requestAnimationFrame(RendererInstance.render);
    }
  }, [dispatch]);

  // ====================================
  // Render
  // ====================================
  return (
    <canvas id={TILEMAP_CANVAS_ID} ref={tilesCanvasRef} className='col-span-full row-span-full z-0 w-full h-full' />
  );
}
    //<AbsoluteCanvas
      //id={TILEMAP_CANVAS_ID}
      //style={{ width: '100%', height: '100%', zIndex: '0' }}
      //ref={tilesCanvasRef}
    ///>

export default WebGLCanvas;
