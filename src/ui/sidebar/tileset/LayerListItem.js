import { connect, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import Icon from '@mdi/react';
import {
  selectLayer,
  toggleLayerVisibility,
} from 'redux/actions';
import {
  mdiEye,
  mdiEyeOffOutline,
} from '@mdi/js';

const LayerItem = ({ layer, selected, index, selectLayer, toggleLayerVisibility }) => {
  const handleLayerClick = () => {
    selectLayer(layer.name);
  }

  const handleEyeClick = () => {
    toggleLayerVisibility(layer.name);
  }

  const icon = layer.visible ? mdiEye : mdiEyeOffOutline;
  const selectedClassName = selected ? 'bg-gray-700' : 'hover:bg-gray-800';

  return (
    <Draggable draggableId={layer.name} index={index}>
      {(provided, snapshop) => {
        const style = {
          cursor: 'default',
          ...provided.draggableProps.style,
        };

        return (
          <li className={`flex items-center select-none ${selectedClassName}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}>

            <span className='flex-1 pl-4 py-1' onClick={handleLayerClick}>
              {layer.name}
            </span>
            <span onClick={handleEyeClick} className='cursor-pointer pr-4 py-1'>
              <Icon path={icon} size={0.6} />
            </span>
          </li>);
        }
      }
    </Draggable>
  );
}

export default connect(null, { selectLayer, toggleLayerVisibility })(LayerItem);

