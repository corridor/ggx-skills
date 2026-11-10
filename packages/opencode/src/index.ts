import { Plugin } from "@opencode/plugin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default Plugin.define({
  id: "genguardx",
  async setup(ctx) {
    const ggxUrl = (process.env.GGX_URL || (ctx.options as any)?.ggxUrl || "").trim();
    const apiKey = (process.env.GGX_API_KEY || (ctx.options as any)?.apiKey || "").trim();

    if (ggxUrl) {
      const url = ggxUrl.replace(/\/$/, "") + "/mcp";
      const headers: Record<string, string> = {};
      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }

      try {
        await ctx.mcp.transform((editor) => {
          editor.set("genguardx", {
            type: "remote",
            url,
            headers: Object.keys(headers).length > 0 ? headers : undefined,
          } as any);
        });
      } catch (err) {
        // best effort
      }
    } else if ((ctx.options as any)?.notifyOnMissing !== false) {
      // If no URL set, still allow registration to fail gracefully; OpenCode will handle
    }

    // Ship/register skill if present
    try {
      const skillPath = path.resolve(__dirname, "../skills/genguardx/SKILL.md");
      if (fs.existsSync(skillPath)) {
        const content = fs.readFileSync(skillPath, "utf-8");
        await ctx.skill.transform((editor) => {
          try {
            editor.add({
              id: "genguardx" as any,
              name: "genguardx" as any,
              description: "Work with a GenGuardX instance through its MCP server." as any,
              path: skillPath as any,
              content,
            } as any);
          } catch {
            // ignore if already exists
          }
        });
      }
    } catch {
      // best effort
    }
  },
});
