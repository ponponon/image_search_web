import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import JsonViewer from "vue-json-viewer";
import TopBar from "@/components/common/TopBar.vue";
import Vue from "vue";

const app = createApp(App).use(router).use(Antd).use(JsonViewer);

// // 关闭全局异常处理
// app.config.errorHandler = (err, vm, info) => {
//   // 这里不执行任何操作
// };

app.component("top-bar", TopBar);

app.mount("#app");
