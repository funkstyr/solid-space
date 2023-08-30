import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export function createLocalStore(name: string, initState: any) {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore(initState);

  if (localState) setState(JSON.parse(localState));

  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));

  return [state, setState];
}
