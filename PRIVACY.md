# Privacy and data flow

This repository holds configuration and instructions only. It runs no code of its own, sends no telemetry, makes no network requests and stores no tokens.

**The plugin** tells Claude Code to connect to `${GGX_URL}/mcp`. If `GGX_URL` is not set, that is the public sandbox, `https://aisandbox.genguardx.ai/mcp`. Claude Code makes the connection, runs the OAuth sign-in and stores the tokens with its own credential storage. Removing the plugin does not revoke the sign-in. Revoke it in GGX or ask your GGX administrator.

`GGX_URL` lives in your shell environment. It may reveal a private hostname. Do not put credentials in it.

**Your GGX instance** handles each tool call under your account's permissions. It may keep operational or audit logs according to your organization's policy. Some tools write data, start evaluations or run pipelines.

**Your AI model provider** may receive tool descriptions, tool arguments and the GGX data the tools return, as part of your conversation. This repository does not control that provider's retention or use of data. Check your organization's agreements before you connect sensitive environments. The public sandbox is for trying GGX; do not put sensitive data in it.

For privacy questions, email support@corridorplatforms.com or ask your GGX administrator.
