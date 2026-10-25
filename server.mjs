import express from "./apps/demo/node_modules/express/index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist", "apps", "demo");
const indexPath = path.join(distPath, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error(`Built UI not found: ${indexPath}`);
  process.exit(1);
}

const app = express();

app.use(express.static(distPath));
app.use((req, res) => res.sendFile(indexPath));

const port = Number(process.env.PORT || 3000);

app.listen(port, "0.0.0.0", () => {
  console.log(`Workflow Builder UI listening on port ${port}`);
});
