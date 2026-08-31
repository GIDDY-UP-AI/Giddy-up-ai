export type EntityId = string;
export type IsoDateTime = string;

export type FeedbackState = "LOVE" | "LIKE" | "MEH" | "HATE" | "NEVER_AGAIN";
export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED" | "REVISION_REQUESTED";
export type ConceptStatus =
  | "DRAFT"
  | "INTERNAL_REJECTED"
  | "REVISION"
  | "SHORTLISTED"
  | "AWAITING_MARKIE"
  | "APPROVED"
  | "REJECTED"
  | "IN_PRODUCTION"
  | "READY"
  | "PUBLISHED"
  | "ARCHIVED";

export interface ContentUniverse {
  id: EntityId;
  slug: string;
  name: string;
  description: string;
  guardrails: string[];
  active: boolean;
}

export interface TargetAudience {
  id: EntityId;
  name: string;
  description: string;
  traits: string[];
  exclusions: string[];
}

export type ContentFormat =
  | "TEXT_POST"
  | "STATIC_GRAPHIC"
  | "CAROUSEL"
  | "SHORT_VIDEO"
  | "SCRIPT"
  | "OTHER";

export interface FormatPlatform {
  id: EntityId;
  format: ContentFormat;
  platform?: string;
  constraints: string[];
  active: boolean;
}

export interface SourceReference {
  id: EntityId;
  title: string;
  url?: string;
  note: string;
  capturedAt: IsoDateTime;
}

export interface Concept {
  id: EntityId;
  title: string;
  premise: string;
  hook: string;
  comicEngine: string;
  primaryUniverseId: EntityId;
  secondaryUniverseIds: EntityId[];
  targetAudienceIds: EntityId[];
  formatPlatformIds: EntityId[];
  researchNotes: string[];
  sourceRefs: SourceReference[];
  status: ConceptStatus;
  createdAt: IsoDateTime;
  createdBy: "GIDDY" | "MARKIE" | "SYSTEM";
  schemaVersion: 1;
}

export interface Variant {
  id: EntityId;
  conceptId: EntityId;
  label: string;
  body: string;
  angle: string;
  parentVariantId?: EntityId;
  revision: number;
  status: "DRAFT" | "SELECTED" | "REJECTED" | "SUPERSEDED";
  createdAt: IsoDateTime;
}

export interface ScoreDimensions {
  funny: number;
  giddyVoice: number;
  originality: number;
  relatability: number;
  sharePotential: number;
  commentPotential: number;
  humanSounding: number;
  clichePenalty: number;
  aiFeelingPenalty: number;
}

export interface InternalScore extends ScoreDimensions {
  id: EntityId;
  conceptId: EntityId;
  variantId?: EntityId;
  evaluator: string;
  evaluatorVersion: string;
  baseScore: number;
  gateFailures: string[];
  recommendation: "REJECT" | "REVISE" | "SHORTLIST";
  strongestElement: string;
  primaryWeakness: string;
  rationale: string;
  createdAt: IsoDateTime;
}

export interface FeedbackReasonTag {
  id: EntityId;
  slug: string;
  label: string;
  polarity: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  description: string;
  active: boolean;
}

export interface UserFeedback {
  id: EntityId;
  conceptId: EntityId;
  variantId?: EntityId;
  state: FeedbackState;
  reasonTagIds: EntityId[];
  note?: string;
  approvalDecision?: ApprovalStatus;
  createdAt: IsoDateTime;
}

export interface ApprovalDecision {
  id: EntityId;
  conceptId: EntityId;
  variantId?: EntityId;
  status: ApprovalStatus;
  note?: string;
  decidedBy: "MARKIE";
  decidedAt: IsoDateTime;
}

export interface PublishingRecord {
  id: EntityId;
  conceptId: EntityId;
  variantId: EntityId;
  formatPlatformId: EntityId;
  status: "NOT_PLANNED" | "PLANNED" | "READY" | "PUBLISHED" | "WITHDRAWN";
  externalContentRef?: string;
  publishedAt?: IsoDateTime;
  notes?: string;
}

export interface PerformanceMetrics {
  impressions?: number;
  reach?: number;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  clicks?: number;
  watchTimeSeconds?: number;
  followersDelta?: number;
}

export interface PerformanceObservation {
  id: EntityId;
  publishingRecordId: EntityId;
  observedAt: IsoDateTime;
  windowHours: number;
  raw: PerformanceMetrics;
  normalized?: Record<string, number>;
  provenance: string;
}

export interface LearnedPreference {
  id: EntityId;
  lane: "USER_TASTE" | "AUDIENCE_PERFORMANCE";
  subjectType: "UNIVERSE" | "MECHANISM" | "PHRASE" | "FORMAT" | "EDGE" | "OTHER";
  subjectKey: string;
  direction: "PREFER" | "AVOID";
  weight: number;
  confidence: number;
  evidenceIds: EntityId[];
  summary: string;
  status: "ACTIVE" | "REVOKED" | "SUPERSEDED";
  derivedAt: IsoDateTime;
  supersedesId?: EntityId;
}

export interface Experiment {
  id: EntityId;
  name: string;
  hypothesis: string;
  variable: string;
  controlDefinition: string;
  variantDefinitions: string[];
  targetSignal: string;
  universeIds: EntityId[];
  formatPlatformIds: EntityId[];
  conceptIds: EntityId[];
  status: "DRAFT" | "RUNNING" | "COMPLETE" | "CANCELLED";
  startedAt?: IsoDateTime;
  endedAt?: IsoDateTime;
  outcome?: string;
}

export interface RecurringSeries {
  id: EntityId;
  name: string;
  premise: string;
  rules: string[];
  voiceNotes: string[];
  universeIds: EntityId[];
  formatPlatformIds: EntityId[];
  conceptIds: EntityId[];
  status: "INCUBATING" | "ACTIVE" | "PAUSED" | "RETIRED";
}

export interface ProductOpportunitySignal {
  id: EntityId;
  sourceConceptIds: EntityId[];
  sourceSeriesIds: EntityId[];
  signalType: string;
  evidence: string[];
  strength: number;
  note?: string;
  status: "OBSERVED" | "REVIEW_LATER" | "DISMISSED";
}

export interface ReviewItem {
  concept: Concept;
  variants: Variant[];
  score: InternalScore;
  rank: number;
  rankingReasons: string[];
}
