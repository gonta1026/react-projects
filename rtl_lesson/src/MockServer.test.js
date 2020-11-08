import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockServer from "./MockServer";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("Mocking API", () => {
  it("[Fetch success] Shold display fetched data correctly and button disable", async () => {
    render(<MockServer />);
    expect(screen.queryByRole("heading")).toBeNull();
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
    expect(screen.queryByRole("heading")).toBeTruthy();
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  it("[Fetch failure]", async () => {
    /* 失敗した時ようにAPIの状態を書き換える */
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed !"
    );
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});
