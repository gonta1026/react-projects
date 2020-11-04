import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import FrameworkList from "./FrameworkList";

//unmountさせて副作用の削除

afterEach(() => cleanup());

describe("Rendering the list with props", () => {
  it("should render No data! when data propped ", () => {
    render(<FrameworkList />);
    expect(screen.getByText("No Data!!"));
  });

  it("should render item list correctly", () => {
    const dummyData = [
      { id: 1, item: "React dummy" },
      { id: 2, item: "Angular dummy" },
      { id: 3, item: "Vue dummy" },
    ];
    render(<FrameworkList frameworks={dummyData} />);
    const frameworkItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);
    const dummyItems = dummyData.map((ele) => ele.item);
    expect(frameworkItems).toEqual(dummyItems);
    expect(screen.queryByText("No Data!!")).toBeNull();
  });
});
