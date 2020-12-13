import { getImageBitmap } from 'utils/file';
import { getTileUV } from 'utils/tile';

class TileManager {
  constructor() {
    this.tiles = new Map();
    this.length = 0;
  }

  addTilesFromTileset = async (texture, tileSize) => {
    const bitmap = await getImageBitmap(texture);
    const hFrames = Math.floor(bitmap.width / tileSize[0]);
    const vFrames = Math.floor(bitmap.height / tileSize[1]);

    for (let i = 0; i < vFrames; i++) {
      for (let j = 0; j < hFrames; j++) {
        const idx = i * hFrames + j;
        const uv = getTileUV(idx, tileSize, [bitmap.width, bitmap.height])
        this.tiles.set(this.length, {
          size: tileSize,
          texture: texture,
          uv: uv,
        });
        ++this.length;
      }
    }
    console.log(this.tiles);
  }

  get = (tile) => {
    if (!this.debug) {
      console.log(tile);
      this.debug = true;
    }
    return this.tiles.get(tile);
  }

};

const TileManagerInstance = new TileManager();

export default TileManagerInstance;
