import { useEffect } from 'react';
import { connect } from 'react-redux';
import { addTileset, addTilesets } from 'redux/actions';
import { setTextureData, getTextureNames, hasTexture } from 'idb';
import TileManagerInstance from 'renderer/TileManager';
import TilesetPreview from 'ui/sidebar/tileset/TilesetPreview';
import TilesetSelector from 'ui/sidebar/tileset/TilesetSelector';
import CollapseSection from 'ui/common/CollapseTab';
import FileInput from 'ui/common/FileInput';
import {
  ADD_TILESET_TITLE,
  LOCAL_STORAGE_LAST_SELECTED_TILESET,
} from 'ui/constants';

const TilesetManager = ({ addTileset, addTilesets }) => {
  // Get available tilesets
  useEffect(() => {
    getTextureNames().then(async textures => {
      addTilesets(textures);

      // Create tiles from textures
      // Respects order of creation
      // TODO: replace hardcoded 32 x 32 tile size with a user defined one
      for (const texture of textures.reverse()) {
        await TileManagerInstance.addTilesFromTileset(texture, [32, 32]);
      }
    });
  }, [addTilesets]);

  const onTilesetUpload = async (event) => {
    if (event.target.files.length <= 0) {
      return;
    }

    // TODO: If the texture already exists, choose a new name
    let name = event.target.files[0].name;

    try {
      const fileBlob = event.target.files[0];
      if (!fileBlob) {
        return;
      }

      await setTextureData(name, { file: fileBlob, tilesetIndex: TileManagerInstance.length });
    } catch (err) {
      console.error(err);
      return;
    }

    // Create tiles from the texture
    TileManagerInstance.addTilesFromTileset(name, [32, 32]);
    localStorage.setItem(LOCAL_STORAGE_LAST_SELECTED_TILESET, name);
    addTileset(name);
  }

  return (
    <div>
      <CollapseSection title='Tileset'>
        <TilesetSelector />
        <FileInput title={ADD_TILESET_TITLE} onUpload={e => onTilesetUpload(e) }/>
        <TilesetPreview />
      </CollapseSection>
    </div>
  );
}

export default connect(
  null,
  { addTileset, addTilesets }
)(TilesetManager);
