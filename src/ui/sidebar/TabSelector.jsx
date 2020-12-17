import ReactTooltip from "react-tooltip";
import TabButton from "ui/sidebar/TabButton";
import tooltips from "resources/tooltips";
import * as tabs from "resources/tabs";
import { tabbarColor, dividerBorderColor } from "resources/styles";
import { TOOLTIP_DELAY } from "ui/constants";
import { mdiMap, mdiViewModule, mdiContentSave, mdiUpload, mdiHelpCircleOutline, mdiCog } from "@mdi/js";
import { ReactComponent as Logo } from 'resources/logo.svg';

const TabSelector = () => {
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

  return (
    <div className={`w-10 flex flex-col justify-end bg-almost-black border-r ${dividerBorderColor}`}>
      <div className='flex-1 flex flex-col justify-start'>
        <div className='py-3 px-0.5'>
          <Logo />
        </div>
      </div>
      {sections}
    </div>);
};

export default TabSelector;
