import { createRouter, createWebHistory } from 'vue-router'
import BarGraph from '@/views/BarGraph.vue'
import PieChart from '@/views/PieChart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bar',
      component: BarGraph
    },
    {
      path: '/pie',
      name: 'pie',
      component: PieChart
    }
  ]
})

export default router