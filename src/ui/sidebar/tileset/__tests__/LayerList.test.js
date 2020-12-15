import React from "react";
import { render, fireEvent, screen } from "utils/test/testRender";
import LayerList from "../LayerList";
import * as testIds from "resources/testIds";

const initialState = {
  layers: {
    names: ["test1"],
    layers: { test1: { visible: true } },
    selected: "",
    lastIdx: 1,
  },
};

it("should display a layer", () => {
  render(<LayerList />, { initialState });

  const layer = screen.queryByText(initialState.layers.names[0]);
  expect(layer).toBeInTheDocument();
});

it("should add a layer when clicked", () => {
  render(<LayerList />, { initialState });
  const defaultLayerPlaceholder = "Layer";
  const defaultLayerName = `${defaultLayerPlaceholder} ${initialState.layers.lastIdx + 1}`;

  const addLayerButton = screen.getByTestId(testIds.ADD_LAYER_BUTTON);
  fireEvent.click(addLayerButton);

  const layer = screen.queryByText(defaultLayerName);
  expect(layer).toBeInTheDocument();
});

it("should delete a layer when clicked", () => {
  render(<LayerList />, { initialState });

  let layer = screen.queryByText(initialState.layers.names[0]);
  expect(layer).toBeInTheDocument();
  fireEvent.click(layer);

  const deleteLayerButton = screen.getByTestId(testIds.DELETE_LAYER_BUTTON);
  fireEvent.click(deleteLayerButton);

  layer = screen.queryByText(initialState.layers.names[0]);
  expect(layer).not.toBeInTheDocument();
});

it("should hide a layer when clicked", () => {
  render(<LayerList />, { initialState });

  let visibleLayer = screen.queryByTestId(testIds.LAYER_VISIBLE);
  let hiddenLayer = screen.queryByTestId(testIds.LAYER_HIDDEN);
  expect(visibleLayer).toBeInTheDocument();
  expect(hiddenLayer).not.toBeInTheDocument();

  const hideLayerButton = screen.getByTestId(testIds.HIDE_LAYER_BUTTON);
  fireEvent.click(hideLayerButton);

  visibleLayer = screen.queryByTestId(testIds.LAYER_VISIBLE);
  hiddenLayer = screen.queryByTestId(testIds.LAYER_HIDDEN);
  expect(visibleLayer).not.toBeInTheDocument();
  expect(hiddenLayer).toBeInTheDocument();
});
