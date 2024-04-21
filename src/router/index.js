import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../App.vue'

import GameDetails from '../GameDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/game-details/:gameId',
      name: 'game-details',
      component: GameDetails,
    }
  ]
});

export default router;
