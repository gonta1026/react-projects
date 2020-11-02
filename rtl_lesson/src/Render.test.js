import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
  it("should render all elements correctly", () => {
    render(<Render />);
    // screen.debug();
    // screen.debug(screen.getByRole("h1"));
    expect(screen.getByRole("heading")).toBeTruthy();
  });
});
