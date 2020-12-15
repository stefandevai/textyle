import ReactTooltip from "react-tooltip";
import tooltips from "ui/tooltips";
import TabButton from "ui/sidebar/TabButton";
import * as tabs from "ui/sidebar/tabs";
import { dividerBorderColor } from "ui/common/styles";
import { TOOLTIP_DELAY } from "ui/constants";
import { mdiMap, mdiViewModule, mdiContentSave, mdiUpload, mdiHelpCircleOutline, mdiCog } from "@mdi/js";

const TabSelector = () => {
  // ====================================
  // Render
  // ====================================
  const sectionsData = [
    { path: tabs.TAB_TILES, icon: mdiViewModule },
    { path: tabs.TAB_MAP, icon: mdiMap },
    { path: tabs.TAB_IMPORT, icon: mdiUpload },
    { path: tabs.TAB_EXPORT, icon: mdiContentSave },
    { path: tabs.TAB_SETTINGS, icon: mdiCog },
    { path: tabs.TAB_HELP, icon: mdiHelpCircleOutline },
  ];

  const sections = sectionsData.map((section) => (
    <div key={section.path} className="flex" data-testid={section.path}>
      <TabButton routerPath={section.path} iconPath={section.icon} />
      <ReactTooltip id={section.path} place="right" effect="solid" delayShow={TOOLTIP_DELAY}>
        {tooltips.get(section.path)}
      </ReactTooltip>
    </div>
  ));

  return <div className={`flex flex-col justify-end bg-black border-r ${dividerBorderColor}`}>{sections}</div>;
};

export default TabSelector;
