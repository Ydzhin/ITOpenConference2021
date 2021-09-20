import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import All from "../views/All.vue";
import Favourites from "../views/Favourites.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: All,
  },
  {
    path: "/favourites",
    component: Favourites,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
