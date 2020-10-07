import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from "../views/User";
import Sign from "../views/Sign";
import SignUp from "../views/SignUp";
import Page_404 from "../views/Page_404";
import MyMessage from "../views/MyMessage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/sign_in',
    name: Sign,
    component: Sign
  },
  {
    path: '/sign_up',
    name: SignUp,
    component: SignUp
  },
    {
        path: "*",
        name: Page_404,
        component: Page_404
    },
  {
    path: "/message",
    name: MyMessage,
    component: MyMessage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
