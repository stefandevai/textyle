import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTileset } from "redux/actions";
import { LOCAL_STORAGE_LAST_SELECTED_TILESET } from "ui/constants";
import Select from "ui/common/Select";

const TilesetSelector = () => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();
  const { selectedTileset, tilesetNames } = useSelector((state) => state.tileset);

  // ====================================
  // Logic
  // ====================================
  // Get last tileset used from localStorage
  useEffect(() => {
    const lastSelectedTileset = localStorage.getItem(LOCAL_STORAGE_LAST_SELECTED_TILESET);

    // TODO: Check if tileset exists
    if (lastSelectedTileset && lastSelectedTileset !== "") {
      dispatch(selectTileset(lastSelectedTileset));
    } else {
      localStorage.setItem(LOCAL_STORAGE_LAST_SELECTED_TILESET, "");
    }
  }, [dispatch]);

  const onOptionSelected = (e) => {
    const name = e.target.value;
    localStorage.setItem(LOCAL_STORAGE_LAST_SELECTED_TILESET, name);
    dispatch(selectTileset(name));
  };

  // ====================================
  // Render
  // ====================================
  const options = [];
  for (const value of tilesetNames) {
    options.push(
      <option value={value} key={value} data-testid={value}>
        {value}
      </option>
    );
  }

  return tilesetNames.length > 0 && <Select value={selectedTileset} options={options} onChange={onOptionSelected} />;
};

export default TilesetSelector;
