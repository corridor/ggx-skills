import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  const ggxUrl = process.env.GGX_URL?.trim();
  let notifiedMissing = false;

  if (!ggxUrl) {
    if (!notifiedMissing) {
      try {
        pi.sendUserMessage?.(
          "GenGuardX: GGX_URL is not set. Set GGX_URL to your instance (e.g. https://aisandbox.genguardx.ai) and restart Pi.",
        );
      } catch {
        // ignore
      }
      notifiedMissing = true;
    }
    // Do not register anything if GGX_URL is missing
  } else {
    const url = ggxUrl.replace(/\/$/, "") + "/mcp";
    const headers: Record<string, string> = {};
    const apiKey = process.env.GGX_API_KEY?.trim();
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    try {
      // @ts-ignore - API shape as per docs
      pi.registerMcpServer("genguardx", {
        url,
        headers: Object.keys(headers).length > 0 ? headers : undefined,
      });
    } catch (err) {
      // best effort
    }
  }

  try {
    pi.registerCommand("ggx", {
      description: "Show GenGuardX connection info",
      handler: async (_args, ctx) => {
        const url = ggxUrl ? ggxUrl.replace(/\/$/, "") + "/mcp" : "not set";
        const hasKey = Boolean(process.env.GGX_API_KEY?.trim());
        ctx.ui.notify(
          `GenGuardX: url=${url}, auth=${hasKey ? "api-key" : "oauth"}`,
          "info",
        );
      },
    });
  } catch {
    // ignore
  }
}
