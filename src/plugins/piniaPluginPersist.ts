// plugins/piniaPluginPersist.ts
import { PiniaPluginContext } from "pinia";

export const piniaPluginPersist = ({ store }: PiniaPluginContext) => {
  // Restore state from localStorage when store is initialized
  const savedState = localStorage.getItem(`${store.$id}-state`);
  if (savedState) {
    store.$patch(JSON.parse(savedState));
  }

  // Save state to localStorage whenever it changes
  store.$subscribe((mutation, state) => {
    localStorage.setItem(`${store.$id}-state`, JSON.stringify(state));
  });
};
