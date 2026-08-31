import { useEffect, useMemo, useState } from "react";
import { LocalCreativeRepository } from "./data/localCreativeRepository";
import type { ApprovalStatus, FeedbackState, ReviewItem } from "./domain/types";

const feedbackStates: FeedbackState[] = ["LOVE", "LIKE", "MEH", "HATE", "NEVER_AGAIN"];
const approvalActions: Array<{ label: string; value: ApprovalStatus }> = [
  { label: "Approve", value: "APPROVED" },
  { label: "Revise", value: "REVISION_REQUESTED" },
  { label: "Reject", value: "REJECTED" },
];

const repository = new LocalCreativeRepository();

function makeId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

export default function App() {
  const [queue, setQueue] = useState<ReviewItem[]>([]);
  const [activeId, setActiveId] = useState<string>();
  const [taste, setTaste] = useState<FeedbackState>();
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    repository.listReviewQueue().then((items) => {
      setQueue(items);
      setActiveId(items[0]?.concept.id);
    });
  }, []);

  const active = useMemo(
    () => queue.find((item) => item.concept.id === activeId) ?? queue[0],
    [activeId, queue],
  );

  async function saveTaste(state: FeedbackState) {
    if (!active) return;
    setTaste(state);
    await repository.appendUserFeedback({
      id: makeId("feedback"),
      conceptId: active.concept.id,
      variantId: active.variants[0]?.id,
      state,
      reasonTagIds: [],
      note: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    });
    setSaved(`Taste recorded: ${state.replace("_", " ")}`);
  }

  async function saveApproval(status: ApprovalStatus) {
    if (!active) return;
    await repository.appendApprovalDecision({
      id: makeId("decision"),
      conceptId: active.concept.id,
      variantId: active.variants[0]?.id,
      status,
      note: note.trim() || undefined,
      decidedBy: "MARKIE",
      decidedAt: new Date().toISOString(),
    });
    setSaved(`Decision recorded: ${status.replace("_", " ")}`);
  }

  if (!active) return <main className="empty">Loading the shortlist…</main>;

  return (
    <div className="app-shell">
      <aside className="rail">
        <a className="brand" href="#top" aria-label="Giddy Up AI home">
          <span className="brand-mark">GU</span>
          <span>Giddy Up</span>
        </a>
        <nav aria-label="V1 workflow">
          {["Research", "Generate", "Critique", "Rank", "Decide", "Learn"].map((step, index) => (
            <span className={step === "Decide" ? "nav-step active" : "nav-step"} key={step}>
              <b>{String(index + 1).padStart(2, "0")}</b> {step}
            </span>
          ))}
        </nav>
        <div className="firewall-note">
          <b>Independent by design</b>
          <span>No shared systems or credentials.</span>
        </div>
      </aside>

      <main id="top">
        <header className="page-header">
          <div>
            <p className="eyebrow">Markie's review queue</p>
            <h1>Fewer ideas.<br />Better trouble.</h1>
          </div>
          <div className="queue-stat"><strong>{queue.length}</strong><span>ready for judgment</span></div>
        </header>

        <section className="review-grid">
          <article className="concept-card">
            <div className="card-topline">
              <span>#{active.rank} ranked concept</span>
              <span className="score">{active.score.baseScore}<small>/100</small></span>
            </div>
            <p className="universe">{active.concept.primaryUniverseId.replace("-", " ")}</p>
            <h2>{active.concept.title}</h2>
            <p className="premise">{active.concept.premise}</p>
            <blockquote>“{active.variants[0]?.body}”</blockquote>
            <dl className="brief">
              <div><dt>Comic engine</dt><dd>{active.concept.comicEngine}</dd></div>
              <div><dt>Why it survived</dt><dd>{active.rankingReasons.join(" · ")}</dd></div>
              <div><dt>Watch-out</dt><dd>{active.score.primaryWeakness}</dd></div>
            </dl>
          </article>

          <aside className="decision-panel">
            <p className="eyebrow">Taste signal</p>
            <h3>What's your gut?</h3>
            <div className="taste-grid">
              {feedbackStates.map((state) => (
                <button className={taste === state ? "taste selected" : "taste"} key={state} onClick={() => saveTaste(state)}>
                  {state.replace("_", " ")}
                </button>
              ))}
            </div>
            <label htmlFor="note">Why? <span>Optional, useful as hell.</span></label>
            <textarea id="note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Too safe, perfect voice, keep the premise…" />
            <p className="eyebrow decision-label">Production decision</p>
            <div className="approval-grid">
              {approvalActions.map((action) => (
                <button key={action.value} onClick={() => saveApproval(action.value)}>{action.label}</button>
              ))}
            </div>
            <p className="saved" aria-live="polite">{saved}</p>
          </aside>
        </section>

        <section className="signal-strip">
          <div><span>Signal 01</span><strong>Your taste</strong><p>Direct choices, reasons, edits, and hard no's.</p></div>
          <i aria-hidden="true">≠</i>
          <div><span>Signal 02</span><strong>Audience performance</strong><p>Later: reach, shares, comments, saves, and watch behavior.</p></div>
        </section>
      </main>
    </div>
  );
}
