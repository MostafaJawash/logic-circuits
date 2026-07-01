/**
 * Client-side device fingerprint.
 *
 * Combines a set of reasonably stable browser/device characteristics into a
 * single SHA-256 hash. This is the "one device" identity that a code is bound
 * to. It survives refreshes, browser restarts and reboots (nothing here is
 * random or session-scoped), but intentionally differs across browsers,
 * machines and phones — which is exactly the binding the spec requires.
 *
 * Runs only in the browser and only in a secure context (localhost counts), so
 * `crypto.subtle` is available.
 */

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** A small, stable canvas-render hash — varies by GPU/driver/font stack. */
function canvasSignature(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 60;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "no-canvas";
    ctx.textBaseline = "top";
    ctx.font = "16px 'Arial'";
    ctx.fillStyle = "#f60";
    ctx.fillRect(2, 2, 120, 40);
    ctx.fillStyle = "#069";
    ctx.fillText("الدارات المنطقية 🔒 LGC", 4, 4);
    ctx.strokeStyle = "rgba(56,189,248,0.7)";
    ctx.arc(60, 30, 20, 0, Math.PI * 2);
    ctx.stroke();
    return canvas.toDataURL();
  } catch {
    return "canvas-error";
  }
}

let cached: string | null = null;

/** Compute (and memoize for this page) the current device fingerprint. */
export async function getDeviceFingerprint(): Promise<string> {
  if (cached) return cached;

  const nav = navigator;
  const scr = window.screen;

  const parts = [
    nav.userAgent,
    nav.language,
    (nav.languages || []).join(","),
    // `platform` is deprecated but still one of the most stable signals.
    nav.platform ?? "",
    String(nav.hardwareConcurrency ?? ""),
    // Some browsers expose this; harmless when absent.
    String((nav as Navigator & { deviceMemory?: number }).deviceMemory ?? ""),
    String(nav.maxTouchPoints ?? ""),
    `${scr.width}x${scr.height}x${scr.colorDepth}`,
    String(window.devicePixelRatio ?? ""),
    String(new Date().getTimezoneOffset()),
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
    canvasSignature(),
  ];

  cached = await sha256Hex(parts.join("|"));
  return cached;
}
