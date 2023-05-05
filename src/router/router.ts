import { createWebHistory, createRouter } from "vue-router";

export const routes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/",
    redirect: "/home/map",
  },
  {
    path: "/home",
    redirect: "/home/map",
  },
  {
    path: "/home/map",
    name: "/home/map",
    component: () => import("@/views/map_screen.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/home/list",
    name: "/home/list",
    component: () => import("@/views/list_screen.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/advertisement",
    name: "advertisement",
    component: () => import("@/views/advertisement_screen.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/magazine",
    name: "magazine",
    component: () => import("@/views/magazine_screen.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/magazine/:articleId",
    name: "article",
    component: () => import("@/views/magazine/article_screen.vue"),
    meta: { keepAlive: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
