import { createRouter, createWebHistory } from 'vue-router';
import index from '@/view/index.vue';
import login from '@/view/user-service/login.vue';
import register from '@/view/user-service/register.vue';
import problem from '@/view/problem/problem-index.vue';
import train from '@/view/train/train-index.vue';
import community from '@/view/community/community-index.vue';
import about from '@/view/about/about-index.vue';
import pk from '@/view/pk/pk-index.vue';
import home from '@/view/home/home-index.vue';

import error_401 from '@/view/error/401.vue';
import error_404 from '@/view/error/404.vue';

const routes = [
  {
    path: '/',
    redirect: '/index/home'
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: '',
        redirect: '/index/home'
      },       
      {
        path: 'home',
        name: 'home',
        component: home,
      },      
      {
        path: 'problem',
        name: 'problem',
        component: problem,
      },
      {
        path: 'train',
        name: 'train',
        component: train,
      },
      {
        path: 'community',
        name: 'community',
        component: community,
      },
      {
        path: 'pk',
        name: 'pk',
        component: pk,
      },
      {
        path: 'about',
        name: 'about',
        component: about,
      },
    ],
  }, 
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/401',
    name: '401',
    component: error_401
  },
  {
    path: '/404',
    name: '404',
    component: error_404
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
