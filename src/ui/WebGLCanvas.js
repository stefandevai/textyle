import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useEventListener } from 'ui/hooks';
import RendererInstance from 'renderer/Renderer';
import GridInstance from 'tilemap';
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

const WebGLCanvas = ({ selectedTile, selectedTool }) => {
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

    if (!GridInstance.hasInitialized) {
      GridInstance.init(Math.floor(tilesCanvasRef.current.width / tileSize[0]) + 1,
                        Math.floor(tilesCanvasRef.current.height / tileSize[1]) + 1);
    }

    if (!RendererInstance.hasInitialized) {
      RendererInstance.init(tilesCanvasRef.current.getContext('webgl2'));
      RendererInstance.setClearColor(0.0, 0.0, 0.0, 1.0);
      window.requestAnimationFrame(RendererInstance.render);
    }
  }, []);

  const handleOneTimeTools = e => {
    const position = getTilePositionOnClick(e, tileSize);

    switch (selectedTool) {
      case FILL_TOOL: {
        GridInstance.fill(...position, selectedTile);
        break;
      }

      default:
        break;
    }
  }

  const handleContinuousTools = e => {
    const position = getTilePositionOnClick(e, tileSize);

    switch (selectedTool) {
      case DEFAULT_TOOL: {
        break;
      }

      case PLACEMENT_TOOL: {
        if (selectedTile && selectedTile !== -1) {
          GridInstance.set(...position, selectedTile);
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
          onMouseDown={e => handleMouseDown(e)}
          onMouseMove={e => handleMouseMove(e)}
          onMouseUp={e => handleMouseUp(e)}
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
  const { selectedTile } = state.tileset || {};
  const { selectedTool } = state.canvas || {};
  return { selectedTile, selectedTool };
}

export default connect(mapStateToProps)(WebGLCanvas);
