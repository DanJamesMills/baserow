# Baserow Codex Plugin

This plugin connects Codex to the DNHQ Baserow MCP endpoint.

Each teammate must use their own Baserow MCP token. Do not put a shared token in the plugin files.

## Files

- `.codex-plugin/plugin.json` is the Codex plugin manifest.
- `.mcp.json` registers the Baserow MCP server.
- `scripts/start-baserow-mcp.mjs` starts `mcp-remote` using the user's token.
- `scripts/setup-baserow-token.mjs` asks for the user's token and writes a local `.env`.
- `skills/baserow/SKILL.md` tells Codex how to use Baserow safely.
- `assets/baserow-icon.svg` is the plugin icon.

## Setup For Each Teammate

1. Install Node.js 20 or newer.
2. Download or copy this `baserow` plugin folder to their machine.
3. From the plugin folder, run:

```bash
node scripts/setup-baserow-token.mjs
```

4. Paste their Baserow MCP token when asked.
5. Add the plugin to a Codex marketplace, then restart Codex.
6. Open Plugins in Codex, install Baserow, then start a new thread.

The setup script creates `.env` inside the plugin folder:

```bash
BASEROW_MCP_TOKEN="their-token"
BASEROW_MCP_BASE_URL="https://baserow.dnhq.co.uk"
```

`.env` is intentionally ignored and should never be shared.

## Personal Marketplace Install

For one user, copy the plugin into their personal Codex plugin folder:

```bash
mkdir -p ~/.codex/plugins
cp -R /path/to/baserow ~/.codex/plugins/baserow
```

Then add this entry to `~/.agents/plugins/marketplace.json`:

```json
{
  "name": "baserow",
  "source": {
    "source": "local",
    "path": "../../.codex/plugins/baserow"
  },
  "policy": {
    "installation": "AVAILABLE",
    "authentication": "ON_INSTALL"
  },
  "category": "Productivity"
}
```

If the file does not exist yet, create it like this:

```json
{
  "name": "personal",
  "interface": {
    "displayName": "Personal"
  },
  "plugins": [
    {
      "name": "baserow",
      "source": {
        "source": "local",
        "path": "../../.codex/plugins/baserow"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
```

Restart Codex after editing the marketplace.

## Team Marketplace Install

For a team repo, put the plugin here:

```text
plugins/baserow
```

Then create or update:

```text
.agents/plugins/marketplace.json
```

with:

```json
{
  "name": "dnhq",
  "interface": {
    "displayName": "DNHQ"
  },
  "plugins": [
    {
      "name": "baserow",
      "source": {
        "source": "local",
        "path": "./plugins/baserow"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
```

Each teammate then runs:

```bash
codex plugin marketplace add ./path/to/repo
```

They can then install Baserow from the Codex plugin directory.

## Direct MCP Equivalent

After setup, the plugin starts the equivalent of:

```json
{
  "mcpServers": {
    "Baserow MCP": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://baserow.dnhq.co.uk/mcp/YOUR_TOKEN/sse"
      ]
    }
  }
}
```

The token is inserted locally at runtime and is not stored in the shared plugin.
# baserow
