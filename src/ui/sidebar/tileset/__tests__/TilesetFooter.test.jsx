import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "redux/reducers";
import { deleteTileset } from "redux/actions";
import * as fakeIdb from "fake-indexeddb/auto";
import { render, fireEvent, screen } from "@testing-library/react";
import TilesetFooter from "../TilesetFooter";
import * as testIds from "resources/testIds";

it("should delete a tileset", () => {
  const tilesetName = "ts";

  const initialState = {
    tileset: {
      selectedTileset: tilesetName,
    },
  };

  const store = createStore(rootReducer, initialState);
  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <TilesetFooter selectedTileset={tilesetName} />
    </Provider>
  );

  const button = screen.getByTestId(testIds.TILESET_FOOTER_DELETE_BUTTON);
  expect(button).toBeInTheDocument();
  fireEvent.click(button);

  expect(store.dispatch).toHaveBeenCalledTimes(1);
  expect(store.dispatch).toHaveBeenCalledWith(deleteTileset(tilesetName));
});
