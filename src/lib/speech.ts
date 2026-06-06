export type MicPermissionState = "unknown" | "prompt" | "granted" | "denied";

export async function queryMicrophonePermission(): Promise<MicPermissionState> {
  if (typeof navigator === "undefined" || !navigator.permissions) {
    return "unknown";
  }
  try {
    const result = await navigator.permissions.query({
      name: "microphone" as PermissionName,
    });
    return result.state as MicPermissionState;
  } catch {
    return "unknown";
  }
}

export async function requestMicrophoneAccess(): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("UNSUPPORTED");
  }
  return navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });
}

/** Request permission and immediately release stream (warm-up for browser prompt). */
export async function requestMicrophonePermission(): Promise<boolean> {
  try {
    const stream = await requestMicrophoneAccess();
    stream.getTracks().forEach((t) => t.stop());
    return true;
  } catch {
    return false;
  }
}

export function getSupportedAudioMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return "";
}

export function isSecureContext(): boolean {
  if (typeof window === "undefined") return true;
  return window.isSecureContext;
}

export function isVoiceRecordingSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined" &&
    isSecureContext()
  );
}

export function mapMicrophoneError(error: unknown): string {
  if (error instanceof DOMException) {
    switch (error.name) {
      case "NotAllowedError":
      case "PermissionDeniedError":
        return "Microphone access denied. Click «Allow microphone» below or enable it in browser settings (lock icon in address bar).";
      case "NotFoundError":
        return "No microphone found. Connect a microphone and try again.";
      case "NotReadableError":
        return "Microphone is in use by another app. Close it and try again.";
      default:
        break;
    }
  }
  if (error instanceof Error && error.message === "UNSUPPORTED") {
    return "Voice input is not supported in this browser. Use Chrome or Edge.";
  }
  return "Could not access microphone. Please try again.";
}

export function resolveSpeechLang(): string {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || "en-US";
  return lang.split("-")[0]?.toLowerCase() ?? "en";
}

export function detectLangFromText(text: string): string {
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  if (/[\u4e00-\u9fff]/.test(text)) return "zh";
  return resolveSpeechLang();
}
