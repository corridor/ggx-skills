# Security

Report security issues privately to support@corridorplatforms.com. Do not open a public issue.

Do not post tokens, API keys, private instance URLs, tool output or customer data in public issues.

Only the latest version on `main` is supported. Keep Claude Code, your agent and your GGX instance up to date too.

Security boundaries:

- The endpoint comes from your `GGX_URL` environment variable. With no value, it is the public sandbox. The repository names no other instance.
- The plugin holds no credentials and sets no custom headers. OAuth and token storage belong to your agent. Authorization belongs to GGX.
- The skill tells the agent to ask you before any tool that changes GGX data. That is guidance to the model, not an enforcement point. Use your agent's tool permission settings and your GGX roles to limit what it can do.
- The MCP server can expose powerful tools. This repository is not an authorization or data-loss-prevention boundary.
