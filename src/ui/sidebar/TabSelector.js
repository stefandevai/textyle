import Icon from '@mdi/react';
import { NavLink } from "react-router-dom";
import {
  mdiMap,
  mdiViewModule,
  mdiContentSave,
  mdiUpload,
  mdiHelpCircleOutline,
  mdiCog
} from '@mdi/js';

const TabButton = ({ icon, path }) => {
  return (
    <NavLink to={path} activeClassName='text-indigo-200 bg-indigo-900'>
      <button className='px-2 py-3 hover:text-indigo-400 hover:bg-indigo-900'>
        <Icon path={icon} size={1.2} />
      </button>
    </NavLink>
  );
}

const TabSelector = () => {
  return (
    <div className='flex flex-col justify-end bg-black'>
      <TabButton path='tiles' icon={mdiViewModule} />
      <TabButton path='map' icon={mdiMap} />
      <TabButton path='import' icon={mdiUpload} />
      <TabButton path='save' icon={mdiContentSave} />
      <TabButton path='settings' icon={mdiCog} />
      <TabButton path='help' icon={mdiHelpCircleOutline} />
    </div>
  );
}

export default TabSelector;
