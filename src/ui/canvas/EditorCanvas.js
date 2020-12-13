import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTool } from 'redux/actions';
import { getTilePositionOnClick } from 'utils/tile';
import { EDITOR_CANVAS_ID } from 'ui/constants';
import RendererInstance from 'renderer/Renderer';
import TilemapInstance from 'tilemap';
import * as tools from 'ui/canvas/tools';

// TODO: Provide a method to change tile size per layer
const tileSize = [32, 32];

const EditorCanvas = () => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();
  const editingCanvasRef = useRef();
  const { selectedLayer, layers } = useSelector(state => ({ selectedLayer: state.layers.selected, layers: state.layers.layers }));
  const selectedTile = useSelector(state => state.tileset.selectedTile);
  const selectedTool = useSelector(state => state.canvas.selectedTool);

  // ====================================
  // Logic
  // ====================================
  useEffect(() => {
    const refElement = editingCanvasRef.current;
    if (!refElement) {
      return;
    }

    editingCanvasRef.current.width = refElement.clientWidth;
    editingCanvasRef.current.height = refElement.clientHeight;

    // Used to allow preventing default wheel behavior on chrome
    const cancelWheel = event => event.preventDefault();
    refElement.addEventListener('wheel', cancelWheel, {passive: false});
    return () => {
        refElement.removeEventListener('wheel', cancelWheel);
    }
  }, []);

  useEffect(() => {
    const panToolStartHandler = ({ key }) => {
      if (key === ' ') {
        dispatch(selectTool(tools.PAN_TOOL));
      }
    }

    // TODO: Create a stack of tools to be able to get back
    // to the previous tool instead of the default one
    const panToolEndHandler = ({ key }) => {
      if (key === ' ') {
        dispatch(selectTool(tools.DEFAULT_TOOL));
      }
    }

    window.addEventListener('keydown', panToolStartHandler);
    window.addEventListener('keyup', panToolEndHandler);
    return () => {
      window.removeEventListener('keydown', panToolStartHandler);
      window.removeEventListener('keyup', panToolEndHandler);
    };
  }, [dispatch]);

  const handleOneTimeTools = e => {
    switch (selectedTool) {
      case tools.FILL_TOOL: {
        const zoomLevel = RendererInstance.camera.getZoomLevel();
        const position = getTilePositionOnClick(e, [tileSize[0] * zoomLevel, tileSize[1] * zoomLevel], RendererInstance.camera.position);
        const layerId = layers[selectedLayer].id;

        TilemapInstance.fill(...position, selectedTile, layerId);
        break;
      }

      case tools.PAN_TOOL: {
        RendererInstance.camera.setOrigin(e.clientX, e.clientY);
        break;
      }

      default:
        break;
    }
  }

  const handleContinuousTools = e => {
    const zoomLevel = RendererInstance.camera.getZoomLevel();
    const position = getTilePositionOnClick(e, [tileSize[0] * zoomLevel, tileSize[1] * zoomLevel], RendererInstance.camera.position);
    const layerId = layers[selectedLayer].id;

    switch (selectedTool) {
      case tools.DEFAULT_TOOL: {
        break;
      }

      case tools.PLACEMENT_TOOL: {
        if (selectedTile !== null && selectedTile !== undefined && selectedTile !== -1) {
          TilemapInstance.set(...position, selectedTile, layerId);
        }
        break;
      }

      case tools.PAN_TOOL: {
        if (e.clientX == 0 || e.clientY == 0) {
          break;
        }

        RendererInstance.camera.moveTo(e.clientX, e.clientY);
        break;
      }

      default:
        break;
    }
  }

  const handleMouseDown = e => {
    handleOneTimeTools(e);
    handleContinuousTools(e);
  }

  const handleDrag = e => {
    handleContinuousTools(e);
  }

  const handleWheel = e => {
    if (!e.altKey) {
      return;
    }

    RendererInstance.camera.applyZoom(e.deltaY);
  }

  // ====================================
  // Render
  // ====================================
  return (
    <canvas id={EDITOR_CANVAS_ID}
            ref={editingCanvasRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onDrag={handleContinuousTools}
            draggable='true'
            className='col-span-full row-span-full z-10 w-full h-full'
    />
  );
}
    //<AbsoluteCanvas
      //id={EDITOR_CANVAS_ID}
      //style={{ width: '100%', height: '100%', zIndex: '1' }}
      //onMouseDown={handleMouseDown}
      //onDrag={handleContinuousTools}
      //onWheel={handleWheel}
      //ref={editingCanvasRef}
    ///>

export default EditorCanvas;
