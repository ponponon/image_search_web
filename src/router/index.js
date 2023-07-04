import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import MetaList from "@/components/meta/MetaList.vue";
import MetaCreate from "@/components/meta/MetaCreate.vue";
import Demo from "@/components/Demo.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
  },

  {
    path: "/meta_list",
    name: "MetaList",
    component: MetaList,
  },
  {
    path: "/meta_create",
    name: "MetaCreate",
    component: MetaCreate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
