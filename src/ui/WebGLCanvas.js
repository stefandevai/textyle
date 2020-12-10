import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { addLayer } from 'redux/actions';
import { useEventListener } from 'ui/hooks';
import RendererInstance from 'renderer/Renderer';
import TilemapInstance from 'tilemap';
import { getTilePositionOnClick } from 'utils/tile';
import Toolbar from 'ui/toolbar/Toolbar';
import AbsoluteCanvas from 'ui/common/AbsoluteCanvas';
import {
  DEFAULT_TOOL,
  PLACEMENT_TOOL,
  FILL_TOOL,
  MOVE_TOOL,
} from 'ui/toolbar/tools';
import {
  TILEMAP_CANVAS_ID,
  EDITOR_CANVAS_ID,
} from 'ui/constants';

// TODO: Provide a method to change tile size per layer
const tileSize = [32, 32];

const WebGLCanvas = ({ selectedTile, selectedTool, selectedLayer, layers, addLayer }) => {
  const [usingTool, setUsingTool] = useState(false);
  const tilesCanvasRef = useRef();
  const editingCanvasRef = useRef();

  useEffect(() => {
    if (!tilesCanvasRef.current || !editingCanvasRef.current) {
      return;
    }

    // Update canvases sizes
    tilesCanvasRef.current.width = tilesCanvasRef.current.clientWidth;
    tilesCanvasRef.current.height = tilesCanvasRef.current.clientHeight;
    editingCanvasRef.current.width = editingCanvasRef.current.clientWidth;
    editingCanvasRef.current.height = editingCanvasRef.current.clientHeight;

    if (!TilemapInstance.hasInitialized) {
      TilemapInstance.init().then(() => {
        // Add default layer
        addLayer(null, 0, 0, Math.floor(tilesCanvasRef.current.width / tileSize[0]) + 1,
                             Math.floor(tilesCanvasRef.current.height / tileSize[1]) + 1);
      });
    }

    if (!RendererInstance.hasInitialized) {
      RendererInstance.init(tilesCanvasRef.current.getContext('webgl2'));
      RendererInstance.setClearColor(55.0 / 255.0, 65.0 / 255.0, 81.0 / 255.0, 1.0);
      window.requestAnimationFrame(RendererInstance.render);
    }
  }, [addLayer]);

  const handleOneTimeTools = e => {
    const zoomLevel = RendererInstance.camera.getZoomLevel();
    const position = getTilePositionOnClick(e, [tileSize[0] * zoomLevel, tileSize[1] * zoomLevel], RendererInstance.camera.position);
    const layerId = layers[selectedLayer].id;

    switch (selectedTool) {
      case FILL_TOOL: {
        TilemapInstance.fill(...position, selectedTile, layerId);
        break;
      }

      default:
        break;
    }
  }

  // Used to allow preventing default wheel behavior on chrome
  useEffect(() => {
    const cancelWheel = (event) => event.preventDefault();

    document.body.addEventListener('wheel', cancelWheel, {passive: false});

    return () => {
        document.body.removeEventListener('wheel', cancelWheel);
    }
  }, []);

  const handleContinuousTools = e => {
    const zoomLevel = RendererInstance.camera.getZoomLevel();
    const position = getTilePositionOnClick(e, [tileSize[0] * zoomLevel, tileSize[1] * zoomLevel], RendererInstance.camera.position);
    const layerId = layers[selectedLayer].id;

    switch (selectedTool) {
      case DEFAULT_TOOL: {
        break;
      }

      case PLACEMENT_TOOL: {
        if (selectedTile && selectedTile !== -1) {
          TilemapInstance.set(...position, selectedTile, layerId);
        }
        break;
      }

      case MOVE_TOOL: {
        break;
      }

      default:
        break;
    }
  }

  const handleMouseDown = e => {
    setUsingTool(true);
    handleContinuousTools(e);
  }

  const handleMouseMove = e => {
    if (!usingTool) {
      return;
    }
    handleContinuousTools(e);
  }

  const handleMouseUp = e => {
    setUsingTool(true);
    handleOneTimeTools(e);
  }

  const handleWheel = e => {
    if (!e.altKey) {
      return;
    }

    RendererInstance.camera.applyZoom(e.deltaY);
  }

  const handleDragStart = e => {
    RendererInstance.camera.setOrigin(e.clientX, e.clientY);
  }

  const handleDrag = e => {
    if (e.clientX != 0 && e.clientY != 0) {
      RendererInstance.camera.moveTo(e.clientX, e.clientY);
    }
  }

  // Update state on mouseup event if the mouse is outside the canvas area
  useEventListener('mouseup', () => {
    if (usingTool) {
      setUsingTool(false)
    }
  }, document);

  return (
    <div className='col-span-3 flex flex-col'>
      <Toolbar />
      <section className='relative flex-1 bg-gray-600'>
        <AbsoluteCanvas
          id={EDITOR_CANVAS_ID}
          style={{ width: '100%', height: '100%', zIndex: '1' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          ref={editingCanvasRef} />

        <AbsoluteCanvas
          id={TILEMAP_CANVAS_ID}
          style={{ width: '100%', height: '100%', zIndex: '0' }}
          ref={tilesCanvasRef} />
      </section>
    </div>
  );
}

const mapStateToProps = state => {
  const { layers, selected } = state.layers || {};
  const { selectedTile } = state.tileset || {};
  const { selectedTool } = state.canvas || {};
  return { selectedTile, selectedTool, selectedLayer: selected, layers };
}

export default connect(mapStateToProps, { addLayer })(WebGLCanvas);
