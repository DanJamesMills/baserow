---
name: baserow
description: Use the team's Baserow MCP server from Codex after the Baserow plugin has been installed and configured with BASEROW_MCP_TOKEN.
---

# Baserow

Use this skill when the user asks to inspect, search, create, update, or summarize data in the team's Baserow instance.

Before using Baserow tools, check whether the Baserow MCP server is available in the current thread. If it is unavailable or failed to start, tell the user to run:

```bash
node scripts/setup-baserow-token.mjs
```

from the installed plugin folder, paste their Baserow MCP token, restart Codex, and start a new thread.

When changing Baserow data:

- Confirm the target table or view when the request is ambiguous.
- Summarize the intended write before making broad updates.
- Prefer small, verifiable changes over large unreviewed batches.
- Do not reveal or print the user's Baserow MCP token.
