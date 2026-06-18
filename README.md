# Baserow Codex Marketplace

This repository contains the DNHQ Baserow Codex plugin marketplace.

In Codex, add the marketplace with:

- Source: `https://github.com/DanJamesMills/baserow`
- Git ref: `main`
- Sparse paths: leave blank

The marketplace file is at the repo root:

```text
.agents/plugins/marketplace.json
```

There is also a nested marketplace copy at:

```text
plugins/codex/.agents/plugins/marketplace.json
```

The plugin is at:

```text
plugins/codex/plugins/baserow
```

If you want to use sparse paths, include both:

```text
.agents/plugins
plugins/codex/plugins/baserow
```
