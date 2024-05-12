import { createServer } from "vite";
import react from "@vitejs/plugin-react";

export async function dev() {
  const server = await createServer({
    plugins: [react()],
  });

  await server.listen();
  server.printUrls();
}
