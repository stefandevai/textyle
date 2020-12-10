import { connect, useDispatch } from 'react-redux';
import { getLayersByAddedTime } from 'redux/selectors';
import LayerListItem from 'ui/sidebar/tileset/LayerListItem';
import LayerListFooter from 'ui/sidebar/tileset/LayerListFooter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  selectLayer,
  moveLayer,
} from 'redux/actions';

const LayerList = ({ selected, layers }) => {
  const dispatch = useDispatch();

  const handleLayerBeforeDragStart = e => {
    dispatch(selectLayer(e.draggableId));
  }

  const handleLayerDragEnd = e => {
    dispatch(moveLayer(e.draggableId, layers.length - e.destination.index - 1));
  }

  const layerComponents = layers.map((l, i) => <LayerListItem key={l.name}
                                                              index={i}
                                                              layer={l}
                                                              selected={l.name === selected}/>);

  const dndArea = layers && layers.length
    ? <DragDropContext onDragEnd={handleLayerDragEnd} onBeforeDragStart={handleLayerBeforeDragStart}>
        <Droppable droppableId='layers'>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {layerComponents}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    : <div />;

  return (
    <>
      {dndArea}
      <LayerListFooter selected={selected} />
    </>
  );
}

const mapStateToProps = state => {
  const { selected } = state.layers || {};
  return { selected, layers: getLayersByAddedTime(state) };
}

export default connect(mapStateToProps)(LayerList);
