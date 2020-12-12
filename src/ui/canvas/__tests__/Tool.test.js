import React from 'react';
import { render, fireEvent, screen } from 'utils/test/testRender';
import Tool from '../Tool';
import * as testIds from 'resources/testIds';

const initialState = {
  canvas: {
    selectedTool: '',
  },
};

it('renders Tool without crashing', () => {
  render(<Tool iconPath='test' tool='test' />, { initialState });
});

it('should select the tool when clicked', () => {
  render(<Tool iconPath='test' tool='test' />, { initialState });

  const button = screen.getByTestId('test');
  expect(button).toBeInTheDocument();
  fireEvent.click(button); 

  const selectedButton = screen.getByTestId('test');
  expect(selectedButton).toBeInTheDocument();

  const selectedTool = screen.getByTestId(testIds.SELECTED_TOOL);
  expect(selectedTool).toBeInTheDocument();
  expect(selectedTool).toContainElement(selectedButton);
});
