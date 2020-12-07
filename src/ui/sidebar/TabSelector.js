import Icon from '@mdi/react';
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import tooltipMap from 'ui/tooltipMap';
import {
  mdiMap,
  mdiViewModule,
  mdiContentSave,
  mdiUpload,
  mdiHelpCircleOutline,
  mdiCog
} from '@mdi/js';
import {
  TAB_TILES,
  TAB_MAP,
  TAB_IMPORT,
  TAB_SAVE,
  TAB_SETTINGS,
  TAB_HELP,
} from 'ui/sidebar/tabs';
import {
  TOOLTIP_DELAY,
} from 'ui/constants';

const TabButton = ({ icon, path }) => {
  return (
    <NavLink to={path} activeClassName='text-indigo-200 bg-indigo-900'>
      <button className='px-2 py-3 hover:text-indigo-400 hover:bg-indigo-900' data-tip data-for={path}>
        <Icon path={icon} size={1.2} />
      </button>
    </NavLink>
  );
}

const TabSelector = () => {
  const sectionsData = [
    { path: TAB_TILES, icon: mdiViewModule },
    { path: TAB_MAP, icon: mdiMap },
    { path: TAB_IMPORT, icon: mdiUpload },
    { path: TAB_SAVE, icon: mdiContentSave },
    { path: TAB_SETTINGS, icon: mdiCog },
    { path: TAB_HELP, icon: mdiHelpCircleOutline },
  ];

  const sections = sectionsData.map(section =>
    <div key={section.path} className='flex'>
      <TabButton path={section.path} icon={section.icon}/>
      <ReactTooltip id={section.path} place='right' effect='solid' delayShow={TOOLTIP_DELAY}>
        {tooltipMap.get(section.path)}
      </ReactTooltip>
    </div>);

  return (
    <div className='flex flex-col justify-end bg-black'>
      {sections}
    </div>
  );
}

export default TabSelector;
