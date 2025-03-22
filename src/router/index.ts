import {createRouter, createWebHistory} from 'vue-router'
import PlannerView from "../views/PlannerView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PlannerView
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: () => import('../views/MonitoringView.vue'),
    },
    {
      path: '/builder',
      name: 'builder',
      component: () => import('../views/BuilderView.vue'),
    }
  ]
})

export default router
