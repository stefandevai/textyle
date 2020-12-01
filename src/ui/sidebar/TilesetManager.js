import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';
import FileInput from 'ui/common/FileInput';
import TilesetPreview from 'ui/sidebar/TilesetPreview';
import { fileToBase64, getFileName } from 'utils/file';

const onTilesetUpload = async (event, setName) => {
  try {
    // TODO: Save array of tilesets to the local storage
    set('tileset', event.target.files[0]);
  } catch (err) {
    console.error(err);
    return;
  }

  setName(getFileName(event.target.value));
}

const TilesetManager = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null)

  useEffect(() => {
    get('tileset').then(async value => {
      try {
        const data = await fileToBase64(value);
        setImage(data);
      } catch (err) {
        console.error(err);
      }
    });
  }, [name]);

  return (
    <div>
      <h1>Tileset</h1>
      <FileInput title='Add tileset' filename={name} onUpload={e => onTilesetUpload(e, setName) }/>
      {image && <TilesetPreview src={image} alt='Tileset' />}
    </div>
  );
}

export default TilesetManager;
