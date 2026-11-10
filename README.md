# GenGuardX skills

Connect your AI agent to your GenGuardX (GGX) instance.

This repository holds:

- **A Claude Code plugin**, `genguardx`. It adds the GGX MCP server and the `genguardx` skill.
- **An agent skill**, `genguardx`, for any agent that reads `SKILL.md` files.

The skill tells the agent which GGX tools only read and which change data. It asks you before it changes anything.

GGX runs on your own instance. This repository installs no server and holds no credentials.

Also on [skills.sh](https://skills.sh/corridor/ggx-skills/genguardx).

## Claude Code

1. Set your instance URL, without `/mcp`, before you start Claude Code:

   ```sh
   export GGX_URL=https://ggx.example.com
   ```

   If `GGX_URL` is not set, the plugin connects to the public sandbox, `https://aisandbox.genguardx.ai`.

2. Add the marketplace and install the plugin:

   ```text
   /plugin marketplace add corridor/ggx-skills
   /plugin install genguardx@ggx-skills
   ```

3. Sign in: run `/mcp`, pick `genguardx` and finish the sign-in in your browser.

4. Check it: ask Claude to "check the GGX connection", or "list my GGX projects".

### Use an API key instead of OAuth

The plugin uses OAuth. To use a GGX API key, add the server yourself instead of the plugin's server:

```sh
claude mcp add --transport http genguardx "$GGX_URL/mcp" \
  --header "Authorization: Bearer $GGX_API_KEY"
```

Keep the key out of files you commit.

## Other agents

Install the skill with the [skills CLI](https://skills.sh):

```sh
npx skills add corridor/ggx-skills
```

The skill needs the GGX MCP server. Add it to your agent's MCP settings:

- URL: `https://<your-ggx-instance>/mcp`
- Transport: streamable HTTP
- Auth: OAuth, or the header `Authorization: Bearer <your GGX API key>`

## What the agent can do

Read GGX objects such as projects, pipelines, prompts, RAGs and data tables. Create, edit and delete them. Run pipeline chats and simulations. Read annotator and feedback portal feedback. Move objects through approval workflows. Manage project roles. Search the GGX docs.

What you can do depends on your role in GGX. The agent acts as you.

See the [GGX MCP docs](https://docs.genguardx.ai/integrations/mcp/).

## Layout

```text
.claude-plugin/marketplace.json            Claude Code marketplace
plugins/genguardx/.claude-plugin/plugin.json
plugins/genguardx/.mcp.json                GGX MCP server
plugins/genguardx/skills/genguardx/SKILL.md
skills.sh.json                             points the skills CLI to the skill
```

## Support

Email support@corridorplatforms.com, or ask your GGX administrator.

See [PRIVACY.md](PRIVACY.md) and [SECURITY.md](SECURITY.md).

## License

[Apache-2.0](LICENSE)

## Pi

Install the package:

```sh
pi install npm:@genguardx/pi
```

Set your instance URL (without `/mcp`). If not set, no server is registered:

```sh
export GGX_URL=https://aisandbox.genguardx.ai
```

To use an API key instead of OAuth, set `GGX_API_KEY`:

```sh
export GGX_API_KEY=your-key
```

Sign in with OAuth if not using an API key: `pi mcp login genguardx`. The skill is shipped with the package.

## OpenCode

Install the plugin:

```sh
opencode plugin add @genguardx/opencode
```

Or add to `opencode.jsonc`:

```jsonc
{
  "plugins": ["@genguardx/opencode"]
}
```

Set `GGX_URL` (without `/mcp`). Default sandbox is `https://aisandbox.genguardx.ai` if not set. Set `GGX_API_KEY` for bearer auth, otherwise use OAuth. Sign in as prompted by OpenCode. The skill is shipped with the plugin.
