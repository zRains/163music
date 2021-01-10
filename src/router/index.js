import { createRouter, createWebHistory } from 'vue-router'
import index from '@/components/home/index.vue'
import recommend from '@/components/home/rec/recommend.vue'
import search from '@/components/home/search/search.vue'
import phb from '@/components/home/phb/phb.vue'

const routes = [
  {
    path: '/',
    component: index,
    children: [
      {
        path: '',
        component: recommend,
      },
      {
        path: 'search',
        component: search,
      },
      {
        path: 'phb',
        component: phb,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
