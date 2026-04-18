import { createStore } from "../../../shared/state/create-store.js";

export const quickRequestStore = createStore({
  quickName: "",
  quickPhone: "",
});

export function updateQuickRequestField(field, value) {
  quickRequestStore.setState((state) => ({
    ...state,
    [field]: value,
  }));
}
