import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, isLoggedIn } from '@/composables/auth';

import TheHome from '@/components/home/TheHome.vue';
import TheAuth from '@/components/auth/TheAuth.vue';
import TheDashboard from '@/components/dashboard/TheDashboard.vue';
import TheDashboardChild from '@/components/dashboard/TheDashboardChild.vue';
import TheUserProfile from '@/components/dashboard/pages/TheUserProfile.vue';
import TheArticles from '@/components/dashboard/admin/TheArticles.vue';
import TheArticlesAdd from '@/components/dashboard/admin/TheArticlesAdd.vue';
import TheArticlesEdit from '@/components/dashboard/admin/TheArticlesEdit.vue';
import ThePage404 from '@/components/404/ThePage404.vue';
import TheArticle from '@/components/articles/TheArticle.vue';

const routes = [
  { path: '/', name: 'home', component: TheHome },
  {
    path: '/article/:id',
    name: 'article',
    component: TheArticle
  },
  {
    path: '/auth',
    name: 'auth',
    component: TheAuth,
    beforeEnter: isLoggedIn
  },
  {
    path: '/user/dashboard',
    component: TheDashboard,
    beforeEnter: isAuthenticated,
    children: [
      { path: '', name: 'dashboard', component: TheDashboardChild },
      { path: 'profile', name: 'user-profile', component: TheUserProfile },
      { path: 'articles', name: 'articles', component: TheArticles },
      { path: 'articles/add', name: 'articles-add', component: TheArticlesAdd },
      { path: 'articles/edit/:id', name: 'articles-edit', component: TheArticlesEdit }
    ]
  },
  {
    path: '/:notFound(.*)*',
    name: '404',
    component: ThePage404
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
