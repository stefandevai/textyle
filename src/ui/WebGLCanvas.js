import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import RendererInstance from 'renderer/Renderer';
import { getTilePositionOnClick } from 'utils/tile';
import AbsoluteCanvas from 'ui/common/AbsoluteCanvas';
import {
  PLACEMENT_TOOL,
  BUCKET_TOOL,
} from 'ui/toolbar/tools';
import {
  TILEMAP_CANVAS_ID,
  EDITOR_CANVAS_ID,
} from 'ui/constants';

// TODO: Provide a method to change tile size per layer
const tileSize = [32, 32];

const WebGLCanvas = ({ selectedTile, selectedTool }) => {
  const tilesCanvasRef = useRef();
  const editingCanvasRef = useRef();

  useEffect(() => {
    if (!tilesCanvasRef.current || !editingCanvasRef.current) {
      return;
    }

    // Update canvases size
    tilesCanvasRef.current.width = tilesCanvasRef.current.clientWidth;
    tilesCanvasRef.current.height = tilesCanvasRef.current.clientHeight;
    editingCanvasRef.current.width = editingCanvasRef.current.clientWidth;
    editingCanvasRef.current.height = editingCanvasRef.current.clientHeight;

    // Initialize renderer
    RendererInstance.init(tilesCanvasRef.current.getContext('webgl2'));
    RendererInstance.setClearColor(0.0, 0.0, 0.0, 1.0);
    window.requestAnimationFrame(RendererInstance.render);
  }, []);

  const handleTool = e => {
    const position = getTilePositionOnClick(e, tileSize);

    switch (selectedTool) {
      case PLACEMENT_TOOL: {
        if (selectedTile && selectedTile !== -1) {
          RendererInstance.grid.set_value(...position, selectedTile);
        }
        break;
      }

      case BUCKET_TOOL: {

        break;
      }

      default:
        break;
    }
  }

  return (
    <section className="section column" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <AbsoluteCanvas id={EDITOR_CANVAS_ID} style={{ width: '100%', height: '100%', zIndex: '1' }} onMouseUp={handleTool} ref={editingCanvasRef} />
      <AbsoluteCanvas id={TILEMAP_CANVAS_ID} style={{ width: '100%', height: '100%', zIndex: '0' }} ref={tilesCanvasRef} />
    </section>
  );
}

const mapStateToProps = state => {
  const { selectedTile } = state.tileset || {};
  const { selectedTool } = state.canvas || {};
  return { selectedTile, selectedTool };
}

export default connect(mapStateToProps)(WebGLCanvas);
