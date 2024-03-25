import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BarGraph from '@/views/BarGraph.vue'
import DonutChart from '@/views/DonutChart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bar',
      component: BarGraph
    },
    {
      path: '/doughnut',
      name: 'doughnut',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DonutChart
    }
  ]
})

export default router
