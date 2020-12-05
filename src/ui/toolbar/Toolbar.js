import Icon from '@mdi/react';
import {
  mdiPencil,
  mdiPail,
  mdiSelect,
  mdiCursorDefaultOutline,
  mdiCursorMove,
} from '@mdi/js';

const Tool = ({ icon }) => {
  return (
    <button className='px-4 py-2 cursor-default'>
      <div className='hover:text-indigo-400 cursor-pointer'>
        <Icon path={icon} size={0.75} />
      </div>
    </button>
  );
}

const Toolbar = () => {
  return (
    <nav className='flex flex-row items-stretch bg-black'>
      <div className='flex flex-row justify-start items-center flex-grow'>
        <Tool icon={mdiCursorDefaultOutline} />
        <Tool icon={mdiPencil} />
        <Tool icon={mdiPail} />
        <Tool icon={mdiCursorMove} />
        <Tool icon={mdiSelect} />
      </div>
    </nav>
  );
}

export default Toolbar;

