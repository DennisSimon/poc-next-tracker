
import React from "react";
import { render } from "@testing-library/react";
import { Navigation } from "./Navigation";

describe("Navigation component", () => {
  test("should render without crashing", () => {
    render(<Navigation />);
  });
});
