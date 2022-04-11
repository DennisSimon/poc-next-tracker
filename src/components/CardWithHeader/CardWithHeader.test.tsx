import React from "react";
import { render, screen } from "@testing-library/react";
import { CardWithHeader } from "./CardWithHeader";

describe("CardWithHeader component", () => {
  test("should render without crashing", () => {
    render(<CardWithHeader header="test" content="test" />);
  });

  test("should render header with default styles if a string is passed", () => {
    render(<CardWithHeader header="testHeader" content="testContent" />);
    const item = screen.getByText("testHeader");
    expect(item).toHaveClass("MuiTypography-body2");
  });

  test("should render content with default styles if a string is passed", () => {
    render(<CardWithHeader header="testHeader" content="testContent" />);
    const item = screen.getByText("testContent");
    expect(item).toHaveClass("MuiTypography-h1");
  });

  test("should render a react component if passed as header", () => {
    render(
      <CardWithHeader
        header={<h2 data-testid="header-test">test</h2>}
        content="testContent"
      />
    );
    const item = screen.getByTestId("header-test");
    expect(item).toBeInTheDocument();
  });

  test("should render a react component if passed as content", () => {
    render(
      <CardWithHeader
        header="testHeader"
        content={<h2 data-testid="header-test">test</h2>}
      />
    );
    const item = screen.getByTestId("header-test");
    expect(item).toBeInTheDocument();
  });

  test("should render skeleton if loading prop is true", () => {
    render(<CardWithHeader header="testHeader" loading />);
    const item = screen.getByTestId("skeleton");
    expect(item).toBeInTheDocument();
  });
});
