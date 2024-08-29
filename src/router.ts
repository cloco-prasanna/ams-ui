import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import RegisterView from "./views/RegisterView.vue";
import DashboardView from "./views/DashboardView.vue";
import ArtistView from "./views/ArtistView.vue";
import UserView from "./views/UserView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    {
      path: "/register",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      component: DashboardView,
      children: [
        {
          path: "",
          component: UserView,
        },
        {
          path: "artists",
          component: ArtistView,
        },
      ],
    },
  ],
});
