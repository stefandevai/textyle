import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLayer } from "redux/actions";
import Modal from "ui/common/Modal";
import Button from "ui/common/Button";

const TilesetSettingsModal = ({ layerName, open, onClose }) => {
  const dispatch = useDispatch();
  const [tileWidth, setTileWidth] = useState(0);
  const [tileHeight, setTileHeight] = useState(0);
  const oldTileSize = useSelector((state) => state.layers.layers[layerName].tileSize);

  useEffect(() => {
    if (!oldTileSize) {
      return;
    }

    setTileWidth(oldTileSize[0]);
    setTileHeight(oldTileSize[1]);
  }, [oldTileSize]);

  const changeGridWidth = (e) => {
    setTileWidth(e.target.value);
  };

  const changeGridHeight = (e) => {
    setTileHeight(e.target.value);
  };

  const handleClick = async () => {
    // Recreate tiles with new size
    const tileSize = [parseInt(tileWidth), parseInt(tileHeight)];
    dispatch(updateLayer(layerName, tileSize));

    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal title="Tileset Settings" open={open} onClose={onClose}>
      <form className="mb-2">
        <label>
          Tile dimensions (px):
          <br />
        </label>
        <div className="mt-2">
          <input type="number" value={tileWidth} onChange={changeGridWidth} className="w-14 mr-1" />
          <input type="number" value={tileHeight} onChange={changeGridHeight} className="w-14 ml-1" />
        </div>
      </form>

      <div className="flex mt-2">
        <span className="w-full mr-1">
          <Button text="Update" onClick={handleClick} />
        </span>
        <span className="w-full ml-1">
          <Button text="Cancel" onClick={onClose} />
        </span>
      </div>
    </Modal>
  );
};

export default TilesetSettingsModal;
