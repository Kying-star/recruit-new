import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'loading',
    component: () => import('@views/loading'),
    children: [
      {
        path: '',
        name: 'loading_before',
        component: () => import('@components/loading_before'),
      },
      {
        path: '/prelude',
        name: 'prelude',
        component: () => import('@components/prelude'),
      },
    ],
  },
  {
    path: '',
    name: 'loading_before',
    component: () => import('@components/loading_before'),
  },
  {
    path: '/prelude',
    name: 'prelude',
    component: () => import('@components/prelude'),
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: () => import('@views/introduce'),
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('@views/select'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
