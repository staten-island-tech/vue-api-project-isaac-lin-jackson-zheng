import { createRouter, createWebHistory } from 'vue-router'
import ActualBar from "../views/Home.vue";
import BarChart from "../views/About.vue";

const routes = [
  { path: "/doughnut", name: "Doughnut", component: BarChart },
  { path: "/bar", name: "Bar", component: ActualBar },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;