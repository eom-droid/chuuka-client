import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProduction = mode === "production";

  return defineConfig({
    plugins: [
      vue(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        workbox: {
          navigateFallbackDenylist: [
            /^(\/robots\.txt|\/sitemap\.xml|\/naver9f40a6f0092181f2a9d348ea37f8cb1e\.html)$/,
          ],
        },
      }),
    ],
    build: { outDir: isProduction ? "dist" : `dist-${mode}` },
    resolve: {
      alias: {
        // @ts-ignore
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
