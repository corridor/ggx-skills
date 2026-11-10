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

Set environment variables before starting OpenCode:

```sh
export GGX_URL=https://aisandbox.genguardx.ai
export GGX_API_KEY=your-key  # optional
```

If `GGX_URL` is not set, defaults to the public sandbox `https://aisandbox.genguardx.ai`. If no API key is set, OAuth is used.

The plugin registers the `genguardx` remote MCP server and ships the `genguardx` skill.
