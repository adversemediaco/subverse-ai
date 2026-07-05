import { describe, it, expect } from "vitest";
import {
  cn,
  formatFileSize,
  formatDuration,
  clamp,
  lerp,
  mapRange,
  getInitials,
  truncate,
} from "./utils";

describe("cn", () => {
  it("merges and dedupes tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-white", false && "hidden", "font-bold")).toBe("text-white font-bold");
  });
});

describe("formatFileSize", () => {
  it("formats bytes into human-readable units", () => {
    expect(formatFileSize(0)).toBe("0 B");
    expect(formatFileSize(1024)).toBe("1.0 KB");
    expect(formatFileSize(1024 * 1024)).toBe("1.0 MB");
    expect(formatFileSize(1_610_612_736)).toBe("1.5 GB");
  });
});

describe("formatDuration", () => {
  it("formats seconds as mm:ss and hh:mm:ss", () => {
    expect(formatDuration(65)).toBe("1:05");
    expect(formatDuration(3661)).toBe("1:01:01");
  });
});

describe("math helpers", () => {
  it("clamps values within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });

  it("interpolates linearly", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });

  it("maps a value between ranges", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
  });
});

describe("string helpers", () => {
  it("extracts up to two uppercase initials", () => {
    expect(getInitials("John Patel")).toBe("JP");
    expect(getInitials("madonna")).toBe("M");
  });

  it("truncates with an ellipsis", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
    expect(truncate("short", 10)).toBe("short");
  });
});
