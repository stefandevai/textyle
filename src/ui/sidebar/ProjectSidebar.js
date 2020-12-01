import MapSettings from 'ui/sidebar/MapSettings';
import TilesetManager from 'ui/sidebar/TilesetManager';

const ProjectSidebar = (props) => {
  return (
    <aside style={{ width: props.width }} className='column is-one-quarter'>
      <div className='content is-small'>
        <MapSettings />
        <TilesetManager />
      </div>
    </aside>
  );
};

export default ProjectSidebar;
