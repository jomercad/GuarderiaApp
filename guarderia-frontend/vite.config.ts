import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Añadir esto si es necesario:
  define: {
    "process.env": {},
  },
});
