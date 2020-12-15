import TilemapInstance from 'tilemap';
import TileManagerInstance from 'renderer/TileManager';
import reduxStore from 'redux/store';
import { getTextureData } from 'idbTextureStore';

const exportJson = async () => {
  const exportObject = {};
  exportObject['map'] = {};

  const state = reduxStore.getState();

  // If layers have not been initialized, don't try to touch them abort exporting
  if (!state.layers || !state.layers.layers) {
    console.error('There are no layers in the current project.');
    return JSON.stringify(exportObject);
  }

  // ========================
  // Layer exporting
  // ========================
  const layerNames = state.layers.names;
  const layers = state.layers.layers;

  exportObject['map']['layers'] = [];

  for (const layerName of layerNames) {
    const layer = layers[layerName];
    const layerWidth = 10;
    const layerHeight = 10;
    const layerX = 0;
    const layerY = 0;
    const layerObj = {}
    layerObj['name'] = layerName;

    layerObj['width'] = layerWidth;
    layerObj['height'] = layerHeight;
    layerObj['x'] = layerX;
    layerObj['y'] = layerY;
    layerObj['tiles'] = [];

    for (let y = 0; y < layerHeight; y++) {
      for (let x = 0; x < layerWidth; x++) {
        const value = TilemapInstance.get(x, y, layer.id);
        layerObj['tiles'].push(value);
      }
    }

    exportObject['map']['layers'].push(layerObj);
  }

  // ========================
  // Tileset exporting
  // ========================
  const tilesetNames = state.tileset.tilesetNames;
  exportObject['tilesets'] = [];

  for (const tilesetName of tilesetNames) {
    const tilesetObj = {}

    // Tileset name
    tilesetObj['name'] = tilesetName;

    // Tile index:
    // There's an array containing all tiles from all
    // tilesets packed together. This index is where the
    // tiles from this particular tileset start.
    const data = await getTextureData(tilesetName);
    tilesetObj['tileIndex'] = data.tilesetIndex;

    exportObject['tilesets'].push(tilesetObj);
  }

  return JSON.stringify(exportObject, null, 2);
};

export default exportJson;
