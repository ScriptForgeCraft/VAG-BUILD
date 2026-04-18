function cloneState(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

export function createStore(initialState) {
  let state = cloneState(initialState);
  const listeners = new Set();

  function notify() {
    listeners.forEach((listener) => listener(state));
  }

  return {
    getState() {
      return state;
    },
    setState(nextStateOrUpdater) {
      state =
        typeof nextStateOrUpdater === "function" ? nextStateOrUpdater(state) : { ...state, ...nextStateOrUpdater };
      notify();
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    reset() {
      state = cloneState(initialState);
      notify();
      return state;
    },
  };
}
