import React from 'react';
import { connect } from 'react-redux';
import { selectTool } from 'redux/actions';
import ReactTooltip from "react-tooltip";
import tooltipMap from 'ui/tooltipMap';
import Icon from '@mdi/react';
import {
  mdiPencil,
  mdiPail,
  mdiSelect,
  mdiCursorDefaultOutline,
  mdiCursorMove,
} from '@mdi/js';
import {
  DEFAULT_TOOL,
  PLACEMENT_TOOL,
  FILL_TOOL,
  MOVE_TOOL,
} from 'ui/toolbar/tools'
import {
  TOOLTIP_DELAY,
} from 'ui/constants';

const Tool = ({ icon, tool, selectedTool, selectTool }) => {
  const iconClasses = tool === selectedTool
    ? 'text-indigo-400 hover:text-indigo-500'
    : 'hover:text-indigo-500 cursor-pointer';

  return (
    <button className='px-4 py-2 cursor-default' role='button' data-testid={tool === selectedTool ? 'selected-tool' : ''}>
      <div className={iconClasses} onClick={e => selectTool(tool)} data-tip data-for={tool} data-testid={tool}>
        <Icon path={icon} size={0.75} />
      </div>
      <ReactTooltip id={tool} place='bottom' effect='solid' delayShow={TOOLTIP_DELAY}>
        {tooltipMap.get(tool)}
      </ReactTooltip>
    </button>
  );
}

const mapStateToProps = state => {
  const { selectedTool } = state.canvas || {};
  return { selectedTool };
}

const ToolC = connect(mapStateToProps, { selectTool })(Tool);

const Toolbar = () => {
  return (
    <nav className='flex flex-row items-stretch bg-black'>
      <div className='flex flex-row justify-start items-center flex-grow'>
        <ToolC icon={mdiCursorDefaultOutline} tool={DEFAULT_TOOL} />
        <ToolC icon={mdiPencil} tool={PLACEMENT_TOOL} />
        <ToolC icon={mdiPail} tool={FILL_TOOL} />
        <ToolC icon={mdiCursorMove} tool={MOVE_TOOL} />
      </div>
    </nav>
  );
}

export default Toolbar;
