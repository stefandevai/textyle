import { useState } from 'react';
import Slider from 'ui/common/SliderInput';

const MapSettings = (props) => {
  const [tileSize, setTileSize] = useState(32);

  return (
    <div>
      <h1>Map</h1>
      <Slider title="Tile size" onChange={e => setTileSize(e.target.value)} value={tileSize} />
    </div>
  );
}

export default MapSettings;
