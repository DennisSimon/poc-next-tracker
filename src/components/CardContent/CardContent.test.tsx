import React from "react";
import { render, screen } from "@testing-library/react";
import { CardContent } from "./CardContent";

describe("CardContent component", () => {
  test("should render without crashing", () => {
    render(<CardContent />);
  });

  test("should render children in card", () => {
    render(
      <CardContent>
        <h1>This is a test</h1>
      </CardContent>
    );
    const item = screen.getByText("This is a test");
    expect(item).toBeInTheDocument();
  });

  test("should be able to overwrite default styles", () => {
    render(
      <CardContent sx={{ paddingTop: "2em" }} data-testid="card-content-test" />
    );
    const elem = screen.getByTestId("card-content-test");

    expect(elem).toHaveStyle("padding-top: 2em");
  });
});
