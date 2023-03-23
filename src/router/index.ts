import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import MainWarpper from "../layout/main-wrapper/index.vue";
import BlankWarpper from "../layout/blank/index.vue";

export const appRouter: Array<RouteRecordRaw> = [
    {
        path: "/home",
        name: "home",
        meta: {
            icon: "user-outlined",
            title: "首页"
        },
        component: () => import("../views/home/index.vue")
    }
];
const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login/index.vue")
    },
    {
        path: "/",
        name: "home",
        component: BlankWarpper,
        meta: {
            title: "首页"
        },
        redirect: "/home",
        children: appRouter
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
