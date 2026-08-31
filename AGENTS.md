# Giddy Up AI — Permanent Project Instructions

## Mission

Build Giddy Up AI as an independent AI-powered adult comedy and social-content system. V1 exists to research ideas, generate comedy concepts, critique and rank them, collect Markie's approval and taste feedback, and learn from that feedback. Audience-performance learning follows after content is published.

## Hard Figgy firewall

Giddy Up AI is completely separate from Figgy / Go Fig Bookz.

- Never use, import, reference, connect to, copy from, or share Figgy repositories, code, packages, databases, credentials, secrets, agents, prompts, memory, client data, accounting data, infrastructure, analytics, deployments, or application state.
- Never add Figgy compatibility layers, migration paths, shared services, cross-project identifiers, or fallback integrations.
- Never inspect a Figgy resource to solve a Giddy Up task.
- If a request would cross this boundary, stop and ask Markie for a Giddy-Up-native alternative. Do not weaken the firewall for convenience.
- Use Giddy-Up-specific names for future environments, secrets, storage, analytics, accounts, and infrastructure.

See `docs/architecture/firewall.md`. This rule outranks convenience and implementation speed.

## Product boundaries

Current V1 loop: **Research → Generate → Critique → Rank → Approve/Reject → Learn**.

Do not build without a later explicit request:

- e-commerce or physical/digital products;
- automated social publishing;
- the Markie avatar;
- production credentials or external-service connections.

Giddy, the Creative Director, never publishes. Production only transforms approved concepts and cannot redefine the brand.

## Creative standard

The voice is sharp, rude, irreverent, sarcastic, blunt, adult, clever, unapologetic, and slightly inappropriate. Profanity is allowed; profanity by itself is not a joke. Reject generic Etsy/Pinterest “sassy” slogans, recycled internet phrasing, demographic stereotypes, obvious AI humor, and concepts that explain their own joke.

The brand is driven by comedic sensibility, not one demographic. LGBTQ+ humor is welcome; anti-LGBTQ attacks are not.

## Learning and data

- Keep `user_taste` and `audience_performance` as separate signals. Never collapse them into a single score.
- Preserve raw feedback and metrics; learned preferences are derived and revisable.
- Record the reason behind feedback whenever available.
- Prefer structured, auditable decisions over opaque “AI liked this” outputs.
- Do not provision paid storage in V1. Local fixtures and replaceable repository interfaces are appropriate.

## Engineering approach

- Keep the system simple, modular, typed, testable, and inexpensive.
- Keep domain logic independent of UI and future vendors.
- Do not introduce an external dependency when a small local abstraction is enough.
- Add production integrations only behind explicit interfaces and only after approval.
- Run relevant checks and tests after changes; fix errors introduced by the work.
- Update documentation when product boundaries or data contracts change.

