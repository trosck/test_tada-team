import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

import middlewareIsLogin from "./middleware/isLogin"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ( ) => import("@/views/Home"),
    meta: {
      middleware: [
        middlewareIsLogin,
      ],
    }
  },
  {
    path: "/login",
    name: "login",
    component: ( ) => import(/* webpackChunkName: "login" */ "@/views/Login"),
  },
  {
    path: "*",
    redirect: "/",
  },
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  const { middleware } = to.meta
  if (middleware) {
    return middleware.forEach(mv => mv({
      to,
      from,
      next,
      store,
    }))
  }
  return next()
})

export default router
