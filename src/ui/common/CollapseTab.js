import { useState } from 'react';
import { Collapse } from 'react-collapse';
import 'ui/common/CollapseTab.css';
import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuRight } from '@mdi/js';
import { dividerBorderColor, titleBarHeight } from './styles.js';

const CollapseSection = ({ title, children }) => {
  // ====================================
  // Initialize
  // ====================================
  const [open, setOpen] = useState(true);
  const icon = open ? mdiMenuDown : mdiMenuRight;
  const sectionClass = open ? `border-b ${dividerBorderColor}` : '';

  // ====================================
  // Render
  // ====================================
  return (
    <div className={sectionClass}>
      <div className={`flex items-center hover:bg-gray-800 cursor-pointer border-b ${dividerBorderColor} ${titleBarHeight}`}
           onDoubleClick={e => setOpen(!open)}
      >
        <Icon path={icon} size={1} />

        <h1 className='select-none'>
          {title}
        </h1>
      </div>

      <Collapse isOpened={open}>
        <div className='text-xs text-gray-400 px-2 py-4'>
          {children}
        </div>
      </Collapse>
    </div>
  );
}

export default CollapseSection;
