# @genguardx/pi

GenGuardX MCP server and skill for Pi.

## Install

```sh
pi install npm:@genguardx/pi
```

## Configuration

Set your instance URL (without `/mcp`):

```sh
export GGX_URL=https://aisandbox.genguardx.ai
```

To use an API key instead of OAuth:

```sh
export GGX_API_KEY=your-key
```

If `GGX_URL` is not set, the extension does not register the server. Sign in with OAuth via `pi mcp login genguardx` if not using an API key. Use `/ggx` to show connection info.
