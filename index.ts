import { serve } from "bun";
import { readFileSync } from "fs";
import { join } from "path";

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    
    try {
      const filePath = join(process.cwd(), path);
      const file = readFileSync(filePath);
      
      // Set appropriate content type
      const contentType = path.endsWith('.html') ? 'text/html' :
                         path.endsWith('.css') ? 'text/css' :
                         path.endsWith('.js') ? 'application/javascript' :
                         'text/plain';
      
      return new Response(file, {
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response("File not found", { status: 404 });
    }
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log(`📁 Serving files from: ${process.cwd()}`);