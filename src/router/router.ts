import { createWebHistory, createRouter } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "root",
    component: () => import("@/views/Home.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/location",
    name: "location",
    component: () => import("@/views/location/Location.vue"),
    meta: { keepAlive: false },
  },
  {
    path: "/location/search",
    name: "location-search",
    component: () => import("@/views/location/search/LocationSearch.vue"),
    meta: { keepAlive: false },
  },
  {
    path: "/store/:storeId",
    name: "store",
    component: () => import("@/views/eachStore/EachStore.vue"),
    meta: { keepAlive: false },
  },
];

export const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return savedPosition != null ? savedPosition : { top: 0 };
  },
  history: createWebHistory(),
  routes,
});
