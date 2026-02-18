import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Ensure /sitemap.xml is served with Content-Type: application/xml so Google Search Console accepts it
    {
      name: "sitemap-xml-headers",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/sitemap.xml") {
            res.setHeader("Content-Type", "application/xml");
          }
          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
