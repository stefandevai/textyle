import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { selectLayer, toggleLayerVisibility } from "redux/actions";
import { mdiEye, mdiEyeOffOutline } from "@mdi/js";
import Icon from "@mdi/react";
import * as testIds from "resources/testIds";

const LayerItem = ({ layer, index, isSelected }) => {
  const dispatch = useDispatch();

  const handleLayerClick = () => {
    dispatch(selectLayer(layer.name));
  };

  const handleEyeClick = () => {
    dispatch(toggleLayerVisibility(layer.name));
  };

  const icon = layer.visible ? mdiEye : mdiEyeOffOutline;
  const selectedClassName = isSelected ? "bg-gray-700 hover:text-white" : "bg-gray-800 hover:bg-gray-900";
  const visibilityTestId = layer.visible ? testIds.LAYER_VISIBLE : testIds.LAYER_HIDDEN;

  return (
    <div className="border-t border-gray-700 first:border-t-0">
      <Draggable draggableId={layer.name} index={index}>
        {(provided, snapshop) => {
          const style = {
            cursor: "default",
            ...provided.draggableProps.style,
          };

          return (
            <li
              className={`flex items-center select-none ${selectedClassName}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
              data-testid={visibilityTestId}
            >
              <span className="flex-1 pl-4 py-1" onClick={handleLayerClick}>
                {layer.name}
              </span>
              <span
                onClick={handleEyeClick}
                className="cursor-pointer pr-4 py-1 hover:text-white"
                data-testid={testIds.HIDE_LAYER_BUTTON}
              >
                <Icon path={icon} size={0.6} />
              </span>
            </li>
          );
        }}
      </Draggable>
    </div>
  );
};

export default LayerItem;
