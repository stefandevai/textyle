import TabSelector from 'ui/sidebar/TabSelector';
import TilesetSettings from 'ui/sidebar/tileset/TilesetSettings';
import MapSettings from 'ui/sidebar/map/MapSettings';
import ImportSettings from 'ui/sidebar/import/ImportSettings';
import ExportSettings from 'ui/sidebar/export/ExportSettings';
import ProjectSettings from 'ui/sidebar/project/ProjectSettings';
import Help from 'ui/sidebar/Help';
import { Switch, Route } from "react-router-dom";
import * as tabs from './tabs';

const Sidebar = () => {
  // ====================================
  // Render
  // ====================================
  return (
    <aside className='flex flex-row bg-gray-900'>
      <TabSelector />
      <div className='flex-1'>
        <Switch>
          <Route path={`/${tabs.TAB_TILES}`}>
            <TilesetSettings />
          </Route>

          <Route path={`/${tabs.TAB_MAP}`}>
            <MapSettings />
          </Route>

          <Route path={`/${tabs.TAB_IMPORT}`}>
            <ImportSettings />
          </Route>

          <Route path={`/${tabs.TAB_SAVE}`}>
            <ExportSettings />
          </Route>

          <Route path={`/${tabs.TAB_SETTINGS}`}>
            <ProjectSettings />
          </Route>

          <Route path={`/${tabs.TAB_HELP}`}>
            <Help />
          </Route>
        </Switch>
      </div>
    </aside>
  );
};

export default Sidebar;
