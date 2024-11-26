/**
 * plugins/index.ts
 *
 * Centralized plugin registration.
 */

import { createPinia } from "pinia";
import { piniaPluginPersist } from "./piniaPluginPersist";
import vuetify from "./vuetify";
import router from "../router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,        // For Pie/Doughnut charts
  RadialLinearScale, // For Radar charts
  Title,
  Tooltip,
  Legend,
  Filler            // For area charts
} from 'chart.js'

// Types
import type { App } from "vue";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function registerPlugins(app: App) {
  // Pinia setup with custom persistence plugin
  const pinia = createPinia();
  pinia.use(piniaPluginPersist);

  app
    .use(pinia) // Register Pinia
    .use(vuetify) // Register Vuetify
    .use(router); // Register Router
}