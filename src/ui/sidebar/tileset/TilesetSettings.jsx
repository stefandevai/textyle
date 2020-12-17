import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTileset, loadExistingTilesets } from "redux/actions";
import { setTextureData, getTextureNames, hasTexture } from "idbTextureStore";
import LayerList from "ui/sidebar/tileset/LayerList";
import TilesetPreview from "ui/sidebar/tileset/TilesetPreview";
import TilesetSelector from "ui/sidebar/tileset/TilesetSelector";
import TileManagerInstance from "renderer/TileManager";
import CollapseSection from "ui/common/CollapseTab";
import FileInput from "ui/common/FileInput";
import TilesetFooter from "ui/sidebar/tileset/TilesetFooter";
import { ADD_TILESET_TITLE } from "ui/constants";

const tileSize = [32, 32];

const TilesetManager = () => {
  const dispatch = useDispatch();
  const tilesetNames = useSelector((state) => state.tileset.tilesetNames);
  const hasLoadedTextures = useSelector((state) => state.tileset.hasLoadedTextures);
  const selectedTileset = useSelector((state) => state.tileset.selectedTileset);

  // Load existing tilesets
  useEffect(() => {
    getTextureNames().then((textures) => {
      dispatch(loadExistingTilesets(textures));
    }); // eslint-disable-next-line
  }, []);

  const onTilesetUpload = async (event) => {
    // Return if file is invalid
    if (event.target.files.length <= 0 || !event.target.files[0]) {
      return;
    }

    dispatch(addTileset(event.target.files[0].name, event.target.files[0]));
  };

  return (
    <CollapseSection title="Tileset">
      {hasLoadedTextures ? (
        <>
          <TilesetSelector />
          <div className="mt-2">
            <FileInput title={ADD_TILESET_TITLE} onUpload={(e) => onTilesetUpload(e)} />
          </div>
          <TilesetPreview
            selectable={true}
            tileSize={tileSize}
          />
          {selectedTileset && <TilesetFooter selectedTileset={selectedTileset} />}
        </>
      ) : (
        <div />
      )}
    </CollapseSection>
  );
};

export default TilesetManager;
