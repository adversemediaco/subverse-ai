/**
 * Subtitle format converters.
 * Pure functions (no side effects) — easy to unit test and safe on client too.
 */

export interface Segment {
  start: number; // seconds
  end: number; // seconds
  text: string;
  speaker?: string;
}

/** Format seconds as SRT timestamp: HH:MM:SS,mmm */
function toSrtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds - Math.floor(seconds)) * 1000);
  const pad = (n: number, len = 2) => n.toString().padStart(len, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}

/** Format seconds as WebVTT timestamp: HH:MM:SS.mmm */
function toVttTime(seconds: number): string {
  return toSrtTime(seconds).replace(",", ".");
}

/** Convert segments to SRT (SubRip) format. */
export function toSRT(segments: Segment[]): string {
  return segments
    .map((seg, i) => {
      const text = seg.speaker ? `${seg.speaker}: ${seg.text}` : seg.text;
      return `${i + 1}\n${toSrtTime(seg.start)} --> ${toSrtTime(seg.end)}\n${text}\n`;
    })
    .join("\n");
}

/** Convert segments to WebVTT format. */
export function toVTT(segments: Segment[]): string {
  const body = segments
    .map((seg) => {
      const text = seg.speaker ? `<v ${seg.speaker}>${seg.text}` : seg.text;
      return `${toVttTime(seg.start)} --> ${toVttTime(seg.end)}\n${text}\n`;
    })
    .join("\n");
  return `WEBVTT\n\n${body}`;
}

/** Convert segments to plain text transcript. */
export function toTXT(segments: Segment[]): string {
  return segments
    .map((seg) => (seg.speaker ? `${seg.speaker}: ${seg.text}` : seg.text))
    .join("\n");
}

/** Convert segments to structured JSON. */
export function toJSON(segments: Segment[]): string {
  return JSON.stringify({ segments }, null, 2);
}

export type SubtitleFormat = "srt" | "vtt" | "txt" | "json";

/** Dispatch to the correct converter by format id. */
export function convertSubtitles(
  segments: Segment[],
  format: SubtitleFormat
): string {
  switch (format) {
    case "srt":
      return toSRT(segments);
    case "vtt":
      return toVTT(segments);
    case "txt":
      return toTXT(segments);
    case "json":
      return toJSON(segments);
    default:
      return toSRT(segments);
  }
}
