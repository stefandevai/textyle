import * as tools from 'ui/toolbar/tools';
import * as tabs from 'ui/sidebar/tabs';

const tooltipMap = new Map();

tooltipMap.set(tools.DEFAULT_TOOL, 'default tool');
tooltipMap.set(tools.PLACEMENT_TOOL, 'placement tool');
tooltipMap.set(tools.FILL_TOOL, 'fill tool');
tooltipMap.set(tools.MOVE_TOOL, 'move tool');

tooltipMap.set(tabs.TAB_TILES, 'tab tiles');
tooltipMap.set(tabs.TAB_MAP, 'tab map');
tooltipMap.set(tabs.TAB_IMPORT, 'tab import');
tooltipMap.set(tabs.TAB_SAVE, 'tab save');
tooltipMap.set(tabs.TAB_SETTINGS, 'settings tab');
tooltipMap.set(tabs.TAB_HELP, 'help tab');

export default tooltipMap;
