import * as tools from "ui/canvas/tools";
import * as tabs from "ui/sidebar/tabs";

const tooltips = new Map();

tooltips.set(tools.DEFAULT_TOOL, "default tool");
tooltips.set(tools.PLACEMENT_TOOL, "placement tool");
tooltips.set(tools.FILL_TOOL, "fill tool");
tooltips.set(tools.MOVE_TOOL, "move tool");

tooltips.set(tabs.TAB_TILES, "tab tiles");
tooltips.set(tabs.TAB_MAP, "tab map");
tooltips.set(tabs.TAB_IMPORT, "tab import");
tooltips.set(tabs.TAB_EXPORT, "tab export");
tooltips.set(tabs.TAB_SETTINGS, "settings tab");
tooltips.set(tabs.TAB_HELP, "help tab");

export default tooltips;
