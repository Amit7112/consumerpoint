import { createApp } from "../server/app.mjs";
import { getConfig } from "../server/config.mjs";

let handlerApp = null;

export default function handler(req, res) {
  if (!handlerApp) {
    const config = getConfig();
    const { app } = createApp({ config });
    handlerApp = app;
  }
  return handlerApp(req, res);
}

