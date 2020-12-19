import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTool } from "redux/actions";
import { getTilePositionOnClick, drawGridLines } from "utils/tile";
import { EDITOR_CANVAS_ID } from "ui/constants";
import RendererInstance from "renderer/Renderer";
import TilemapInstance from "tilemap";
import * as tools from "resources/tools";

const EditorCanvas = () => {
  const dispatch = useDispatch();
  const editingCanvasRef = useRef();
  const { selectedLayer, layers } = useSelector((state) => ({
    selectedLayer: {name: state.layers.selected, ...state.layers.layers[state.layers.selected]},
    layers: state.layers.layers,
  }));
  const selectedTile = useSelector((state) => state.tileset.selectedTile);
  const { selectedTool } = useSelector((state) => state.canvas);

  useEffect(() => {
    const refElement = editingCanvasRef.current;
    if (!refElement) {
      return;
    }

    // Update viewport on resize
    window.addEventListener("resize", () => {
      if (!refElement) {
        return;
      }

      RendererInstance.updateViewport(refElement.clientWidth, refElement.clientHeight);
    });

    editingCanvasRef.current.width = refElement.clientWidth;
    editingCanvasRef.current.height = refElement.clientHeight;

    // Used to allow preventing default wheel behavior on chrome
    const cancelWheel = (event) => event.preventDefault();
    refElement.addEventListener("wheel", cancelWheel, { passive: false });
    return () => {
      refElement.removeEventListener("wheel", cancelWheel);
    };
  }, []);

  useEffect(() => {
    const panToolStartHandler = ({ key }) => {
      if (key === " ") {
        dispatch(selectTool(tools.PAN_TOOL));
      }
    };

    // TODO: Create a stack of tools to be able to get back
    // to the previous tool instead of the default one
    const panToolEndHandler = ({ key }) => {
      if (key === " ") {
        dispatch(selectTool(tools.DEFAULT_TOOL));
      }
    };

    window.addEventListener("keydown", panToolStartHandler);
    window.addEventListener("keyup", panToolEndHandler);
    return () => {
      window.removeEventListener("keydown", panToolStartHandler);
      window.removeEventListener("keyup", panToolEndHandler);
    };
  }, [dispatch]);


  useEffect(() => {
    const canvas = editingCanvasRef.current;

    if (!selectedLayer.tileSize || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawGridLines(canvas, selectedLayer.tileSize);
  }, [selectedLayer]);


  const handleOneTimeTools = (e) => {
    switch (selectedTool) {
      case tools.FILL_TOOL: {
        const zoomLevel = RendererInstance.camera.getZoomLevel();
        const position = getTilePositionOnClick(
          e,
          [selectedLayer.tileSize[0] * zoomLevel, selectedLayer.tileSize[1] * zoomLevel],
          RendererInstance.camera.position
        );
        const layerId = selectedLayer.id;

        TilemapInstance.fill(...position, selectedTile, layerId);
        break;
      }

      case tools.PAN_TOOL: {
        RendererInstance.camera.setOrigin(e.clientX, e.clientY);
        break;
      }

      case tools.MAGNIFY_TOOL: {
        if (e.altKey) {
          RendererInstance.camera.decrementZoom();
        } else {
          RendererInstance.camera.incrementZoom();
        }
      }

      default:
        break;
    }
  };

  const handleContinuousTools = (e) => {
    const zoomLevel = RendererInstance.camera.getZoomLevel();
    const position = getTilePositionOnClick(
      e,
      [selectedLayer.tileSize[0] * zoomLevel, selectedLayer.tileSize[1] * zoomLevel],
      RendererInstance.camera.position
    );
    const layerId = selectedLayer.id;

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

      case tools.ERASER_TOOL: {
        TilemapInstance.set(...position, -1, layerId);
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
  };

  const handleMouseDown = (e) => {
    // Abort handling tool if no layer is selected
    if (!selectedLayer.name || !layers[selectedLayer.name]) {
      return;
    }

    handleOneTimeTools(e);
    handleContinuousTools(e);
  };

  const handleDragStart = (e) => {
    // Hide drag image with a 1x1 transparent pixel image
    const pixel = document.createElement('img');
    pixel.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(pixel, 0, 0);
  }

  const handleDrag = (e) => {
    // Abort handling tool if no layer is selected
    if (!selectedLayer.name || !layers[selectedLayer.name]) {
      return;
    }

    handleContinuousTools(e);
  };

  const handleWheel = (e) => {
    if (!e.altKey) {
      return;
    }

    RendererInstance.camera.applyZoom(e.deltaY);
  };

  return (
    <canvas
      id={EDITOR_CANVAS_ID}
      ref={editingCanvasRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onDragOver={handleDrag}
      onDragStart={handleDragStart}
      className="col-span-full row-span-full z-10 w-full h-full"
      draggable='true'
    />
  );
};

export default EditorCanvas;
