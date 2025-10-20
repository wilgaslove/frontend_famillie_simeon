import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

app.use(router)
app.mount('#app')

const updateSW = registerSW({
  onNeedRefresh() {
    const confirmed = confirm("Une nouvelle version est disponible. Recharger ?")
    if (confirmed) {
      updateSW(true) // ⚡ ici on force la mise à jour
    }
  },
  onOfflineReady() {
    console.log("L'application est prête à fonctionner hors ligne 🚀")
  },
})
