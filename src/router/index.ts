import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { routes as autoRoutes } from "vue-router/auto-routes";
import axios from "axios";

// Import your layouts
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import NoHeaderLayout from "@/layouts/NoHeaderLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

import { setupLayouts } from "virtual:generated-layouts";

// Login tester
const login_test = async (link: string) => {
  try {
    const response = await axios.post(link, "", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Define custom routes with proper typing
const customRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login.vue"),
    meta: { layout: "no-header" },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/register.vue"),
    meta: { layout: "no-header" },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("@/pages/checkout.vue"),
    meta: { layout: "no-header" },
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("@/pages/signin.vue"),
    meta: { layout: "no-header" },
  },
  {
    path: "/dashboard",
    name: "AdminDashboard",
    component: () => import("@/pages/dashboard.vue"),
    meta: { layout: "admin" },
  },
  {
    path: '/:description',
    name: 'description',
    component: () => import('@/pages/[description].vue')
  }
] as RouteRecordRaw[];

// Include the rest of the routes with the default layout
const defaultLayoutRoutes = autoRoutes.map((route) => ({
  ...route,
  meta: { ...route.meta, layout: "default" },
})) as RouteRecordRaw[];

// Combine all routes
const routes = [...defaultLayoutRoutes, ...customRoutes];

// Create the router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([
    ...routes,
    {
      path: "/products/:description",
      name: "products-description",
      component: () => import("../pages/[description].vue"),
      props: true,
    },
    {
      path: "/services/:description",
      name: "services-description",
      component: () => import("../pages/[service].vue"),
      props: true,
    },
  ]),
});

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle layout
  if (!to.meta.layout) {
    to.meta.layout = "default";
  }

  if(from.path !== '/cart' && to.path === '/checkout') {
    return next('/cart');
  }

  // Middleware (for clients)
  if (
    ["/cart", "/checkout", "/appointments", "/your-profile", "/signin"].includes(to.path)
  ) {
    const loginTest = await login_test(`${baseUrl}/get_cart`);
    if (!loginTest) {
      return next("/login");
    }
  }

  // Middleware (for admin)
  if (to.path === "/dashboard") {
    const loginTest = await login_test(`${baseUrl}/all_users`);
    if (!loginTest) {
      return next("/login");
    }
  }

  if (
    to.path === "/login" ||
    to.path === "/register" ||
    to.path === "/checkout" ||
    to.path === "/signin" ||
    to.path === "/dashboard"
  ) {
    to.meta.layoutComponent = NoHeaderLayout;
  }
  if (to.path === "/admin-dashboard") {
    to.meta.layoutComponent = AdminLayout;
  }

  next();
});

// Error handling
router.onError((err, to) => {
  if (err.message?.includes("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      window.location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

// Clean up reload flag
router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
