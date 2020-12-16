/**
 * @file Manges tile data for the rendering process.
 */

import { getImageBitmap } from "utils/file";
import { getTileUV } from "utils/tile";

class TileManager {
  constructor() {
    this.tiles = [];
    this.lastId = 0;
  }

  // Add tiles to local tileset and returns the tile index
  addTilesFromTileset = async (texture, tileSize) => {
    const bitmap = await getImageBitmap(texture);
    const hFrames = Math.floor(bitmap.width / tileSize[0]);
    const vFrames = Math.floor(bitmap.height / tileSize[1]);
    const tileIndex = this.lastId;

    for (let i = 0; i < vFrames; i++) {
      for (let j = 0; j < hFrames; j++) {
        const idx = i * hFrames + j;
        const uv = getTileUV(idx, tileSize, [bitmap.width, bitmap.height]);
        this.tiles[this.lastId] = {
          size: tileSize,
          tileset: texture,
          uv: uv,
        };
        ++this.lastId;
      }
    }

    return tileIndex;
  };

  get = (tile) => {
    // Bound checking
    if (tile < 0 || tile >= this.tiles.length) {
      return null;
    }

    return this.tiles[tile];
  };
}

const TileManagerInstance = new TileManager();

export default TileManagerInstance;
