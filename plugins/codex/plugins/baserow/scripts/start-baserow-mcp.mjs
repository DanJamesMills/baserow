#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = resolve(scriptDir, "..");
const envPath = resolve(pluginRoot, ".env");

function readDotEnv(path) {
  if (!existsSync(path)) return {};

  const env = {};
  const lines = readFileSync(path, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

const fileEnv = readDotEnv(envPath);
const token = process.env.BASEROW_MCP_TOKEN || fileEnv.BASEROW_MCP_TOKEN;
const baseUrl =
  process.env.BASEROW_MCP_BASE_URL ||
  fileEnv.BASEROW_MCP_BASE_URL ||
  "https://baserow.dnhq.co.uk";

if (!token) {
  console.error(
    [
      "Baserow MCP token is not configured.",
      "",
      "Run this from the plugin folder:",
      "  node scripts/setup-baserow-token.mjs",
      "",
      "Or set BASEROW_MCP_TOKEN in the environment before starting Codex."
    ].join("\n")
  );
  process.exit(1);
}

const sanitizedBaseUrl = baseUrl.replace(/\/+$/, "");
const encodedToken = encodeURIComponent(token);
const mcpUrl = `${sanitizedBaseUrl}/mcp/${encodedToken}/sse`;

const child = spawn("npx", ["-y", "mcp-remote", mcpUrl], {
  cwd: pluginRoot,
  env: process.env,
  stdio: "inherit"
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
