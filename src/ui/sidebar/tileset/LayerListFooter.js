import { useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import {
  addLayer,
  deleteLayer,
} from 'redux/actions';
import {
  mdiDelete,
  mdiPlaylistPlus,
} from '@mdi/js';

const LayerListFooter = ({ selected }) => {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(addLayer());
  }

  const handleDeleteClick = () => {
    dispatch(deleteLayer(selected));
  }

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
