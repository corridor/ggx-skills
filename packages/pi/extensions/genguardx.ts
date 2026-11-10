import type { ExtensionAPI, McpServerConfig } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  const baseUrl = process.env.GGX_URL?.trim() || "https://aisandbox.genguardx.ai";
  const url = baseUrl.replace(/\/$/, "") + "/mcp";
  const apiKey = process.env.GGX_API_KEY?.trim();

  const config: McpServerConfig = {
    url,
    ...(apiKey ? { headers: { Authorization: `Bearer ${apiKey}` } } : {}),
  };

  pi.registerMcpServer("genguardx", config);

  pi.registerCommand("ggx", {
    description: "Show GenGuardX connection info",
    handler: async (_args, ctx) => {
      ctx.ui.notify(
        `GenGuardX: url=${url}, auth=${apiKey ? "api-key" : "oauth"}`,
        "info",
      );
    },
  });
}
