import React from "react";
import * as fakeIdb from "fake-indexeddb/auto";
import { render, fireEvent, screen } from "utils/test/testRender";
import { HashRouter } from "react-router-dom";
import Sidebar from "../Sidebar";
import * as tabs from "resources/tabs";
import * as testIds from "resources/testIds";

it("should show and hide the sidebar on multiple clicks", () => {
  console.warn = jest.fn();
  localStorage.setItem("welcomed", "true");

  render(
    <HashRouter>
      <Sidebar />
    </HashRouter>
  );

  let sidebar = screen.queryByTestId(testIds.SIDEBAR_ELEMENT);
  expect(sidebar).not.toBeInTheDocument();

  let button = screen.getByTestId(tabs.TAB_TILES);
  fireEvent.click(button);

  sidebar = screen.queryByTestId(testIds.SIDEBAR_ELEMENT);
  expect(sidebar).toBeInTheDocument();

  fireEvent.click(button);

  sidebar = screen.queryByTestId(testIds.SIDEBAR_ELEMENT);
  expect(sidebar).not.toBeInTheDocument();

  button = screen.getByTestId(tabs.TAB_EXPORT);
  fireEvent.click(button);

  sidebar = screen.queryByTestId(testIds.SIDEBAR_ELEMENT);
  expect(sidebar).toBeInTheDocument();

  button = screen.getByTestId(tabs.TAB_HELP);
  fireEvent.click(button);

  sidebar = screen.queryByTestId(testIds.SIDEBAR_ELEMENT);
  expect(sidebar).toBeInTheDocument();

  fireEvent.click(button);

  sidebar = screen.queryByTestId(testIds.SIDEBAR_ELEMENT);
  expect(sidebar).not.toBeInTheDocument();
});
