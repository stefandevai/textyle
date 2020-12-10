import { useState } from 'react';
import { Collapse } from 'react-collapse';
import 'ui/common/CollapseTab.css';
import Icon from '@mdi/react';
import {
  mdiMenuDown,
  mdiMenuUp,
} from '@mdi/js';

const CollapseSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  const icon = open ? mdiMenuUp : mdiMenuDown;

  return (
    <div>
      <div className='flex items-center border-b border-gray-50 cursor-pointer'
           onDoubleClick={e => setOpen(!open)}>

        <Icon path={icon} size={1} />

        <h1 className='text-sm select-none'>
          {title}
        </h1>
      </div>

      <Collapse isOpened={open}>
        <div className='text-xs px-2 py-4'>
          {children}
        </div>
      </Collapse>
    </div>
  );
}

export default CollapseSection;
