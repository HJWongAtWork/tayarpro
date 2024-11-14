// plugins/chat.ts
import { App } from "vue";
import ChatWidget from "@/components/ChatWidget.vue";

export const chatPlugin = {
  install: (app: App) => {
    // Register the ChatWidget component globally
    app.component("ChatWidget", ChatWidget);
  },
};
