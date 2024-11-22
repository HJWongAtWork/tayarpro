/**
 * plugins/index.ts
 *
 * Centralized plugin registration.
 */

import { createPinia } from "pinia";
import { piniaPluginPersist } from "./piniaPluginPersist";
import vuetify from "./vuetify";
import router from "../router";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  // Pinia setup with custom persistence plugin
  const pinia = createPinia();
  pinia.use(piniaPluginPersist);

  app
    .use(pinia) // Register Pinia
    .use(vuetify) // Register Vuetify
    .use(router); // Register Router
}
