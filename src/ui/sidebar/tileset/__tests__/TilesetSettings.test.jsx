import React from "react";
import * as fakeIdb from "fake-indexeddb/auto";
import { render, fireEvent, screen } from "utils/test/testRender";
import TilesetSettings from "../TilesetSettings";
import * as testIds from "resources/testIds";

const initialState = {
  tileset: {
    tilesetNames: [],
    tilesets: {},
    selectedTileset: "",
    selectedTile: -1,
    hasLoadedTextures: true,
  },
};

it("it should display a file input button when mount", () => {
  render(<TilesetSettings />, { initialState });

  let fileInput = screen.getByTestId(testIds.TILESET_FILE_INPUT);
  expect(fileInput).toBeInTheDocument();
});

