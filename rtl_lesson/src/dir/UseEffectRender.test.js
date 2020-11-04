import React from "react";
import { render, screen } from "@testing-library/react";
import UseEffectRender from "./UseEffectRender";
import { add } from "../functions";

describe("useEffect rendering", () => {
  it("sum!!!!!!", () => {
    expect(add(2, 4)).toBe(6);
  });
  it("Should render only after async function resolved", async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am/)).toBeNull();
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
