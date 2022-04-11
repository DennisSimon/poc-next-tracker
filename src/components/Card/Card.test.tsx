import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card component", () => {
  test("should render without crashing", () => {
    render(<Card />);
  });

  test("should render children in card", () => {
    render(
      <Card>
        <h1>This is a test</h1>
      </Card>
    );
    const item = screen.getByText("This is a test");
    expect(item).toBeInTheDocument();
  });

  test("should be able to overwrite default styles", () => {
    render(<Card sx={{ backgroundColor: "#FFF" }} data-testid="card-test" />);
    const elem = screen.getByTestId("card-test");

    expect(elem).toHaveStyle("background-color: #FFF");
  });
});
