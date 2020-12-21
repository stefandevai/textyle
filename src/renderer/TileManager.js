/**
 * Manges tile data for the rendering process.
 * @module TileManager
 */

import { getImageBitmap } from "utils/file";
import { getTileUV } from "utils/tile";

/** A class that manages the data for single tiles. */
class TileManager {
  /**
   * Creates a TileManager.
   */
  constructor() {
    this.tiles = [];
    this.lastId = 0;
  }

  /**
   * Adds tiles to this.tiles from a tileset.
   *
   * @param {string} textureKey - Idb key of the texture containing the tiles.
   * @param {number[]} tileSize - dimensions of the tile in the texture.
   * @param {number} tileSize[0] - width of the tile.
   * @param {number} tileSize[1] - height of the tile.
   *
   * @returns {number} - The index in this.tiles of the first tile of the provided texture. This allows getting the remaining indices for a specific texture.
   */
  addTiles = async (textureKey, tileSize) => {
    if (!tileSize) {
      console.log(textureKey)
      return;
    }

    const bitmap = await getImageBitmap(textureKey);
    const hFrames = Math.floor(bitmap.width / tileSize[0]);
    const vFrames = Math.floor(bitmap.height / tileSize[1]);
    const tileIndex = this.lastId;

    for (let i = 0; i < vFrames; i++) {
      for (let j = 0; j < hFrames; j++) {
        const idx = i * hFrames + j;
        const uv = getTileUV(idx, tileSize, [bitmap.width, bitmap.height]);
        this.tiles[this.lastId] = {
          size: tileSize,
          tileset: textureKey,
          uv: uv,
        };
        ++this.lastId;
      }
    }

    return tileIndex;
  };

  /**
   * Gets tile data for a specific tile.
   *
   * @param {number} tile - Index of the tile in this.tiles to access the data object.
   *
   * @returns {Object} - Object containing the tile size, the uv coordinates in the texture and the texture key in the idb store.
   */
  get = (tile) => {
    if (tile < 0 || tile >= this.tiles.length) {
      return null;
    }

    return this.tiles[tile];
  };
}

const TileManagerInstance = new TileManager();

export default TileManagerInstance;
