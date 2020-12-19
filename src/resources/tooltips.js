import * as tools from "resources/tools";
import * as tabs from "resources/tabs";

const tooltips = new Map();

tooltips.set(tools.DEFAULT_TOOL, "default tool");
tooltips.set(tools.PLACEMENT_TOOL, "placement tool");
tooltips.set(tools.ERASER_TOOL, "erase tool");
tooltips.set(tools.FILL_TOOL, "fill tool");
tooltips.set(tools.PAN_TOOL, "pan tool");
tooltips.set(tools.MAGNIFY_TOOL, "zoom");

tooltips.set(tabs.TAB_TILES, "tab tiles");
tooltips.set(tabs.TAB_IMPORT, "tab import");
tooltips.set(tabs.TAB_EXPORT, "tab export");
tooltips.set(tabs.TAB_SETTINGS, "settings tab");
tooltips.set(tabs.TAB_HELP, "help tab");

export default tooltips;
