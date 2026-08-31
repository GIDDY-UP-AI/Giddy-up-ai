import type { ScoreDimensions } from "./types";

const weights = {
  funny: 0.24,
  giddyVoice: 0.18,
  originality: 0.14,
  relatability: 0.12,
  sharePotential: 0.1,
  commentPotential: 0.06,
  humanSounding: 0.16,
  clichePenalty: 0.18,
  aiFeelingPenalty: 0.18,
} as const;

function assertRange(name: string, value: number): void {
  if (!Number.isFinite(value) || value < 0 || value > 10) {
    throw new RangeError(`${name} must be a finite number from 0 to 10`);
  }
}

export function calculateQualityScore(input: ScoreDimensions): number {
  Object.entries(input).forEach(([name, value]) => assertRange(name, value));

  const positive =
    input.funny * weights.funny +
    input.giddyVoice * weights.giddyVoice +
    input.originality * weights.originality +
    input.relatability * weights.relatability +
    input.sharePotential * weights.sharePotential +
    input.commentPotential * weights.commentPotential +
    input.humanSounding * weights.humanSounding;

  const penalties =
    input.clichePenalty * weights.clichePenalty +
    input.aiFeelingPenalty * weights.aiFeelingPenalty;

  return Math.round(Math.max(0, Math.min(100, (positive - penalties) * 10)));
}

export function findGateFailures(input: ScoreDimensions, total = calculateQualityScore(input)): string[] {
  const failures: string[] = [];
  if (input.funny < 6) failures.push("Funny score is below 6");
  if (input.giddyVoice < 6) failures.push("Giddy Up voice score is below 6");
  if (input.originality < 5) failures.push("Originality score is below 5");
  if (input.humanSounding < 6) failures.push("Human-sounding score is below 6");
  if (input.clichePenalty >= 7) failures.push("Cliché penalty is 7 or higher");
  if (input.aiFeelingPenalty >= 7) failures.push("AI-feeling penalty is 7 or higher");
  if (total < 62) failures.push("Total quality score is below 62");
  return failures;
}

export function recommendAction(input: ScoreDimensions): "REJECT" | "REVISE" | "SHORTLIST" {
  const total = calculateQualityScore(input);
  if (findGateFailures(input, total).length > 0) return "REJECT";
  return total >= 75 ? "SHORTLIST" : "REVISE";
}
