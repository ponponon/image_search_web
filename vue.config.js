const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // target: "http://192.168.38.191:6200/", // 代理目标的主机地址
        // target: "http://192.168.31.245:6200/", // 代理目标的主机地址
        target: "http://127.0.0.1:6200/", // 代理目标的主机地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 去掉 /api 前缀
        },
      },
    },
  },
});
