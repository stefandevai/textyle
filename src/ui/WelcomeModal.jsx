import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { displaySidebar, addTileset, completeTextureLoading } from "redux/actions";
import { useHistory } from "react-router-dom";
import { dataURLtoFile } from "utils/file";
import TileManagerInstance from "renderer/TileManager";
import Modal from "ui/common/Modal";
import Button from "ui/common/Button";
import Anchor from "ui/common/Anchor";
import tilesetSample from "resources/tileset_sample.png";

const WelcomeModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [markdownSource, setMarkdownSource] = useState("");
  const history = useHistory();

  useEffect(() => {
    const hasBeenWelcomed = window.localStorage.getItem("welcomed");

    if (hasBeenWelcomed === "true") {
      return;
    }

    window.localStorage.setItem("welcomed", "true");
    setOpen(true);
  }, []);

  const onClose = () => {
    const tilesetSampleFile = dataURLtoFile(tilesetSample, "tileset_sample.png");
    dispatch(addTileset("Example Tileset", [32, 32], TileManagerInstance.lastId, tilesetSampleFile));
    dispatch(completeTextureLoading());
    dispatch(displaySidebar(true));
    setOpen(false);
    history.replace("/tiles");
  };

  return open ? (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Welcome to Textyle!</h1>
        <div className="max-w-md text-base">
          <p className="pb-4">
            Textyle is a free and open source tilemap editor that is{" "}
            <span className="underline">still in development</span>. The goal is to provide the most simple and
            straightforward way to create 2D tilemaps.
          </p>
          <p className="pb-4">If you enjoy this project and want to help in its development, consider:</p>
          <ul className="list-disc ml-8 pb-4">
            <li>
              Talking to us on <Anchor href="https://discord.gg/BtEPJmkacp">Discord</Anchor>
            </li>
            <li>
              Contributing to the code on <Anchor href="https://github.com/stefandevai/textyle">GitHub</Anchor>
            </li>
            <li>
              <Anchor href="https://textyle.app/contribute">Donating</Anchor> any amount
            </li>
          </ul>
          <p className="pb-4">Thank you so much for trying this early version of Textyle :)</p>
        </div>
        <span className="w-full text-base font-bold">
          <Button text="Start Tiling!" onClick={onClose} />
        </span>
      </div>
    </Modal>
  ) : null;
};

export default WelcomeModal;
