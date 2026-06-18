#!/usr/bin/env node

import { chmodSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = resolve(scriptDir, "..");
const envPath = resolve(pluginRoot, ".env");

const tokenFromArg = process.argv[2];
let token = tokenFromArg;

if (!token) {
  const rl = createInterface({ input, output });
  token = await rl.question("Paste your Baserow MCP token: ");
  rl.close();
}

token = token.trim();

if (!token) {
  console.error("No token supplied. Nothing was written.");
  process.exit(1);
}

const escapedToken = token.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
const contents = [
  "# Local secrets for the Baserow Codex plugin.",
  "# Do not commit or share this file.",
  `BASEROW_MCP_TOKEN="${escapedToken}"`,
  "BASEROW_MCP_BASE_URL=\"https://baserow.dnhq.co.uk\"",
  ""
].join("\n");

writeFileSync(envPath, contents, { mode: 0o600 });
chmodSync(envPath, 0o600);

console.log(`Saved token to ${envPath}`);
console.log("Restart Codex, then start a new thread and ask Codex to use Baserow.");
