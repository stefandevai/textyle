import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTextureData, hasTexture } from "idbTextureStore";
import { selectTile } from "redux/actions";
import { getTilePositionOnClick } from "utils/tile";
import TilesetFooter from "ui/sidebar/tileset/TilesetFooter";
import { GRID_COLOR, GRID_CANVAS_ID, TILESET_CANVAS_ID, SELECTED_TILE_COLOR_OVERLAY } from "ui/constants";

const tileSize = [32, 32];

const drawGridLines = (canvas, tileDimensions) => {
  const context = canvas.getContext("2d");
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
};

const TilesetPreview = () => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();
  const selectedTileset = useSelector((state) => state.tileset.selectedTileset);
  const [selectedTile, setSelectedTile] = useState([-1, -1]);
  const [tilesetIndex, setTilesetIndex] = useState(0);
  const tilegridCanvasRef = useRef(null);
  const tilesetCanvasRef = useRef(null);

  // ====================================
  // Logic
  // ====================================
  // Load a new tileset to the preview
  useEffect(() => {
    if (!selectedTileset || selectedTileset === "" || !tilegridCanvasRef.current || !tilesetCanvasRef.current) {
      return;
    }

    const tilesetCanvas = tilesetCanvasRef.current;
    const tilegridCanvas = tilegridCanvasRef.current;

    // Add image to canvas
    getTextureData(selectedTileset).then((data) => {
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
          drawGridLines(tilesetCanvas, tileSize);
          setTilesetIndex(data.tilesetIndex);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(data.file);
    });
  }, [selectedTileset]);

  // Draw highlight on selected tile
  useEffect(() => {
    if (!tilegridCanvasRef.current) {
      return;
    }

    const canvas = tilegridCanvasRef.current;
    const context = canvas.getContext("2d");
    // Draw square on selected tile
    context.fillStyle = SELECTED_TILE_COLOR_OVERLAY;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(
      selectedTile[0] * tileSize[0] + 1,
      selectedTile[1] * tileSize[1] + 1,
      tileSize[0] - 1,
      tileSize[1] - 1
    );
  }, [selectedTile]);

  const onSelectTile = (e) => {
    const tilePos = getTilePositionOnClick(e, tileSize);
    const tileIndex = tilesetIndex + tilePos[1] * Math.floor(e.target.width / tileSize[0]) + tilePos[0];
    dispatch(selectTile(tileIndex));
    setSelectedTile(tilePos);
  };

  // ====================================
  // Render
  // ====================================
  const tilesetPreview =
    selectedTileset === "" ? (
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
        <TilesetFooter selectedTileset={selectedTileset} />
      </>
    );

  return tilesetPreview;
};

export default TilesetPreview;