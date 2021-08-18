import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import(/* webpackChunkName: "articles" */ '../views/articles/Articles.vue')
  },
  {
    path: '/article/create',
    name: 'Article create',
    component: () => import(/* webpackChunkName: "article create" */ '../views/articles/ArticleCreate.vue')
  },
  {
    path: '/article/edit/:id',
    name: 'Article edit',
    component: () => import(/* webpackChunkName: "article edit" */ '../views/articles/ArticleEdit.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/categories/Categories.vue')
  },
  {
    path: '/category/create',
    name: 'Category create',
    component: () => import(/* webpackChunkName: "categories" */ '../views/categories/CategoryCreate.vue')
  },
  {
    path: '/category/edit/:id',
    name: 'Category edit',
    component: () => import(/* webpackChunkName: "categories" */ '../views/categories/CategoryEdit.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/users/Users.vue')
  },
  {
    path: '/user/create',
    name: 'User create',
    component: () => import(/* webpackChunkName: "users" */ '../views/users/UserCreate.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
