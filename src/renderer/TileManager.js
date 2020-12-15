import { getImageBitmap } from "utils/file";
import { getTileUV } from "utils/tile";

class TileManager {
  constructor() {
    this.tiles = new Map();
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
        this.tiles.set(this.lastId, {
          size: tileSize,
          texture: texture,
          uv: uv,
        });
        ++this.lastId;
      }
    }

    return tileIndex;
  };

  loadTileset = async (tileset) => {
    const tiles = await get(tileset, tileStore);

    if (!tiles) {
      console.error(`The tileset does not exist: ${tileset}`);
      return;
    }

    for (const [key, value] of tiles) {
      this.tiles.set(key, value);
    }
  };

  get = (tile) => {
    return this.tiles.get(tile);
  };
}

const TileManagerInstance = new TileManager();

export default TileManagerInstance;
