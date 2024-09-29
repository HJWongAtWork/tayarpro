/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.directive( 'click-to-expand', {
    mounted(el, binding) {
      const cardData = binding.value.cardData; // Get the card data from the binding

      el.addEventListener("click", () => {
        cardData.showAdditionalText = !cardData.showAdditionalText;
        cardData.elevation = cardData.showAdditionalText ? 8 : 2;
      });

      document.addEventListener("click", (event) => {
        if (!el.contains(event.target)) {
          cardData.showAdditionalText = false;
          cardData.elevation = 2;
        }
      });
    },
})

registerPlugins(app)

app.mount('#app')
