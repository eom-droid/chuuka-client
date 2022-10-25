import { createWebHistory, createRouter } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "root",
    component: () => import("@/views/Home.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/storeList",
    name: "storeList",
    component: () => import("@/views/storeList/StoreList.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/storeList/:storeId",
    name: "eachStore",
    component: () => import("@/views/eachStore/EachStore.vue"),
    meta: { keepAlive: false },
  },
  {
    path: "/location",
    name: "location",
    component: () => import("@/views/location/Location.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/location/search",
    name: "location-search",
    component: () => import("@/views/location/search/LocationSearch.vue"),
    meta: { keepAlive: false },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/Search.vue"),
    meta: { keepAlive: false },
  },
  {
    path: "/explore",
    name: "explore",
    component: () => import("@/views/explore/Explore.vue"),
    meta: { keepAlive: true },
  },
];

export const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return savedPosition != null ? savedPosition : { top: 0 };
  },
  history: createWebHistory(),
  routes,
});
