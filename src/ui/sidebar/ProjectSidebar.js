import TabSelector from 'ui/sidebar/TabSelector';
import TilesetManager from 'ui/sidebar/TilesetManager';
import Map from 'ui/sidebar/Map';
import Settings from 'ui/sidebar/Settings';
import { Switch, Route } from "react-router-dom";
import * as tabs from './tabs';

const ProjectSidebar = () => {
  return (
    <aside className='flex flex-row bg-gray-900'>
      <TabSelector />
      <div className='flex-1'>
        <Switch>
          <Route path={`/${tabs.TAB_TILES}`}>
            <TilesetManager />
          </Route>

          <Route path={`/${tabs.TAB_MAP}`}>
            <Map />
          </Route>

          <Route path={`/${tabs.TAB_IMPORT}`}>
          </Route>

          <Route path={`/${tabs.TAB_SAVE}`}>
          </Route>

          <Route path={`/${tabs.TAB_SETTINGS}`}>
            <Settings />
          </Route>

          <Route path={`/${tabs.TAB_HELP}`}>
          </Route>
        </Switch>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
