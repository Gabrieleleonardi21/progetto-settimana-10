import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Su GitHub Pages il sito vive in una sottocartella col nome del repository,
  // non alla radice del dominio: senza questo, gli asset darebbero 404.
  base: "/progetto-settimana-10/",
});
