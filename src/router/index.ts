import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

import ក្រាប from "../views/ក្រាប.vue";
import តារាងកម្រិតទឹកសមុទ្រ from "../views/តារាងកម្រិតទឹកសមុទ្រ.vue";
import តារាងអ្នកប្រើប្រាស់ from "../views/តារាងអ្នកប្រើប្រាស់.vue";
import ផែនទី from "../views/ផែនទី.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: ក្រាប,
  },
  {
    path: encodeURI("/ក្រាប"),
    name: "ក្រាប",
    component: ក្រាប,
  },
  {
    path: encodeURI("/ផែនទី"),
    name: "ផែនទី",
    component: ផែនទី,
  },
  {
    path: encodeURI("/តារាងកម្រិតទឹកសមុទ្រ"),
    name: "តារាងកម្រិតទឹកសមុទ្រ",
    component: តារាងកម្រិតទឹកសមុទ្រ,
  },
  {
    path: encodeURI("/តារាងអ្នកប្រើប្រាស់"),
    name: "តារាងអ្នកប្រើប្រាស់",
    component: តារាងអ្នកប្រើប្រាស់,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
