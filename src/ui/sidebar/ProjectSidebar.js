import MapSettings from 'ui/sidebar/MapSettings';
import TilesetManager from 'ui/sidebar/TilesetManager';

const ProjectSidebar = (props) => {
  return (
    <div style={{ width: props.width }}>
      <MapSettings />
      <TilesetManager />
    </div>
  );
};

export default ProjectSidebar;
