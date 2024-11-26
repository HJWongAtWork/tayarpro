import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router/auto";
// import { setupLayouts } from "virtual:generated-layouts";  // Not necessary anymore
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

// Define custom routes
const customRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login.vue"), // Lazy load signin page
    meta: { layoutComponent: NoHeaderLayout }, // Specify Admin layout for login
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/register.vue"), // Lazy load register page
    meta: { layoutComponent: NoHeaderLayout },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("@/pages/checkout.vue"), // Lazy load register page
    meta: { layoutComponent: NoHeaderLayout },
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("@/pages/signin.vue"), // Lazy load register page
    meta: { layoutComponent: NoHeaderLayout },
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: () => import("@/pages/admin-dashboard.vue"), // Lazy load register page
    meta: { layoutComponent: AdminLayout }, // Specify Admin layout for register
  },
  {
    path: '/:description',
    name: 'description', // This is the name you should use
    component: () => import('@/pages/[description].vue')
  }
];

// Include the rest of the routes with the default layout
const defaultLayoutRoutes: RouteRecordRaw[] = autoRoutes.map((route) => ({
  ...route,
  meta: { ...route.meta, layoutComponent: DefaultLayout }, // Default layout for other routes
}));

// Combine all routes
const routes: RouteRecordRaw[] = [...defaultLayoutRoutes, ...customRoutes];

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

// Global navigation guard to apply layouts dynamically
router.beforeEach(async (to, from, next) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const layout = to.meta.layoutComponent; // Look for layoutComponent directly

  // Dynamically set the layout component in the route's metadata
  if (layout) {
    to.meta.layoutComponent = layout;
  } else {
    to.meta.layoutComponent = DefaultLayout; // Fallback to DefaultLayout if no layout is specified
  }

  if(from.path !== '/cart' && to.path === '/checkout') {
    return next('/cart');
  }

  // Middleware (for clients)
  if (
    to.path === "/cart" ||
    to.path === "/checkout" ||
    to.path === "/appointments" ||
    to.path === "/your-profile" ||
    to.path === "/signin"
  ) {
    const loginTest = await login_test(`${baseUrl}/get_cart`);
    if (!loginTest) {
      return next("/login");
    }
  }

  // Middleware (for admin)
  if (to.path === "/admin-dashboard") {
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

// Workaround for dynamic import errors
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

// Ensure to remove reload flag after router is ready
router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
