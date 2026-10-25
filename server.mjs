import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Pre-built Workflow Builder UI committed to the repo.
// To refresh it: run `pnpm build:demo` locally and copy the output into deploy/workflowbuilder/.
const distPath = path.join(__dirname, "deploy", "workflowbuilder");
const indexPath = path.join(distPath, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error(`Built UI not found: ${indexPath}`);
  process.exit(1);
}

const app = express();

app.use(express.static(distPath, { index: false, maxAge: "1h" }));
app.get("/healthz", (_req, res) => res.send("ok"));
app.get("*path", (_req, res) => res.sendFile(indexPath));

const port = Number(process.env.PORT || 3000);

app.listen(port, "0.0.0.0", () => {
  console.log(`Workflow Builder UI listening on port ${port}`);
});
