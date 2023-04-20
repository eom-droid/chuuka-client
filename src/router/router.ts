import { createWebHistory, createRouter } from "vue-router";

export const routes = [
  // {
  //   path: "/:pathMatch(.*)*",
  //   redirect: "/404",
  // },
  // {
  //   path: "/404",
  //   component: () => import("@/views/NotFound.vue"),
  // },
  {
    path: "/",
    redirect: "/map",
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/map_screen.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/list",
    name: "list",
    component: () => import("@/views/list_screen.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/advertisement",
    name: "advertisement",
    component: () => import("@/views/advertisement.vue"),
    meta: { keepAlive: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
