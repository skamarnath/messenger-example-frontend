import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue")
  },
  {
    path: "/home/:nickname?",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  var isAuthenticated = false;
  if (localStorage.getItem("currentUser")) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  if (to.name == "Login" || to.name == "SignUp") {
    isAuthenticated ? next({ name: "Home" }) : next();
  } else {
    isAuthenticated ? next() : next({ name: "Login" });
  }
});

export default router;
