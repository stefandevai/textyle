import TabSelector from "ui/sidebar/TabSelector";
import Edit from "ui/sidebar/tileset/Edit";
import MapSettings from "ui/sidebar/map/MapSettings";
import ImportSettings from "ui/sidebar/import/ImportSettings";
import ExportSettings from "ui/sidebar/export/ExportSettings";
import ProjectSettings from "ui/sidebar/project/ProjectSettings";
import Help from "ui/sidebar/Help";
import { Switch, Route } from "react-router-dom";
import { dividerBorderColor } from "resources/styles";
import * as tabs from "resources/tabs";

const Sidebar = () => {
  // ====================================
  // Render
  // ====================================
  return (
    <aside className={`flex flex-row bg-gray-900 border-r border-b ${dividerBorderColor}`}>
      <TabSelector />
      <Switch>
        <Route path={`/${tabs.TAB_TILES}`}>
          <Edit />
        </Route>

        <Route path={`/${tabs.TAB_MAP}`}>
          <MapSettings />
        </Route>

        <Route path={`/${tabs.TAB_IMPORT}`}>
          <ImportSettings />
        </Route>

        <Route path={`/${tabs.TAB_EXPORT}`}>
          <ExportSettings />
        </Route>

        <Route path={`/${tabs.TAB_SETTINGS}`}>
          <ProjectSettings />
        </Route>

        <Route path={`/${tabs.TAB_HELP}`}>
          <Help />
        </Route>
      </Switch>
    </aside>
  );
};

export default Sidebar;
