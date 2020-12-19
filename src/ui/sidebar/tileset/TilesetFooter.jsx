import { useState } from 'react';
import { useDispatch } from "react-redux";
import { deleteTileset } from "redux/actions";
import { mdiDelete, mdiCog } from "@mdi/js";
import TilesetSettingsModal from 'ui/sidebar/tileset/TilesetSettingsModal';
import Icon from "@mdi/react";
import * as testIds from "resources/testIds";

const TilesetFooter = ({ selectedTileset }) => {
  const dispatch = useDispatch();
  const [showTilesetSettings, setShowTilesetSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowTilesetSettings(true);
  };

  const handleSettingsClose = () => {
    setShowTilesetSettings(false);
  }

  const handleDeleteClick = () => {
    dispatch(deleteTileset(selectedTileset));
  };

  return (
    <>
      <div className="flex items-center justify-start">
        <button onClick={handleSettingsClick} className="hover:text-white">
          <Icon path={mdiCog} size={0.6} />
        </button>
        <button onClick={handleDeleteClick} className="hover:text-white" data-testid={testIds.TILESET_FOOTER_DELETE_BUTTON}>
          <Icon path={mdiDelete} size={0.65} />
        </button>
      </div>

      {showTilesetSettings &&
        <TilesetSettingsModal
          tilesetName={selectedTileset}
          open={showTilesetSettings}
          onClose={handleSettingsClose}
        />}
    </>
  );
};

export default TilesetFooter;
