import React from 'react';
import { render, fireEvent, screen } from 'utils/test';
import Toolbar from '../Toolbar';
import {
  DEFAULT_TOOL,
  FILL_TOOL,
} from 'ui/toolbar/tools';

const initialState = {
  canvas: {
    selectedTool: DEFAULT_TOOL,
  },
};

it('renders the Toolbar with DEFAULT_TOOL', () => {
  render(<Toolbar />, { initialState });
  expect(screen.getByTestId('selected-tool')).toBeInTheDocument();
});

it('should select the FILL_TOOL when clicked', () => {
  render(<Toolbar />, { initialState });

  const fillButton = screen.getByTestId(FILL_TOOL);
  expect(fillButton).toBeInTheDocument();
  fireEvent.click(fillButton); 

  const selectedFillButton = screen.getByTestId(FILL_TOOL);
  expect(selectedFillButton).toBeInTheDocument();

  const selectedTool = screen.getByTestId('selected-tool');
  expect(selectedTool).toBeInTheDocument();
  expect(selectedTool).toContainElement(selectedFillButton);
});
