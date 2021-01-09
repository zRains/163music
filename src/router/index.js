import { createRouter, createWebHistory } from 'vue-router'
import app from '@/App.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: import('@/components/home/index.vue'),
    children: [
      {
        path: '',
        component: import('@/components/home/rec/recommend.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
