// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/auth/login.vue";
import Users from "@/pages/users.vue"; // Example protected route
import { getToken } from "@/services/apiService";

const routes = [
  { path: "/", redirect: { name: "Login" } },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAuth: true }, // Protected route
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!getToken()) {
      next({ name: "Login" }); // Redirect to login if not authenticated
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
