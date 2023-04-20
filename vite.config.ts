import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProduction = mode === "production";

  return defineConfig({
    plugins: [vue()],
    build: { outDir: isProduction ? "dist" : `dist-${mode}` },
    resolve: {
      alias: {
        // @ts-ignore
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
