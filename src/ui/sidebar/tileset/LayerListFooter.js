import { useDispatch } from 'react-redux';
import { addLayer, deleteLayer } from 'redux/actions';
import { mdiDelete, mdiPlaylistPlus } from '@mdi/js';
import Icon from '@mdi/react';

const LayerListFooter = ({ selectedLayer }) => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();

  // ====================================
  // Logic
  // ====================================
  const handleAddClick = () => {
    dispatch(addLayer());
  }

  const handleDeleteClick = () => {
    dispatch(deleteLayer(selectedLayer));
  }

  // ====================================
  // Render
  // ====================================
  return (
    <div className='flex items-center justify-start py-3'>
      <button onClick={handleAddClick}>
        <Icon path={mdiPlaylistPlus} size={0.7} />
      </button>
      <button onClick={handleDeleteClick}>
        <Icon path={mdiDelete} size={0.65} />
      </button>
    </div>
  );
}

export default LayerListFooter;
