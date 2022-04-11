import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button component", () => {
  test("should render without crashing", () => {
    render(<Button />);
  });

  test("should render children", () => {
    render(<Button>TestButtonLabel</Button>);
    const item = screen.getByText("TestButtonLabel");

    expect(item).toBeInTheDocument();
  });
});
