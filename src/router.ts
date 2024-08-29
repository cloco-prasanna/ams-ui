import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import RegisterView from "./views/RegisterView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    {
      path: "/register",
      component: RegisterView,
    },
  ],
});
