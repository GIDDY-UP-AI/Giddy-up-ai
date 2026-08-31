# Internal Quality System

Giddy should protect Markie's attention. Every concept is scored and critiqued before it can enter her review queue.

## Scorecard

Positive dimensions use `0–10`; penalties also use `0–10` where a higher penalty is worse.

| Dimension | Question | Weight |
|---|---|---:|
| Funny | Is there a working comic engine and payoff? | 24% |
| Giddy Up voice | Could this unmistakably come from this brand? | 18% |
| Originality | Is the angle or expression meaningfully fresh? | 14% |
| Relatability | Will the intended audience recognize a specific truth? | 12% |
| Share potential | Would someone send/repost this as self-expression? | 10% |
| Comment potential | Does it invite stories or argument without cheap bait? | 6% |
| Human-sounding quality | Does it feel observed, compressed, and naturally phrased? | 16% |
| Overused/cliché penalty | How much does it depend on exhausted material? | −18% |
| AI-generated-feeling penalty | How strongly does it exhibit synthetic tells? | −18% |

The weighted total is normalized to `0–100`.

## Gates

A concept is internally rejected when any condition is true:

- `funny < 6`;
- `giddyVoice < 6`;
- `originality < 5`;
- `humanSounding < 6`;
- `clichePenalty >= 7`;
- `aiFeelingPenalty >= 7`;
- normalized total `< 62`;
- it violates a brand safety rule or an active `NEVER_AGAIN` preference.

Concepts scoring `62–74` may enter revision. Concepts scoring `75+` can be ranked for Markie's queue. A high total cannot compensate for failing a gate.

## Required critique

The evaluator records:

- the comic engine in one sentence;
- strongest element;
- primary weakness;
- cliché and AI-tell checks;
- target-of-joke check;
- recommended action: `REJECT`, `REVISE`, or `SHORTLIST`;
- a concise rationale that can be audited later.

## Ranking

Rank only concepts that pass gates. Ranking may then incorporate batch diversity, relevant learned taste preferences, strategic experiments, format fit, and recent universe saturation. These adjustments must be recorded separately from the base quality score.

## Calibration

Scores are decision aids, not facts. Compare evaluator scores with Markie's responses and audience outcomes over time. Adjust weights or thresholds transparently; do not train the system to inflate scores merely to match approvals.

