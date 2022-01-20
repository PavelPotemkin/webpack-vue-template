import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/vue/pages/IndexPage.vue') },
  { path: '/about', component: () => import('@/vue/pages/AboutPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
