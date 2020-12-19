import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTileset, loadExistingTileset, completeTextureLoading } from "redux/actions";
import { getTextureNames, getTextureData, hasTexture } from "idbTextureStore";
import LayerList from "ui/sidebar/tileset/LayerList";
import TilesetPreview from "ui/sidebar/tileset/TilesetPreview";
import TilesetSelector from "ui/sidebar/tileset/TilesetSelector";
import TileManagerInstance from "renderer/TileManager";
import CollapseSection from "ui/common/CollapseTab";
import FileInput from "ui/common/FileInput";
import TilesetFooter from "ui/sidebar/tileset/TilesetFooter";
import { ADD_TILESET_TITLE } from "ui/constants";
import * as testIds from "resources/testIds";

const TilesetManager = () => {
  const dispatch = useDispatch();
  const tilesetNames = useSelector((state) => state.tileset.tilesetNames);
  const hasLoadedTextures = useSelector((state) => state.tileset.hasLoadedTextures);
  const selectedTileset = useSelector((state) => state.tileset.selectedTileset);
  const tileSize = useSelector((state) => state.canvas.tileSize);
  const tilesetData = useSelector((state) => state.tileset.tilesets[selectedTileset]);

  // Load existing tilesets
  useEffect(() => {
    if (hasLoadedTextures) {
      return;
    }

    getTextureNames().then(async (textures) => {
      for (const textureName of textures) {
        const data = await getTextureData(textureName);
        dispatch(loadExistingTileset(textureName, data.tileSize, data.tilesetIndex));
      }
      dispatch(completeTextureLoading());
    });
  }, [dispatch, hasLoadedTextures]);

  const onTilesetUpload = async (event) => {
    // Return if file is invalid
    if (event.target.files.length <= 0 || !event.target.files[0]) {
      return;
    }

    dispatch(addTileset(event.target.files[0].name, tileSize, TileManagerInstance.lastId, event.target.files[0]));
  };

  return (
    <CollapseSection title="Tileset">
      {hasLoadedTextures ? (
        <>
          <TilesetSelector />

          <div className="mt-2" data-testid={testIds.TILESET_FILE_INPUT}>
            <FileInput title={ADD_TILESET_TITLE} onUpload={(e) => onTilesetUpload(e)} />
          </div>

          {tilesetData && (
            <TilesetPreview tilesetName={selectedTileset} selectable={true} tileSize={tilesetData.tileSize} tilesetIndex={tilesetData.tilesetIndex} />
          )}

          {selectedTileset && <TilesetFooter selectedTileset={selectedTileset} />}
        </>
      ) : (
        <div />
      )}
    </CollapseSection>
  );
};

export default TilesetManager;
