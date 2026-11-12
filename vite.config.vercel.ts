// Configuração de build para o Vercel (alternativa ao vite.config.ts, voltado ao Cloudflare/Sites).
import vinext from "vinext";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [vinext(), nitro()],
});
