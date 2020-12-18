import { useState } from 'react';
import Modal from 'ui/common/Modal';
import Button from 'ui/common/Button';
import TilesetPreview from 'ui/sidebar/tileset/TilesetPreview';

const TilesetSettingsModal = ({ tilesetName, open, onClose }) => {
  const [tileWidth, setTileWidth] = useState(32);
  const [tileHeight, setTileHeight] = useState(32);

  const changeGridWidth = (e) => {
    setTileWidth(e.target.value);
  }

  const changeGridHeight = (e) => {
    setTileHeight(e.target.value);
  }

  const updateTileset = () => {
    // TODO: Update tileset dimensions
    if (onClose) {
      onClose();
    }
  }

  return (
    <Modal title='Tileset Settings' open={open} onClose={onClose}>
      <form className='mb-2'>
        <label>
          Tile dimensions (px):<br />
        </label>
        <div className='mt-2'>
          <input type='number' value={tileWidth} onChange={changeGridWidth} className='w-14 mr-1' />
          <input type='number' value={tileHeight} onChange={changeGridHeight} className='w-14 ml-1' />
        </div>
      </form>

      <TilesetPreview
        tilesetName={tilesetName}
        selectable={false}
        tileSize={[parseInt(tileWidth), parseInt(tileHeight)]}
      />

      <div className='flex mt-2'>
        <span className='w-full mr-1'>
          <Button text='Update' onClick={updateTileset} />
        </span>
        <span className='w-full ml-1'>
          <Button text='Cancel' onClick={onClose} />
        </span>
      </div>
    </Modal>
  );
};

export default TilesetSettingsModal;

