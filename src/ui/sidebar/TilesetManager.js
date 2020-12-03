import { useEffect } from 'react';
import { connect } from 'react-redux';
import { addTileset, addTilesets } from 'redux/actions';
import { setTextureFile, getTextureFiles } from 'idb';
import FileInput from 'ui/common/FileInput';
import TilesetPreview from 'ui/sidebar/TilesetPreview';
import TilesetSelector from 'ui/sidebar/TilesetSelector';

import {
  ADD_TILESET_TITLE,
} from 'ui/constants';

const TilesetManager = ({ addTileset, addTilesets }) => {
  // Get available tilesets
  useEffect(() => {
    getTextureFiles().then(textures => {
      addTilesets(textures);
    });
  }, [addTilesets]);

  const onTilesetUpload = async (event) => {
    if (event.target.files.length < 0) {
      return;
    }

    const name = event.target.files[0].name;

    try {
      const fileBlob = event.target.files[0];
      await setTextureFile(name, fileBlob);
    } catch (err) {
      console.error(err);
      return;
    }

    addTileset(name);
  }

  return (
    <div className='is-small'>
      <h3>Tileset</h3>
      <TilesetSelector />
      <FileInput title={ADD_TILESET_TITLE} onUpload={e => onTilesetUpload(e) }/>
      <TilesetPreview />
    </div>
  );
}

export default connect(
  null,
  { addTileset, addTilesets }
)(TilesetManager);
