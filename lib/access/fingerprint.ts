/**
 * Client-side device fingerprint.
 *
 * Combines a set of reasonably stable browser/device characteristics into a
 * single hash. This is the "one device" identity that a code is bound to. It
 * survives refreshes, browser restarts and reboots (nothing here is random or
 * session-scoped), but intentionally differs across browsers, machines and
 * phones — which is exactly the binding the spec requires.
 *
 * Prefers `crypto.subtle` (SHA-256) when available, and falls back to a pure-JS
 * hash when it isn't — e.g. when the site is opened over a non-secure origin
 * such as a LAN IP (`http://192.168.x.x`), where `crypto.subtle` is `undefined`.
 * Without this fallback, fingerprinting would throw and the user would see a
 * generic error instead of being able to log in.
 */

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Deterministic non-crypto hash → 64 hex chars. Based on cyrb53, run with
 * several seeds and concatenated. Not cryptographically secure, but it doesn't
 * need to be: it's only a stable device identifier, and the server re-hashes it
 * with the app secret before storing.
 */
function fallbackHashHex(input: string): string {
  const cyrb53 = (str: string, seed: number) => {
    let h1 = 0xdeadbeef ^ seed;
    let h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

  const toHex = (n: number) => n.toString(16).padStart(14, "0");
  // Four independent seeds → ~64 hex chars, well over the server's 16-char min.
  return [0, 1, 2, 3].map((seed) => toHex(cyrb53(input, seed))).join("");
}

async function hashHex(input: string): Promise<string> {
  try {
    if (typeof crypto !== "undefined" && crypto.subtle) {
      return await sha256Hex(input);
    }
  } catch {
    // fall through to the JS fallback below
  }
  return fallbackHashHex(input);
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

  cached = await hashHex(parts.join("|"));
  return cached;
}
