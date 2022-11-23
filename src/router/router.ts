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
    name: "root",
    component: () => import("@/views/Home.vue"),
    meta: { keepAlive: true },
  },
  {
    path: "/store/:storeId",
    name: "store",
    component: () => import("@/views/store/Store.vue"),
    meta: { keepAlive: false },
    children: [
      {
        path: "/store/:storeId",
        meta: { keepAlive: true },
        component: () => import("@/views/store/mustRead/MustRead.vue"),
      },
      {
        path: "mustRead",
        meta: { keepAlive: true },
        component: () => import("@/views/store/mustRead/MustRead.vue"),
      },
      {
        path: "news",
        meta: { keepAlive: true },
        component: () => import("@/views/store/news/News.vue"),
      },
      {
        path: "design",
        meta: { keepAlive: true },
        component: () => import("@/views/store/design/Design.vue"),
      },
    ],
  },
  {
    path: "/store/:storeId/news/:newsId",
    name: "newsDetail",
    component: () => import("@/views/store/news/NewsDetail.vue"),
    meta: { keepAlive: true },
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
];

export const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return savedPosition != null ? savedPosition : { top: 0 };
  },
  history: createWebHistory(),
  routes,
});
