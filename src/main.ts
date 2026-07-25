import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/main.css'

console.log(
  "%cFermat's Last Lecture%c — welcome. If you see this, the current JS bundle loaded.",
  'font-weight:700;color:#d4a017',
  'font-weight:400;color:inherit',
)

createApp(App).use(router).mount('#app')
