import { auth } from "./lib/auth";
import type { ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";

export function setupAuthMiddleware(server: ViteDevServer) {
  server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
    // Handle Better-Auth API routes
    if (req.url?.startsWith("/api/auth")) {
      console.log(`[Better-Auth] Handling request: ${req.method} ${req.url}`);
      try {
        // Convert Node.js req/res to Web API Request/Response
        const protocol = req.headers["x-forwarded-proto"] || "http";
        const host = req.headers.host || "localhost:5173";
        const url = new URL(req.url || "", `${protocol}://${host}`);
        const method = req.method || "GET";
        const headers = new Headers();

        // Copy headers from Node.js request to Web API Headers
        Object.entries(req.headers).forEach(([key, value]) => {
          if (value && key.toLowerCase() !== "host") {
            headers.set(key, Array.isArray(value) ? value.join(", ") : value);
          }
        });

        // Read body if present
        let body: string | undefined;
        if (method !== "GET" && method !== "HEAD") {
          const chunks: Buffer[] = [];
          await new Promise<void>((resolve, reject) => {
            req.on("data", (chunk: Buffer) => {
              chunks.push(chunk);
            });
            req.on("end", () => {
              if (chunks.length > 0) {
                body = Buffer.concat(chunks).toString();
              }
              resolve();
            });
            req.on("error", reject);
          });
        }

        // Create Web API Request
        const request = new Request(url.toString(), {
          method,
          headers,
          body: body || undefined,
        });

        // Call Better-Auth handler
        const response = await auth.handler(request);

        // Convert Web API Response back to Node.js response
        res.statusCode = response.status;
        response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });

        const responseBody = await response.text();
        res.end(responseBody);
        return;
      } catch (error) {
        console.error("[Better-Auth] Handler error:", error);
        if (error instanceof Error) {
          console.error("[Better-Auth] Error stack:", error.stack);
        }
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }));
        return;
      }
    }
    next();
  });
  console.log("[Better-Auth] Middleware registered for /api/auth routes");
}

