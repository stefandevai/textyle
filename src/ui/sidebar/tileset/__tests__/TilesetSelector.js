import React from "react";
import { render, fireEvent, screen } from "utils/test/testRender";
import TilesetSelector from "../TilesetSelector";
import * as testIds from "resources/testIds";

const initialState = {
  tileset: {
    selectedTileset: "test1",
    tilesetNames: ["test1", "test2", "test3"],
  },
};

it("it should select different textures", () => {
  render(<TilesetSelector />, { initialState });

  let option = screen.getByTestId("test1");
  expect(option.selected).toBeTruthy();

  option = screen.getByTestId("test3");
  expect(option.selected).toBeFalsy();

  const select = screen.getByTestId(testIds.SELECT_TAG);
  expect(select).toBeInTheDocument();

  fireEvent.change(select, { target: { value: "test3" } });

  option = screen.getByTestId("test3");
  expect(option.selected).toBeTruthy();

  fireEvent.change(select, { target: { value: "test2" } });

  option = screen.getByTestId("test2");
  expect(option.selected).toBeTruthy();
});
