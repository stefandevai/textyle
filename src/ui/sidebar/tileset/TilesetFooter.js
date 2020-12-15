import { useDispatch } from "react-redux";
import { deleteTileset } from "redux/actions";
import { mdiDelete, mdiCog } from "@mdi/js";
import Icon from "@mdi/react";
import * as testIds from "resources/testIds";

const TilesetFooter = ({ selectedTileset }) => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();

  // ====================================
  // Logic
  // ====================================
  const handleSettingsClick = () => {};

  const handleDeleteClick = () => {
    dispatch(deleteTileset(selectedTileset));
  };

  // ====================================
  // Render
  // ====================================
  return (
    <div className="flex items-center justify-start">
      <button onClick={handleSettingsClick} className="hover:text-white">
        <Icon path={mdiCog} size={0.6} />
      </button>
      <button onClick={handleDeleteClick} className="hover:text-white">
        <Icon path={mdiDelete} size={0.65} />
      </button>
    </div>
  );
};

export default TilesetFooter;
