# Initial Structured Data Model

This is a logical V1 model, not a commitment to a database vendor. The scaffold represents these records as TypeScript types and local fixtures. Future persistence should sit behind repository interfaces.

All records use Giddy-Up-native opaque IDs, UTC timestamps, and optional `schemaVersion`. Raw feedback and raw metrics are append-only; summaries are derived.

## Core entities

### `ContentUniverse`

`id`, `slug`, `name`, `description`, `guardrails`, `active`.

### `TargetAudience`

`id`, `name`, `description`, `traits[]`, `exclusions[]`. This is a hypothesis about resonance, not a demographic ownership claim.

### `FormatPlatform`

`id`, `format` (`TEXT_POST`, `STATIC_GRAPHIC`, `CAROUSEL`, `SHORT_VIDEO`, `SCRIPT`, `OTHER`), optional `platform`, constraints, and status. Platform may be absent during concept development.

### `Concept`

`id`, `title`, `premise`, `hook`, `comicEngine`, `primaryUniverseId`, `secondaryUniverseIds[]`, `targetAudienceIds[]`, `formatPlatformIds[]`, `researchNotes[]`, `sourceRefs[]`, `createdAt`, `createdBy`, `status`, and `schemaVersion`.

Concept status: `DRAFT`, `INTERNAL_REJECTED`, `REVISION`, `SHORTLISTED`, `AWAITING_MARKIE`, `APPROVED`, `REJECTED`, `IN_PRODUCTION`, `READY`, `PUBLISHED`, `ARCHIVED`.

### `Variant`

`id`, `conceptId`, `label`, `body`, `angle`, `parentVariantId?`, `revision`, `createdAt`, `status`. Variants preserve iteration history instead of overwriting copy.

### `InternalScore`

`id`, `conceptId`, optional `variantId`, evaluator/version, seven positive dimensions, two penalties, `baseScore`, `gateFailures[]`, `recommendation`, critique fields, and `createdAt`. A new evaluation appends a record.

### `UserFeedback`

`id`, `conceptId`, optional `variantId`, `state` (`LOVE`, `LIKE`, `MEH`, `HATE`, `NEVER_AGAIN`), `reasonTagIds[]`, `note?`, `approvalDecision?`, and `createdAt`.

### `FeedbackReasonTag`

`id`, `slug`, `label`, `polarity`, `description`, and `active`. Custom tags are allowed without losing the original note.

### `ApprovalDecision`

`id`, `conceptId`, optional `variantId`, status (`PENDING`, `APPROVED`, `REJECTED`, `REVISION_REQUESTED`), `note?`, `decidedBy`, `decidedAt`. This remains separate from taste state.

### `PublishingRecord`

`id`, `conceptId`, `variantId`, `formatPlatformId`, status (`NOT_PLANNED`, `PLANNED`, `READY`, `PUBLISHED`, `WITHDRAWN`), optional external content reference, `publishedAt?`, and notes. V1 models but does not automate publishing.

### `PerformanceObservation`

`id`, `publishingRecordId`, `observedAt`, `windowHours`, raw metrics (`impressions`, `reach`, `views`, `likes`, `comments`, `shares`, `saves`, `clicks`, `watchTimeSeconds`, `followersDelta`), optional normalized metrics, and provenance. Missing metrics remain null rather than zero.

### `LearnedPreference`

`id`, lane (`USER_TASTE` or `AUDIENCE_PERFORMANCE`), subject type/key, direction, weight, confidence, evidence IDs, summary, status, `derivedAt`, and `supersedesId?`. The two lanes are never merged.

### `Experiment`

`id`, name, hypothesis, variable, control definition, variant definitions, target metric or decision signal, universe/format scope, status, start/end, outcome, and linked concept IDs.

### `RecurringSeries`

`id`, name, premise, rules, voice notes, universe IDs, format IDs, status, linked concept IDs, and performance/taste summaries. This captures reusable creative IP without assuming a product.

### `ProductOpportunitySignal`

`id`, source concept/series IDs, signal type, evidence, strength, note, and status (`OBSERVED`, `REVIEW_LATER`, `DISMISSED`). It records future possibilities only; it does not authorize e-commerce work.

## Relationships

```text
ContentUniverse ─┐
TargetAudience ──┼──> Concept ──> Variant
FormatPlatform ──┘       │          │
                         ├──> InternalScore
                         ├──> UserFeedback ──> FeedbackReasonTag
                         ├──> ApprovalDecision
                         ├──> PublishingRecord ──> PerformanceObservation
                         ├──> Experiment
                         ├──> RecurringSeries
                         └──> ProductOpportunitySignal

UserFeedback ───────────────> LearnedPreference(USER_TASTE)
PerformanceObservation ─────> LearnedPreference(AUDIENCE_PERFORMANCE)
```

## V1 persistence boundary

Use in-memory/local-browser adapters for the prototype. A future database decision must preserve repository interfaces, append-only evidence, lane separation, exportability, and the Figgy firewall. No paid database is required now.

