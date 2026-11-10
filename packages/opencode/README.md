# @genguardx/opencode

GenGuardX MCP server and skill for OpenCode.

## Install

```sh
opencode plugin add @genguardx/opencode
```

Or add to `opencode.jsonc`:

```jsonc
{
  "plugins": ["@genguardx/opencode"]
}
```

## Configuration

Set `GGX_URL` (without `/mcp`) if you want to use a custom instance. If not set, the public sandbox `https://aisandbox.genguardx.ai` is used. Set `GGX_API_KEY` for bearer auth, otherwise use OAuth.

```sh
export GGX_URL=https://aisandbox.genguardx.ai
export GGX_API_KEY=your-key  # optional
```

Sign in as prompted by OpenCode. The plugin registers the `genguardx` remote MCP server and ships the `genguardx` skill.
