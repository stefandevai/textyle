import { useDispatch } from "react-redux";
import { addLayer, deleteLayer } from "redux/actions";
import { mdiDelete, mdiPlaylistPlus } from "@mdi/js";
import Icon from "@mdi/react";
import * as testIds from "resources/testIds";

const LayerListFooter = ({ selectedLayer }) => {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(addLayer());
  };

  const handleDeleteClick = () => {
    dispatch(deleteLayer(selectedLayer));
  };

  return (
    <div className="flex items-center justify-start mt-1">
      <button onClick={handleAddClick} data-testid={testIds.ADD_LAYER_BUTTON} className="hover:text-white">
        <Icon path={mdiPlaylistPlus} size={0.7} />
      </button>
      <button onClick={handleDeleteClick} data-testid={testIds.DELETE_LAYER_BUTTON} className="hover:text-white">
        <Icon path={mdiDelete} size={0.65} />
      </button>
    </div>
  );
};

export default LayerListFooter;
