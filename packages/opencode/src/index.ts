import { Plugin, Skill, type Mcp } from "@opencode/plugin";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

export default Plugin.define({
  id: "genguardx",
  async setup(ctx) {
    const baseUrl = process.env.GGX_URL?.trim() || "https://aisandbox.genguardx.ai";
    const apiKey = process.env.GGX_API_KEY?.trim();
    const config: Mcp.ServerConfig = {
      type: "remote",
      url: baseUrl.replace(/\/$/, "") + "/mcp",
      ...(apiKey ? { headers: { Authorization: `Bearer ${apiKey}` } } : {}),
    };

    const skillPath = fileURLToPath(new URL("../skills/genguardx/SKILL.md", import.meta.url));
    const content = readFileSync(skillPath, "utf8");
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    const metadata: unknown = frontmatter ? parse(frontmatter[1]) : undefined;
    if (
      !metadata || typeof metadata !== "object" ||
      !("name" in metadata) || typeof metadata.name !== "string" || !metadata.name.trim() ||
      !("description" in metadata) || typeof metadata.description !== "string" || !metadata.description.trim()
    ) {
      throw new Error(`Missing skill name or description in ${skillPath}`);
    }
    const skill: Skill.Info = {
      id: Skill.ID.make(metadata.name),
      name: Skill.Name.make(metadata.name),
      description: metadata.description,
      path: Skill.Info.fields.path.make(skillPath),
      content,
    };
    await ctx.mcp.transform((editor) => editor.set("genguardx", config));
    await ctx.skill.transform((editor) => editor.add(skill));
  },
});
