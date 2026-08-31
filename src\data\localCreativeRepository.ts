import type { CreativeRepository } from "../domain/repository";
import type { ApprovalDecision, ReviewItem, UserFeedback } from "../domain/types";
import { reviewQueue } from "./seed";

const FEEDBACK_KEY = "giddy-up-ai:user-feedback:v1";
const APPROVAL_KEY = "giddy-up-ai:approval-decisions:v1";

function append<T>(key: string, value: T): void {
  const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as T[];
  localStorage.setItem(key, JSON.stringify([...existing, value]));
}

export class LocalCreativeRepository implements CreativeRepository {
  async listReviewQueue(): Promise<ReviewItem[]> {
    return structuredClone(reviewQueue);
  }

  async appendUserFeedback(feedback: UserFeedback): Promise<void> {
    append(FEEDBACK_KEY, feedback);
  }

  async appendApprovalDecision(decision: ApprovalDecision): Promise<void> {
    append(APPROVAL_KEY, decision);
  }
}
