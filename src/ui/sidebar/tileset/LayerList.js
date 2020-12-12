import { useSelector, useDispatch } from 'react-redux';
import { getLayersByAddedTime } from 'redux/selectors';
import LayerListItem from 'ui/sidebar/tileset/LayerListItem';
import LayerListFooter from 'ui/sidebar/tileset/LayerListFooter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { selectLayer, moveLayer } from 'redux/actions';

const LayerList = () => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();

  // ====================================
  // Logic
  // ====================================
  const { selectedLayer, layers } =
    useSelector(state => ({ selectedLayer: state.layers.selected, layers: getLayersByAddedTime(state) }));

  const handleLayerBeforeDragStart = e => {
    dispatch(selectLayer(e.draggableId));
  }

  const handleLayerDragEnd = e => {
    dispatch(moveLayer(e.draggableId, layers.length - e.destination.index - 1));
  }

  // ====================================
  // Render
  // ====================================
  const layerComponents =
    layers.map((l, i) => <LayerListItem key={l.name}
                                        index={i}
                                        layer={l}
                                        isSelected={l.name === selectedLayer}
                         />);

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
      <LayerListFooter selectedLayer={selectedLayer} />
    </>
  );
}

export default LayerList;