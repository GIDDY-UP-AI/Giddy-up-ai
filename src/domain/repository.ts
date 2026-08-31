import type { ApprovalDecision, ReviewItem, UserFeedback } from "./types";

export interface CreativeRepository {
  listReviewQueue(): Promise<ReviewItem[]>;
  appendUserFeedback(feedback: UserFeedback): Promise<void>;
  appendApprovalDecision(decision: ApprovalDecision): Promise<void>;
}
