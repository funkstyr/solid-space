import { createRoot, createEffect } from "solid-js";
import { describe, expect, it, beforeEach } from "vitest";

import { createLocalStore } from "./createLocalStore";

describe("createLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  const initialState = {
    todos: [],
    newTitle: "",
  };

  it.skip("reads pre-existing state from localStorage", () => {
    // TODO: this test makes the others fail, even when using a different state key
    createRoot((dispose) => {
      const savedState = {
        // todos: [{ title: "Learn Solid" }],
        newTitle: "Learn Solid",
      };

      const stateKey = "testState";

      localStorage.setItem(stateKey, JSON.stringify(savedState));
      const [state] = createLocalStore(stateKey, initialState);

      expect(state).toEqual(savedState);
      dispose();
    });
  });

  it("stores new state to localStorage", () => {
    createRoot((dispose) => {
      const [state, setState] = createLocalStore("state", initialState);
      setState("newTitle", "updated");

      return new Promise((resolve) =>
        createEffect(() => {
          expect(JSON.parse(localStorage.getItem("state") || "")).toEqual({
            todos: [],
            newTitle: "updated",
          });
          dispose();
          resolve(1);
        }),
      );
    });
  });

  it("updates state multiple times", async () => {
    const { dispose, setState } = createRoot((dispose) => {
      const [state, setState] = createLocalStore("state", initialState);
      return { dispose, setState };
    });

    setState("newTitle", "first");
    // wait a tick to resolve all effects
    await new Promise((done) => setTimeout(done, 0));

    expect(JSON.parse(localStorage.getItem("state") || "")).toEqual({
      todos: [],
      newTitle: "first",
    });

    setState("newTitle", "second");
    // wait a tick to resolve all effects
    await new Promise((done) => setTimeout(done, 0));

    expect(JSON.parse(localStorage.getItem("state") || "")).toEqual({
      todos: [],
      newTitle: "second",
    });
    dispose();
  });
});
