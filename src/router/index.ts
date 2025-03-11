import {createRouter, createWebHistory} from 'vue-router'
import TerminalView from "../views/TerminalView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TerminalView
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/PlannerView.vue'),
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
