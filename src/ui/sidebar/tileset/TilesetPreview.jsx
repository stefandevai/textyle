import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTextureData, hasTexture } from "idbTextureStore";
import { selectTile } from "redux/actions";
import { getTilePositionOnClick } from "utils/tile";
import { GRID_COLOR, GRID_CANVAS_ID, TILESET_CANVAS_ID, SELECTED_TILE_COLOR_OVERLAY } from "ui/constants";

const drawGridLines = (canvas, tileDimensions) => {
  const context = canvas.getContext("2d");
  context.strokeStyle = GRID_COLOR;
  context.lineWidth = 1;

  // Draw horizontal lines
  for (let j = tileDimensions[1]; j < canvas.height; j += tileDimensions[1]) {
    context.beginPath();
    context.moveTo(0, j + 0.5);
    context.lineTo(canvas.width, j + 0.5);
    context.stroke();
  }

  // Draw vertical lines
  for (let i = tileDimensions[0]; i < canvas.width; i += tileDimensions[0]) {
    context.beginPath();
    context.moveTo(i + 0.5, 0);
    context.lineTo(i + 0.5, canvas.height);
    context.stroke();
  }
};

const TilesetPreview = ({ tilesetName, selectable, tileSize }) => {
  const dispatch = useDispatch();
  const [selectedTile, setSelectedTile] = useState([-1, -1]);
  const [tilesetIndex, setTilesetIndex] = useState(0);
  const tilegridCanvasRef = useRef(null);
  const tilesetCanvasRef = useRef(null);
  const tileSizeRef = useRef(tileSize);

  // Load a new tileset to the preview
  useEffect(() => {
    if (!tilesetName || tilesetName === "" || !tilegridCanvasRef.current || !tilesetCanvasRef.current) {
      return;
    }

    const tilesetCanvas = tilesetCanvasRef.current;
    const tilegridCanvas = tilegridCanvasRef.current;

    // Add image to canvas
    getTextureData(tilesetName).then((data) => {
      if (tileSizeRef.current !== data.tileSize) {
        tileSizeRef.current = data.tileSize;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          tilesetCanvas.width = image.width;
          tilesetCanvas.height = image.height;

          tilegridCanvas.width = image.width;
          tilegridCanvas.height = image.height;

          const tilesetContext = tilesetCanvas.getContext("2d");
          tilesetContext.drawImage(image, 0, 0);
          drawGridLines(tilesetCanvas, tileSizeRef.current);
          setTilesetIndex(data.tilesetIndex);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(data.file);
    });
  }, [tilesetName, tileSize]);

  // Draw highlight on selected tile
  useEffect(() => {
    if (!tilegridCanvasRef.current || !tileSizeRef.current) {
      return;
    }

    const canvas = tilegridCanvasRef.current;
    const context = canvas.getContext("2d");
    // Draw square on selected tile
    context.fillStyle = SELECTED_TILE_COLOR_OVERLAY;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(
      selectedTile[0] * tileSizeRef.current[0] + 1,
      selectedTile[1] * tileSizeRef.current[1] + 1,
      tileSizeRef.current[0] - 1,
      tileSizeRef.current[1] - 1
    );
  }, [selectedTile, tileSize]);

  const onSelectTile = (e) => {
    if (!selectable || !tileSizeRef.current) {
      return;
    }

    const tilePos = getTilePositionOnClick(e, tileSizeRef.current);
    const tileIndex = tilesetIndex + tilePos[1] * Math.floor(e.target.width / tileSizeRef.current[0]) + tilePos[0];
    dispatch(selectTile(tileIndex));
    setSelectedTile(tilePos);
  };

  const tilesetPreview =
    tilesetName === "" ? (
      <div />
    ) : (
      <>
        <div className="max-h-40 max-w-full overflow-scroll border inline-block rounded-sm mt-2">
          <div className="grid">
            <canvas
              id={GRID_CANVAS_ID}
              onMouseUp={onSelectTile}
              ref={tilegridCanvasRef}
              className="col-span-full row-span-full z-10 overflow-hidden"
            />
            <canvas
              id={TILESET_CANVAS_ID}
              ref={tilesetCanvasRef}
              className="col-span-full row-span-full z-0 overflow-hidden"
            />
          </div>
        </div>
      </>
    );

  return tilesetPreview;
};

export default TilesetPreview;
