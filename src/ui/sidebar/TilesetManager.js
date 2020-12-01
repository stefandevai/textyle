import { useState, useEffect } from 'react';
import FileInput from 'ui/common/FileInput';
import TilesetPreview from 'ui/sidebar/TilesetPreview';
import { fileToBase64, getFileName } from 'utils/file';
import { getTextureBlob, setTextureBlob } from 'idb';
import { set } from 'idb-keyval';


const TilesetManager = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null)

  useEffect(() => {
    getTextureBlob('tileset').then(async value => {
      try {
        const data = await fileToBase64(value);
        setImage(data);
      } catch (err) {
        console.error(err);
      }
    });
  }, [name]);

  const onTilesetUpload = async (event) => {
    if (event.target.files.length < 0) {
      return;
    }

    const name = event.target.files[0].name;

    try {
      // TODO: Handle multiple textures
      const fileBlob = event.target.files[0];
      await setTextureBlob('tileset', fileBlob);
    } catch (err) {
      console.error(err);
      return;
    }

    setName(name);
  }


  return (
    <div className='is-small'>
      <h3>Tileset</h3>
      <FileInput title='Add tileset' filename={name} onUpload={e => onTilesetUpload(e) }/>
      {image && <TilesetPreview src={image} alt='Tileset' />}
    </div>
  );
}

export default TilesetManager;
