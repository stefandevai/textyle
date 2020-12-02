import { useState } from 'react';
import { connect } from 'react-redux';
import { uploadTileset } from 'redux/actions';
import FileInput from 'ui/common/FileInput';
import TilesetPreview from 'ui/sidebar/TilesetPreview';
import { fileToBase64, getFileName } from 'utils/file';
import { setTextureBlob } from 'idb';
import { set } from 'idb-keyval';

const TilesetManager = ({ uploadTileset }) => {
  const [name, setName] = useState('');

  const onTilesetUpload = async (event) => {
    if (event.target.files.length < 0) {
      return;
    }

    const name = event.target.files[0].name;

    try {
      // TODO: Handle multiple textures
      const fileBlob = event.target.files[0];
      await setTextureBlob(name, fileBlob);
    } catch (err) {
      console.error(err);
      return;
    }

    uploadTileset(name);
    setName(name);
  }

  return (
    <div className='is-small'>
      <h3>Tileset</h3>
      <select>
        <option>Tes1</option>
        <option>Tes2</option>
        <option>Tes3</option>
        <option>Tes4</option>
      </select>
      <FileInput title='Add tileset' filename={name} onUpload={e => onTilesetUpload(e) }/>
      <TilesetPreview />
    </div>
  );
}

export default connect(
  null,
  { uploadTileset }
)(TilesetManager);

