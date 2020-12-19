import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "../Button";

it("should render Button and react to click events", () => {
  const fn = jest.fn();
  render(<Button text="text" onClick={fn} />);

  fireEvent.click(screen.getByText('text'));

  expect(fn).toHaveBeenCalledTimes(1);
});
