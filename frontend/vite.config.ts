import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/insert-event": "http://localhost:3000",
      "/list-events": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
