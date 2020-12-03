import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { getTextureFile } from 'idb';
import { selectTile } from 'redux/actions';
import { getTilePositionOnClick } from 'utils/tile';
import AbsoluteCanvas from 'ui/common/AbsoluteCanvas';
import {
  GRID_COLOR,
  GRID_CANVAS_ID,
  TILESET_CANVAS_ID,
  SELECTED_TILE_COLOR_OVERLAY,
} from 'ui/constants';

const tileSize = [32, 32];

const drawGridLines = (canvas, tileDimensions) => {
  const context = canvas.getContext('2d');
  context.strokeStyle = GRID_COLOR;
  context.lineWidth = 1;

  // Draw horizontal lines
  for (let j = tileDimensions[0]; j < canvas.height; j += tileDimensions[0]) {
    context.beginPath();
    context.moveTo(0, j + 0.5);
    context.lineTo(canvas.width, j + 0.5);
    context.stroke();
  }

  // Draw vertical lines
  for (let i = tileDimensions[1]; i < canvas.width; i += tileDimensions[1]) {
    context.beginPath();
    context.moveTo(i + 0.5, 0);
    context.lineTo(i + 0.5, canvas.height);
    context.stroke();
  }
}

const TilesetPreview = ({ selectedTileset, selectTile }) => {
  const [selectedTile, setSelectedTile] = useState([-1, -1]);
  const tilegridCanvasRef = useRef(null);
  const tilesetCanvasRef = useRef(null);

  // Load a new tileset to the preview
  useEffect(() => {
    if (!selectedTileset || !tilegridCanvasRef.current || !tilesetCanvasRef.current) {
      return;
    }

    const tilesetCanvas = tilesetCanvasRef.current;
    const tilegridCanvas = tilegridCanvasRef.current;

    // Add image to canvas
    getTextureFile(selectedTileset).then(file => {
      const reader = new FileReader();

      reader.onload = e => {
        const image = new Image();
        image.onload = () => {
          tilesetCanvas.width = image.width;
          tilesetCanvas.height = image.height;

          tilegridCanvas.width = image.width;
          tilegridCanvas.height = image.height;

          const tilesetContext = tilesetCanvas.getContext('2d');
          tilesetContext.drawImage(image, 0, 0);
          drawGridLines(tilesetCanvas, tileSize);
        }
        image.src = e.target.result;
      }
      reader.readAsDataURL(file);
    });
  }, [selectedTileset]);

  // Draw highlight on selected tile
  useEffect(() => {
    if (!tilegridCanvasRef.current) {
      return;
    }

    const canvas = tilegridCanvasRef.current;
    const context = canvas.getContext('2d');
    // Draw square on selected tile
    context.fillStyle = SELECTED_TILE_COLOR_OVERLAY;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(selectedTile[0] * tileSize[0] + 1,
                     selectedTile[1] * tileSize[1] + 1,
                     tileSize[0] - 1,
                     tileSize[1] - 1);
  }, [selectedTile]);

  const onSelectTile = e => {
    const tilePos = getTilePositionOnClick(e, tileSize);
    selectTile(tilePos[1] * Math.floor(e.target.width / tileSize[0]) + tilePos[0]);
    setSelectedTile(tilePos);
  }

  return (
    <div style={{ position: 'relative' }} >
      {selectedTileset && <AbsoluteCanvas id={GRID_CANVAS_ID} style={{border: '1px solid rgba(0,0,0,0)', zIndex: '1'}} onMouseUp={onSelectTile} ref={tilegridCanvasRef}/>}
      {selectedTileset && <AbsoluteCanvas id={TILESET_CANVAS_ID} style={{border: `1px solid ${GRID_COLOR}`, zIndex: '0'}} ref={tilesetCanvasRef}/>}
    </div>
  );
}

const mapStateToProps = state => {
  const { selectedTileset } = state.tileset || {};
  return { selectedTileset };
}

export default connect(mapStateToProps, { selectTile })(TilesetPreview);
