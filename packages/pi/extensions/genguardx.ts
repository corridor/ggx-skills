import type { ExtensionAPI, McpServerConfig } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  const ggxUrlRaw = process.env.GGX_URL?.trim();
  const ggxUrl = ggxUrlRaw && ggxUrlRaw !== "" ? ggxUrlRaw : undefined;
  const baseUrl = ggxUrl || "https://aisandbox.genguardx.ai";
  const url = baseUrl.replace(/\/$/, "") + "/mcp";
  const apiKey = process.env.GGX_API_KEY?.trim();
  const headers: Record<string, string> = {};
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const config: McpServerConfig = {
    url,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  };

  pi.registerMcpServer("genguardx", config);

  pi.registerCommand("ggx", {
    description: "Show GenGuardX connection info",
    handler: async (_args, ctx) => {
      const displayUrl = ggxUrl ? ggxUrl.replace(/\/$/, "") + "/mcp" : baseUrl.replace(/\/$/, "") + "/mcp";
      const hasKey = Boolean(apiKey);
      ctx.ui.notify(
        `GenGuardX: url=${displayUrl}, auth=${hasKey ? "api-key" : "oauth"}`,
        "info",
      );
    },
  });
}
