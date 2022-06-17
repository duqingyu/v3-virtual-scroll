import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/Index' },
  { name: 'Index', path: '/Index', component: () => import('@/pages/Index.vue') },
  { name: 'Detail', path: '/Detail', component: () => import('@/pages/Detail.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
