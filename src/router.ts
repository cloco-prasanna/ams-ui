import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import RegisterView from "./views/RegisterView.vue";
import DashboardView from "./views/dashboard/DashboardView.vue";
import ArtistView from "./views/dashboard/ArtistView.vue";
import UserView from "./views/dashboard/UserView.vue";
import MusicView from "./views/dashboard/MusicView.vue";
import LayoutView from "./views/LayoutView.vue";
import { useAuth } from "./hooks/useAuth";
import SettingsView from "./views/dashboard/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    {
      path: "/artists",
      children: [
        { path: "", component: ArtistView },
        { path: ":id", component: MusicView },
      ],
    },
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
        {
          path: "settings",
          component: SettingsView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated && (to.path == "/" || to.path == "/register")) {
    next("/dashboard");
  } else if (!isAuthenticated && to.path.includes("dashboard")) {
    next("/");
  } else {
    next();
  }
});

export default router;
