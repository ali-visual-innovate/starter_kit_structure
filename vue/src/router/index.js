import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import permissionsRoutes from "./permissions.routes";
import rolesRoutes from "./roles.routes";
import usersRoutes from "./users.routes";


const routes = [
  {
    path: "/",
    component: Home,
    name: 'Home',
    children: [
      ...Object.values(permissionsRoutes),
      ...Object.values(rolesRoutes),
      ...Object.values(usersRoutes),
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../components/ForgotPassword.vue"),
  },
  {
    path: "/password-reset/:token",
    name: "ResetPassword",
    component: () => import("../components/ResetPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
