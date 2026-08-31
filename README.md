# Giddy Up AI

Giddy Up AI is an independent AI-powered adult comedy and social-content system. It finds promising territories, develops comedy concepts, critiques and ranks them, presents the strongest work for Markie's decision, and learns from both her taste and—later—published-content performance.

The brand is broad. It is held together by a sharp, rude, irreverent, sarcastic, blunt, adult, clever, unapologetic comedic sensibility—not by a single age group, gender, relationship status, or audience segment.

## V1

The first product loop is:

**Research → Generate → Critique → Rank → Approve/Reject → Learn**

This repository currently provides:

- the brand, quality, taste-learning, agent, architecture, and roadmap specifications;
- a typed domain model for concepts, scoring, feedback, publishing, experiments, recurring IP, and learning signals;
- a local React approval-queue prototype with no backend or external credentials;
- unit tests for scoring and ranking behavior.

V1 does **not** include e-commerce, products, social auto-publishing, the Markie avatar, production credentials, or external-service integrations.

## Non-negotiable Figgy separation

Giddy Up AI is completely isolated from Figgy / Go Fig Bookz. It must not use or share Figgy code, repositories, databases, credentials, agents, memory, client data, accounting data, infrastructure, or application state. Read [the firewall specification](docs/architecture/firewall.md) and [AGENTS.md](AGENTS.md) before changing this project.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run check
npm test
npm run build
```

The prototype stores review feedback in browser `localStorage`. This is intentionally replaceable and is not a production database.

## Repository map

- `docs/brain/` — brand, content territories, taste learning, and quality rules
- `docs/agents/` — Creative Director and Production responsibilities
- `docs/architecture/` — isolation and structured data contracts
- `docs/roadmap/` — V1 stages and exit criteria
- `src/domain/` — framework-independent domain types and scoring logic
- `src/data/` — temporary local seed data
- `src/` — approval-queue interface

## Working principle

Show Markie fewer, stronger concepts. Weak, clichéd, or AI-sounding work should fail internal review before entering her queue.

