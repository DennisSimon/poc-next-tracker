import React from "react";
import { render } from "@testing-library/react";
import { Hamburger } from "./Hamburger";

describe("Hamburger component", () => {
  test("should render without crashing", () => {
    render(<Hamburger isOpen={false} />);
  });
});
