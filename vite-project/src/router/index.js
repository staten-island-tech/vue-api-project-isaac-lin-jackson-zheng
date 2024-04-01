import { createRouter, createWebHistory } from 'vue-router'
import BarGraph from '@/views/BarGraph.vue'
import PieChart from '@/views/PieChart.vue'
import Games from '@/views/games.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bar',
      component: BarGraph
    },
    {
      path: '/game',
      name: 'game',
      component: Games
    },
    {
      path: '/pie',
      name: 'pie',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PieChart
    }
  ]
})

export default router
