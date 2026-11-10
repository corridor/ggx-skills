# @genguardx/pi

GenGuardX MCP server and skill for Pi.

## Install

```sh
pi install npm:@genguardx/pi
```

## Configuration

Set your instance URL (without `/mcp`) if you want to use a custom instance. If not set, the public sandbox `https://aisandbox.genguardx.ai` is used:

```sh
export GGX_URL=https://aisandbox.genguardx.ai
```

To use an API key instead of OAuth:

```sh
export GGX_API_KEY=your-key
```

Sign in with OAuth via `pi mcp login genguardx` if not using an API key. Use `/ggx` to show connection info.
