import React from 'react';
import { render, fireEvent, screen } from 'utils/test/testRender';
import Toolbar from '../Toolbar';
import { DEFAULT_TOOL, FILL_TOOL } from 'ui/canvas/tools';
import * as testIds from 'resources/testIds';

const initialState = {
  canvas: {
    selectedTool: DEFAULT_TOOL,
  },
};

it('renders the Toolbar with DEFAULT_TOOL', () => {
  render(<Toolbar />, { initialState });
  expect(screen.getByTestId(testIds.SELECTED_TOOL)).toBeInTheDocument();
});

it('should select the FILL_TOOL when clicked', () => {
  render(<Toolbar />, { initialState });

  const fillButton = screen.getByTestId(FILL_TOOL);
  expect(fillButton).toBeInTheDocument();
  fireEvent.click(fillButton); 

  const selectedFillButton = screen.getByTestId(FILL_TOOL);
  expect(selectedFillButton).toBeInTheDocument();

  const selectedTool = screen.getByTestId(testIds.SELECTED_TOOL);
  expect(selectedTool).toBeInTheDocument();
  expect(selectedTool).toContainElement(selectedFillButton);
});
