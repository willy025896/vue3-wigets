import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

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
    {
      path: '/string-filter',
      name: 'StringFilter',
      component: () => import('../views/StringFilter.vue'),
    },
    {
      path: '/string-seperator',
      name: 'StringSeperator',
      component: () => import('../views/StringSeperator.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'), // 自訂的 404 頁面
    },
  ],
});

export default router;
