import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import RegisterView from "./views/RegisterView.vue";
import DashboardView from "./views/DashboardView.vue";
import ArtistView from "./views/ArtistView.vue";
import UserView from "./views/UserView.vue";
import MusicView from "./views/MusicView.vue";
import LayoutView from "./views/LayoutView.vue";
import { useAuth } from "./hooks/useAuth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    {
      path: "/register",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      component: LayoutView,
      children: [
        {
          path: "",
          component: DashboardView,
        },
        {
          path: "users",
          component: UserView,
        },
        {
          path: "artists",

          children: [
            { path: "", component: ArtistView },
            { path: ":id", component: MusicView },
          ],
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { role, isAuthenticated } = useAuth();
  if (isAuthenticated && (to.path == "/" || to.path == "/register")) {
    next("/dashboard");
  } else if (!isAuthenticated && to.path !== "/" && to.path !== "/register") {
    next("/");
  } else {
    next();
  }
});

export default router;
