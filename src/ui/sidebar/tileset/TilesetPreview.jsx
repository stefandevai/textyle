import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getTextureData, hasTexture } from "idbTextureStore";
import { selectTile } from "redux/actions";
import { getTilePositionOnClick, drawGridLines, drawTilePlaceholder } from "utils/tile";
import { GRID_CANVAS_ID, TILESET_CANVAS_ID, SELECTED_TILE_COLOR_OVERLAY } from "ui/constants";

const TilesetPreview = ({ tilesetName, selectable, tileSize, tilesetIndex }) => {
  const dispatch = useDispatch();
  const [selectedTile, setSelectedTile] = useState(null);
  const [currentTilesetIndex, setCurrentTilesetIndex] = useState(tilesetIndex);
  const [currentTileSize, setCurrentTileSize] = useState(tileSize);
  const tilegridCanvasRef = useRef(null);
  const tilesetCanvasRef = useRef(null);

  useEffect(() => {
    setCurrentTileSize(tileSize);
  }, [tileSize]);

  useEffect(() => {
    setCurrentTilesetIndex(tilesetIndex);
  }, [tilesetIndex]);

  // Draw the tileset image to the canvas
  useEffect(() => {
    if (!tilesetName || tilesetName === "" || !tilegridCanvasRef.current || !tilesetCanvasRef.current) {
      return;
    }

    const tilesetCanvas = tilesetCanvasRef.current;
    const tilegridCanvas = tilegridCanvasRef.current;

    // Add image to canvas
    getTextureData(tilesetName).then((data) => {
      const reader = new FileReader();
      const image = new Image();

      reader.onload = (e) => {
        image.onload = () => {
          setCurrentTileSize(data.tileSize);

          tilesetCanvas.width = image.width;
          tilesetCanvas.height = image.height;

          tilegridCanvas.width = image.width;
          tilegridCanvas.height = image.height;

          const tilesetContext = tilesetCanvas.getContext("2d");
          tilesetContext.drawImage(image, 0, 0);
          setCurrentTilesetIndex(data.tilesetIndex);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(data.file);
    });
  }, [tilesetName]);

  // Draw grid and selected tile
  useEffect(() => {
    const canvas = tilegridCanvasRef.current;

    if (!canvas || !currentTileSize) {
      return;
    }

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawGridLines(canvas, currentTileSize);

    if (!selectedTile) {
      return;
    }

    drawTilePlaceholder(canvas, selectedTile, currentTileSize);
  }, [currentTileSize, selectedTile]);

  // Select a tile on click
  const onSelectTile = (e) => {
    if (!selectable || !currentTileSize) {
      return;
    }

    const tilePos = getTilePositionOnClick(e, currentTileSize);
    const tileIndex = currentTilesetIndex + tilePos[1] * Math.floor(e.target.width / currentTileSize[0]) + tilePos[0];
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
