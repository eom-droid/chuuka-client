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
    children: [
      {
        path: "/store/:storeId",
        component: () => import("@/views/store/mustRead/MustRead.vue"),
      },
      {
        path: "mustRead",
        component: () => import("@/views/store/mustRead/MustRead.vue"),
      },
      {
        path: "news",

        component: () => import("@/views/store/news/News.vue"),
      },
      {
        path: "design",
        component: () => import("@/views/store/design/Design.vue"),
      },
    ],
  },
  {
    path: "/store/:storeId/news/:newsId",
    name: "newsDetail",
    component: () => import("@/views/store/news/NewsDetail.vue"),
  },
  {
    path: "/location",
    name: "location",
    component: () => import("@/views/location/Location.vue"),
    meta: { keepAlive: true },
    children: [
      {
        path: "/location",
        // component: () => import("@/views/location/setting/LocationSetting.vue"),
        // meta: { transition: "slide-left" },
        redirect: "/location/setting",
        meta: { transition: "slide-left" },
      },
      {
        path: "setting",
        component: () => import("@/views/location/setting/LocationSetting.vue"),
        meta: { transition: "slide-left" },
      },
      {
        path: "search",
        component: () => import("@/views/location/search/LocationSearch.vue"),
        meta: { transition: "slide-right" },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
