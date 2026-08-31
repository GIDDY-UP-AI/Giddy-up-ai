# Markie Taste Learning

Markie's judgment is a first-class learning signal, not an obstacle between generation and publishing. The system should learn what she means by “that sounds like us,” including preferences that are difficult to express before examples exist.

## Feedback states

| State | Meaning | Workflow effect |
|---|---|---|
| `LOVE` | Distinctive, exciting, strongly on-brand | Approve or prioritize; learn strong positive traits |
| `LIKE` | Good and usable, possibly needs refinement | Approve or revise; learn moderate positive traits |
| `MEH` | Not bad, not worth making | Reject from current queue; weak/neutral signal |
| `HATE` | Clearly wrong, unfunny, or off-brand | Reject; learn strong negative traits |
| `NEVER_AGAIN` | A pattern, premise, tone, or device to prohibit | Reject and create an explicit durable avoidance rule |

Approval and taste are related but distinct. Markie may `LOVE` a premise and request revision, or `LIKE` it while declining it for timing reasons.

## Reasons and tags

Each response may store free-text notes plus reusable reason tags. Initial tags:

- `NAILED_VOICE`, `ACTUALLY_FUNNY`, `ORIGINAL`, `SPECIFIC`, `RELATABLE`, `SHAREABLE`
- `WRONG_VOICE`, `NOT_FUNNY`, `CLICHE`, `TOO_SAFE`, `TOO_MEAN`, `TRYING_TOO_HARD`
- `AI_SOUNDING`, `TOO_WORDY`, `PUNCHLINE_WEAK`, `BAD_TARGET`, `WRONG_TIMING`
- `KEEP_PREMISE`, `REWRITE_ANGLE`, `REWRITE_LINE`, `EXPLORE_AS_SERIES`

Tags are extensible. Preserve Markie's exact note even when a tag summarizes it.

## Two independent learning lanes

### User taste

Source: Markie's states, tags, edits, approvals, rejections, and repeated choices. It answers: **Should Giddy Up make this?**

### Audience performance

Source: platform metrics recorded after publication, normalized by platform, format, account size, reach, and observation window. It answers: **How did the published work behave?**

Never collapse these lanes into one “success” number. High-performing work can be off-brand; beloved work can be strategically valuable before it earns reach. Store both, show both, and allow disagreement to produce an experiment rather than silently overriding Markie.

## Learning process

1. Store raw immutable feedback events and raw performance observations.
2. Extract candidate preferences: favored mechanisms, disliked phrasing, universe affinities, format fit, acceptable edge, and recurring patterns.
3. Attach evidence counts and confidence to each learned preference.
4. Apply `NEVER_AGAIN` rules immediately, with a clear path for Markie to revoke them.
5. Use other preferences as ranking features, not absolute laws.
6. Recompute derived preferences as evidence grows; never rewrite history.
7. Surface why a concept moved up or down.

## Cold start

Begin with the brand and quality specifications, not invented assumptions about Markie. Early batches should deliberately vary universes, mechanisms, edge, and format. Ask for reasons on strong reactions, but do not force labor on every decision.

