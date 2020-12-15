import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TabSelector from "../TabSelector";
import { HashRouter } from "react-router-dom";
import * as tabs from "ui/sidebar/tabs";

it("should display sidebar tabs", () => {
  render(
    <HashRouter>
      <TabSelector />
    </HashRouter>
  );

  let button = screen.getByTestId(tabs.TAB_TILES);
  expect(button).toBeInTheDocument();

  button = screen.getByTestId(tabs.TAB_MAP);
  expect(button).toBeInTheDocument();

  button = screen.getByTestId(tabs.TAB_EXPORT);
  expect(button).toBeInTheDocument();

  button = screen.getByTestId(tabs.TAB_IMPORT);
  expect(button).toBeInTheDocument();

  button = screen.getByTestId(tabs.TAB_SETTINGS);
  expect(button).toBeInTheDocument();

  button = screen.getByTestId(tabs.TAB_HELP);
  expect(button).toBeInTheDocument();
});
