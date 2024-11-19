import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/to-do-list',
      name: 'ToDoList',
      component: () => import('../views/TodoListView.vue'),
    },
    {
      path: '/caculator',
      name: 'Caculator',
      component: () => import('../views/CaculatorView.vue'),
    },
    {
      path: '/json-tool',
      name: 'JsonTool',
      component: () => import('../views/JsonToolView.vue'),
    },
    {
      path: '/image-tool',
      name: 'ImageTool',
      component: () => import('../views/ImageToolView.vue'),
    },
  ],
})

export default router
