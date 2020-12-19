import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLayer } from "redux/actions";
import RendererInstance from "renderer/Renderer";
import TilemapInstance from "tilemap";
import { TILEMAP_CANVAS_ID } from "ui/constants";

//const tileSize = [32, 32];

const WebGLCanvas = () => {
  const dispatch = useDispatch();
  const tilesCanvasRef = useRef();
  const tileSize = useSelector((state) => state.canvas.tileSize);

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
        dispatch(
          addLayer({
            name: "",
            tileSize: tileSize,
            x: 0,
            y: 0,
            width: Math.floor(tilesCanvasRef.current.width / tileSize[0]) + 1,
            height: Math.floor(tilesCanvasRef.current.height / tileSize[1]) + 1,
          })
        );
      });
    }

    if (!RendererInstance.hasInitialized) {
      RendererInstance.init(tilesCanvasRef.current.getContext("webgl2"));
      //RendererInstance.setClearColor(55.0 / 255.0, 65.0 / 255.0, 81.0 / 255.0, 1.0);
      RendererInstance.setClearColor(31.0 / 255.0, 41.0 / 255.0, 55.0 / 255.0, 1.0);
      window.requestAnimationFrame(RendererInstance.render);
    }
  }, [tileSize, dispatch]);

  return (
    <canvas id={TILEMAP_CANVAS_ID} ref={tilesCanvasRef} className="col-span-full row-span-full z-0 w-full h-full" />
  );
};

export default WebGLCanvas;
