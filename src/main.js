import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import JsonViewer from "vue-json-viewer";
import TopBar from "@/components/common/TopBar.vue";

const app = createApp(App).use(router).use(Antd).use(JsonViewer);

app.component("top-bar", TopBar);

app.mount("#app");
