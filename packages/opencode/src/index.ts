import { Plugin } from "@opencode/plugin";
import type { Mcp } from "@opencode/schema/mcp";
import type { Skill } from "@opencode/schema/skill";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseFrontmatter(content: string): { name?: string; description?: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }
  const frontmatter = match[1];
  const result: { name?: string; description?: string } = {};
  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key === "name") {
      result.name = value;
    } else if (key === "description") {
      result.description = value;
    }
  }
  return result;
}

export default Plugin.define({
  id: "genguardx",
  async setup(ctx) {
    const ggxUrlRaw =
      process.env.GGX_URL || (ctx.options as Record<string, unknown> | undefined)?.ggxUrl;
    const ggxUrl = typeof ggxUrlRaw === "string" ? ggxUrlRaw.trim() : "";
    const baseUrl = ggxUrl !== "" ? ggxUrl : "https://aisandbox.genguardx.ai";
    const apiKeyRaw =
      process.env.GGX_API_KEY || (ctx.options as Record<string, unknown> | undefined)?.apiKey;
    const apiKey = typeof apiKeyRaw === "string" ? apiKeyRaw.trim() : "";

    const url = baseUrl.replace(/\/$/, "") + "/mcp";
    const headers: Record<string, string> = {};
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    await ctx.mcp.transform((editor) => {
      const config: Mcp.ServerConfig = {
        type: "remote",
        url,
        ...(Object.keys(headers).length > 0 ? { headers } : {}),
      };
      editor.set("genguardx", config);
    });

    const skillPath = path.resolve(__dirname, "../skills/genguardx/SKILL.md");
    try {
      if (fs.existsSync(skillPath)) {
        const content = fs.readFileSync(skillPath, "utf-8");
        const frontmatter = parseFrontmatter(content);
        const skillName = frontmatter.name || "genguardx";
        const skillDescription =
          frontmatter.description || "Work with a GenGuardX instance through its MCP server.";

        await ctx.skill.transform((editor) => {
          const skill: Skill.Info = {
            id: skillName as Skill.Info["id"],
            name: skillName as Skill.Info["name"],
            description: skillDescription,
            path: skillPath as Skill.Info["path"],
            content,
          };
          editor.add(skill);
        });
      }
    } catch (err) {
      console.warn("Failed to load genguardx skill:", err);
    }
  },
});
