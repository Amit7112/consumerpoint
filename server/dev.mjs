import { createServer as createHttpServer } from "node:http";
import { createServer as createViteServer } from "vite";
import { createApp } from "./app.mjs";

process.umask(0o077);
const { app, close, config } = createApp();
const httpServer = createHttpServer(app);
const vite = await createViteServer({
  server: {
    middlewareMode: true,
    host: "0.0.0.0",
    allowedHosts: true,
    hmr: { server: httpServer },
    fs: {
      deny: [
        ".env",
        ".env.*",
        "*.{crt,pem}",
        "**/.git/**",
        "**/.encryption-key",
        "**/*.sqlite",
        "**/*.sqlite-*",
        `${config.dataDir}/**`,
      ],
    },
  },
  appType: "spa",
});
app.use((req, res, next) => {
  let path;
  try {
    path = decodeURIComponent(req.path);
  } catch {
    return res.status(400).type("text/plain").send("Invalid request path.");
  }
  if (
    /(^|\/)(\.env(?:\.|$)|\.encryption-key(?:\/|$)|[^/]*\.sqlite(?:[-.]|$))/i.test(
      path,
    )
  ) {
    return res.status(404).type("text/plain").send("Not found.");
  }
  next();
});
app.use(vite.middlewares);
const portFlag = process.argv.indexOf("--port");
const port = Number(
  process.env.PORT || (portFlag >= 0 ? process.argv[portFlag + 1] : 5173),
);
httpServer.listen(port, "0.0.0.0", () =>
  console.log(
    `Consumer Point frontend and API ready at http://localhost:${port}`,
  ),
);
async function shutdown() {
  await vite.close();
  httpServer.close(() => {
    close();
    process.exit(0);
  });
}
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
