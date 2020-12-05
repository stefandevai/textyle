import TabSelector from 'ui/sidebar/TabSelector';
import TilesetManager from 'ui/sidebar/TilesetManager';
import Map from 'ui/sidebar/Map';
import Settings from 'ui/sidebar/Settings';
import { Switch, Route } from "react-router-dom";

const ProjectSidebar = () => {
  return (
    <aside className='flex flex-row bg-gray-900'>
      <TabSelector />
      <div className='mx-2 my-6'>
        <Switch>
          <Route path='/tiles'>
            <TilesetManager />
          </Route>

          <Route path='/map'>
            <Map />
          </Route>

          <Route path='/import'>
          </Route>

          <Route path='/save'>
          </Route>

          <Route path='/settings'>
            <Settings />
          </Route>

          <Route path='/help'>
          </Route>
        </Switch>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
