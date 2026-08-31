import { describe, expect, it } from "vitest";
import { calculateQualityScore, findGateFailures, recommendAction } from "./scoring";
import type { ScoreDimensions } from "./types";

const strong: ScoreDimensions = {
  funny: 9,
  giddyVoice: 9,
  originality: 8,
  relatability: 8,
  sharePotential: 8,
  commentPotential: 7,
  humanSounding: 9,
  clichePenalty: 1,
  aiFeelingPenalty: 1,
};

describe("quality scoring", () => {
  it("shortlists a strong concept", () => {
    expect(calculateQualityScore(strong)).toBe(82);
    expect(findGateFailures(strong)).toEqual([]);
    expect(recommendAction(strong)).toBe("SHORTLIST");
  });

  it("rejects a high-ish total when a hard gate fails", () => {
    const weakVoice = { ...strong, giddyVoice: 5 };
    expect(calculateQualityScore(weakVoice)).toBeGreaterThanOrEqual(62);
    expect(findGateFailures(weakVoice)).toContain("Giddy Up voice score is below 6");
    expect(recommendAction(weakVoice)).toBe("REJECT");
  });

  it("penalizes cliché and AI-feeling independently", () => {
    const synthetic = { ...strong, clichePenalty: 8, aiFeelingPenalty: 8 };
    expect(calculateQualityScore(synthetic)).toBeLessThan(calculateQualityScore(strong));
    expect(findGateFailures(synthetic)).toEqual(
      expect.arrayContaining(["Cliché penalty is 7 or higher", "AI-feeling penalty is 7 or higher"]),
    );
  });

  it("rejects values outside the score contract", () => {
    expect(() => calculateQualityScore({ ...strong, funny: 11 })).toThrow(RangeError);
  });
});
