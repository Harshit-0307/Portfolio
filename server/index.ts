import express, {
  type Request,
  Response,
  NextFunction,
  type Express,
} from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer, type Server } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// create an app instance for use in serverless environments (Vercel)
export async function createApp(): Promise<Express> {
  // ensure routes and error handler are only registered once
  if ((app as any).__routesRegistered) return app;
  (app as any).__routesRegistered = true;

  await registerRoutes(app);

  // error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  return app;
}

export async function setupAndStartServer(portOverride?: number) {
  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  function waitForListen(
    httpServer: Server,
    opts: { port: number; host?: string; reusePort?: boolean }
  ) {
    return new Promise<void>((resolve, reject) => {
      const onError = (err: any) => {
        httpServer.removeListener("listening", onListening);
        reject(err);
      };
      const onListening = () => {
        httpServer.removeListener("error", onError);
        resolve();
      };

      httpServer.once("error", onError);
      httpServer.once("listening", onListening);
      httpServer.listen(opts as any);
    });
  }

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || String(portOverride || "5000"), 10);

  // Try starting on the requested port; if it's already in use, increment and
  // retry up to a small range so the dev server can start even when port 5000
  // is occupied (e.g., by system services on macOS).
  async function startListening(initialPort: number, host = "0.0.0.0") {
    let currentPort = initialPort;
    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        // Try with reusePort first; if not supported, retry without it.
        try {
          await waitForListen(httpServer, {
            port: currentPort,
            host,
            reusePort: true,
          });
        } catch (err: any) {
          if (err && err.code === "ENOTSUP") {
            log(
              "reusePort not supported on this platform; retrying without reusePort"
            );
            await waitForListen(httpServer, { port: currentPort, host });
          } else {
            throw err;
          }
        }

        log(`serving on port ${currentPort}`);
        return currentPort;
      } catch (err: any) {
        if (err && err.code === "EADDRINUSE") {
          log(`port ${currentPort} already in use, trying ${currentPort + 1}`);
          currentPort++;
          continue;
        }
        throw err;
      }
    }

    throw new Error(
      `Could not find free port in range ${initialPort}-${initialPort + 9}`
    );
  }

  const usedPort = await startListening(port);
  return { app, httpServer, port: usedPort };
}

// start automatically when run directly
if (
  process.argv[1] &&
  (process.argv[1].endsWith("server/index.ts") ||
    process.argv[1].endsWith("dist/index.cjs"))
) {
  setupAndStartServer().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
