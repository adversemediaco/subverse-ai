import { describe, it, expect } from "vitest";
import { toSRT, toVTT, toTXT, toJSON, convertSubtitles, type Segment } from "./subtitles";

const segments: Segment[] = [
  { start: 0, end: 2.5, text: "Hello world" },
  { start: 2.5, end: 5.123, text: "Second line", speaker: "Host" },
];

describe("subtitle converters", () => {
  it("formats SRT with 1-based indices and comma millisecond separators", () => {
    const srt = toSRT(segments);
    expect(srt).toContain("1\n00:00:00,000 --> 00:00:02,500\nHello world");
    // Speaker prefixed and millisecond rounding (5.123 -> 05,123)
    expect(srt).toContain("00:00:05,123\nHost: Second line");
  });

  it("formats VTT with a WEBVTT header and dot millisecond separators", () => {
    const vtt = toVTT(segments);
    expect(vtt.startsWith("WEBVTT")).toBe(true);
    expect(vtt).toContain("00:00:00.000 --> 00:00:02.500");
    expect(vtt).toContain("<v Host>Second line");
  });

  it("formats plain text with speaker labels", () => {
    expect(toTXT(segments)).toBe("Hello world\nHost: Second line");
  });

  it("produces valid, round-trippable JSON", () => {
    const parsed = JSON.parse(toJSON(segments));
    expect(parsed.segments).toHaveLength(2);
    expect(parsed.segments[1].speaker).toBe("Host");
  });

  it("dispatches by format id", () => {
    expect(convertSubtitles(segments, "srt")).toBe(toSRT(segments));
    expect(convertSubtitles(segments, "vtt")).toBe(toVTT(segments));
    expect(convertSubtitles(segments, "txt")).toBe(toTXT(segments));
  });

  it("handles hours in timestamps", () => {
    const long: Segment[] = [{ start: 3661, end: 3665, text: "One hour in" }];
    expect(toSRT(long)).toContain("01:01:01,000 --> 01:01:05,000");
  });
});
