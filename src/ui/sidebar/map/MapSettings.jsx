import { useState } from "react";
import Tab from "ui/common/Tab";
import Slider from "ui/common/SliderInput";

const MapSettings = (props) => {
  const [tileSize, setTileSize] = useState(32);

  return (
    <Tab title="Map Settings">
      <Slider title="Tile size" onChange={(e) => setTileSize(e.target.value)} value={tileSize} />
    </Tab>
  );
};

export default MapSettings;
