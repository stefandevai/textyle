import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  addLayer,
  deleteLayer,
  selectLayer,
  moveLayer,
  toggleLayerVisibility,
} from 'redux/actions';
import {
  mdiEye,
  mdiEyeOffOutline,
  mdiDelete,
  mdiPlaylistPlus,
} from '@mdi/js';

const LayerItemBase = ({ layer, selected, selectLayer, toggleLayerVisibility, index }) => {
  const handleLayerClick = () => {
    selectLayer(layer.name);
  }

  const handleEyeClick = () => {
    toggleLayerVisibility(layer.name);
  }

  const icon = layer.visible ? mdiEye : mdiEyeOffOutline;
  const selectedClassName = selected ? 'bg-gray-700' : 'hover:bg-gray-800';

  return (
    <Draggable key={layer.name} draggableId={layer.name} index={index}>
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

const LayerItem = connect(null, { selectLayer, toggleLayerVisibility })(LayerItemBase);

const Layers = props => {
  const handleAddClick = () => {
    props.addLayer();
  }

  const handleDeleteClick = () => {
    props.deleteLayer(props.selected);
  }

  const handleLayerBeforeDragStart = e => {
    props.selectLayer(e.draggableId);
  }

  const handleLayerDragEnd = e => {
    props.moveLayer(e.draggableId, props.layers.length - e.destination.index - 1);
  }

  const layerComponents = props.layers.map((l, i) => <LayerItem key={l.name}
                                                                index={i}
                                                                layer={l}
                                                                selected={l.name === props.selected}/>);

  const dndArea = (
    <DragDropContext onDragEnd={handleLayerDragEnd} onBeforeDragStart={handleLayerBeforeDragStart}>
      <Droppable droppableId='layers'>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {layerComponents}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>);

  return (
    <div>
      {props.layers && props.layers.length
        ? dndArea
        : 'No layers'}

      <div className='flex items-center justify-start py-3'>
        <button onClick={handleAddClick}>
          <Icon path={mdiPlaylistPlus} size={0.7} />
        </button>
        <button onClick={handleDeleteClick}>
          <Icon path={mdiDelete} size={0.65} />
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const { layers, selected } = state.layers || {};
  const sorted = [...state.layers.ids].reverse().map(n => ({ visible: layers[n].visible, name: n }));
  return { selected, layers: sorted };
}

export default connect(
  mapStateToProps,
  {
    addLayer,
    deleteLayer,
    moveLayer,
    selectLayer,
  })(Layers);
