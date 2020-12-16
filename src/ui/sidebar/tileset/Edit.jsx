import Tab from "ui/common/Tab";
import LayerList from "ui/sidebar/tileset/LayerList";
import TilesetSettings from "ui/sidebar/tileset/TilesetSettings";

const Edit = () => {
  return (
    <Tab title="Edit">
      <LayerList />
      <TilesetSettings />
    </Tab>
  );
};

export default Edit;
