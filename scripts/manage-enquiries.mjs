import { writeFileSync } from "node:fs";
import { getConfig } from "../server/config.mjs";
import { createStore } from "../server/store.mjs";

process.umask(0o077);
const [command = "list", argument, extra] = process.argv.slice(2);
const store = createStore(getConfig());
try {
  if (command === "list") console.table(store.list());
  else if (command === "export" && argument) {
    writeFileSync(argument, JSON.stringify(store.exportAll(), null, 2), {
      mode: 0o600,
      flag: "wx",
    });
    console.log(
      "Export written with restricted file permissions. Contains personal data: protect and delete when no longer needed.",
    );
  } else if (
    command === "status" &&
    argument &&
    ["new", "reviewing", "closed"].includes(extra)
  )
    console.log(`Updated ${store.setStatus(argument, extra)} record(s).`);
  else if (command === "delete" && argument)
    console.log(`Deleted ${store.remove(argument)} record(s).`);
  else if (command === "purge")
    console.log(`Deleted ${store.purge()} expired record(s).`);
  else {
    console.error(
      "Usage: node scripts/manage-enquiries.mjs list | export <new-file.json> | status <CP-reference> <new|reviewing|closed> | delete <CP-reference> | purge",
    );
    process.exitCode = 1;
  }
} finally {
  store.close();
}
