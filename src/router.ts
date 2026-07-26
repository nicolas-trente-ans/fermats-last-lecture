import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import SectionView from './views/SectionView.vue'
import SummarizerView from './views/SummarizerView.vue'

const base = import.meta.env.BASE_URL

export const router = createRouter({
  history: createWebHistory(base),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/section/:id', name: 'section', component: SectionView, props: true },
    { path: '/summarizer/:worldId?/:levelId?', name: 'summarizer', component: SummarizerView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
