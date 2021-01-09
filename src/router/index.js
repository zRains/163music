import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    // components: { view1: import('@/components/home/index.vue') },
    // children: [
    //   {
    //     path: '',
    //     components: { view2: import('@/components/home/rec/recommend.vue') },
    //   },
    // ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
