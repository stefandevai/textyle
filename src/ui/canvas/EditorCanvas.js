import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useEventListener } from 'ui/hooks';
import { getTilePositionOnClick } from 'utils/tile';
import { EDITOR_CANVAS_ID } from 'ui/constants';
import RendererInstance from 'renderer/Renderer';
import TilemapInstance from 'tilemap';
import AbsoluteCanvas from 'ui/common/AbsoluteCanvas';
import * as tools from 'ui/canvas/tools';

// TODO: Provide a method to change tile size per layer
const tileSize = [32, 32];

const EditorCanvas = () => {
  // ====================================
  // Initialize
  // ====================================
  const editingCanvasRef = useRef();
  const [usingTool, setUsingTool] = useState(false);
  const { selectedLayer, layers } = useSelector(state => ({ selectedLayer: state.layers.selected, layers: state.layers.layers }));
  const selectedTile = useSelector(state => state.tileset.selectedTile);
  const selectedTool = useSelector(state => state.canvas.selectedTool);

  // ====================================
  // Logic
  // ====================================
  useEffect(() => {
    if (!editingCanvasRef.current) {
      return;
    }
    editingCanvasRef.current.width = editingCanvasRef.current.clientWidth;
    editingCanvasRef.current.height = editingCanvasRef.current.clientHeight;
  }, []);

  // Used to allow preventing default wheel behavior on chrome
  useEffect(() => {
    const cancelWheel = (event) => event.preventDefault();

    document.body.addEventListener('wheel', cancelWheel, {passive: false});

    return () => {
        document.body.removeEventListener('wheel', cancelWheel);
    }
  }, []);

  const handleOneTimeTools = e => {
    const zoomLevel = RendererInstance.camera.getZoomLevel();
    const position = getTilePositionOnClick(e, [tileSize[0] * zoomLevel, tileSize[1] * zoomLevel], RendererInstance.camera.position);
    const layerId = layers[selectedLayer].id;

    switch (selectedTool) {
      case tools.FILL_TOOL: {
        TilemapInstance.fill(...position, selectedTile, layerId);
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
        if (selectedTile && selectedTile !== -1) {
          TilemapInstance.set(...position, selectedTile, layerId);
        }
        break;
      }

      case tools.MOVE_TOOL: {
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

  // ====================================
  // Render
  // ====================================
  return (
    <AbsoluteCanvas
      id={EDITOR_CANVAS_ID}
      style={{ width: '100%', height: '100%', zIndex: '1' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      ref={editingCanvasRef}
    />
  );
}

export default EditorCanvas;
