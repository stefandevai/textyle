import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { displaySidebar, addTileset, completeTextureLoading } from "redux/actions";
import { useHistory } from 'react-router-dom';
import { dataURLtoFile } from "utils/file";
import TileManagerInstance from "renderer/TileManager";
import Modal from "ui/common/Modal";
import Button from "ui/common/Button";
import tilesetSample from 'resources/tileset_sample.png';

const WelcomeModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const hasBeenWelcomed = window.localStorage.getItem('welcomed');

    if (hasBeenWelcomed === 'true') {
      return;
    }

    setOpen(true);
    window.localStorage.setItem('welcomed', 'true');
  }, [])

  const onClose = () => {
    const tilesetSampleFile = dataURLtoFile(tilesetSample, 'tileset_sample.png');
    dispatch(addTileset('Example Tileset', [32, 32], TileManagerInstance.lastId, tilesetSampleFile));
    dispatch(completeTextureLoading());
    dispatch(displaySidebar(true));
    setOpen(false);
    history.replace('/tiles');
  }

  return open
    ? (<Modal title="Welcome to Textyle!" open={open} onClose={onClose}>
         <h1>Welcome!!</h1>
         <div className="flex mt-2">
           <span className="w-full">
             <Button text="Start Tiling!" onClick={onClose} />
           </span>
         </div>
       </Modal>)
  : null;
};

export default WelcomeModal;

