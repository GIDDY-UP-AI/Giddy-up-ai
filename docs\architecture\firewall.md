# Mandatory Figgy / Go Fig Firewall

## Rule

Giddy Up AI is a standalone system. No Figgy / Go Fig Bookz asset may cross into it, and no Giddy Up asset may be placed into Figgy infrastructure.

## Prohibited connections

The firewall covers:

- source repositories, copied modules, shared packages, templates, and snippets;
- databases, schemas, buckets, queues, caches, analytics projects, and backups;
- API keys, OAuth clients, tokens, service accounts, signing keys, and secret stores;
- hosting accounts, cloud projects, domains, CI/CD environments, and deployment pipelines;
- agents, system prompts, memory stores, embeddings, vector indexes, and training/evaluation data;
- customer/client records, accounting data, campaigns, contacts, content, and behavioral data;
- identifiers or lookup tables that could join the two systems.

## Required technical controls

When infrastructure is introduced:

1. Use a Giddy-Up-owned organization/project/account and a dedicated repository.
2. Use Giddy-Up-specific databases and storage with separate encryption and access policies.
3. Use separate secret names, OAuth applications, service accounts, billing tags, analytics properties, and deployment environments.
4. Grant least privilege only to Giddy Up resources.
5. Block cross-project network and IAM access by default.
6. Keep backups, logs, telemetry, and exports inside the same boundary.
7. Use synthetic Giddy Up fixtures in development—never masked Figgy data.
8. Review dependencies and CI configuration for accidental Figgy references.

## Repository enforcement

- `AGENTS.md` carries the permanent instruction.
- Code must depend on local interfaces, not Figgy services.
- Configuration examples use only `GIDDY_UP_*` placeholders.
- Pull-request review must reject Figgy names, URLs, IDs, packages, or credentials.
- A future CI firewall check should scan tracked content and configuration for forbidden cross-project references, with carefully reviewed documentation exceptions.

## Incident response

If cross-contamination is suspected:

1. stop the affected workflow;
2. do not copy or propagate the material further;
3. identify the exact data, credential, code, and logs involved;
4. revoke/rotate exposed credentials in their owning system;
5. remove contaminated Giddy Up artifacts and rebuild from clean sources;
6. document the incident and add a preventive control.

Convenience, shared ownership, or similar business goals are not exceptions. Any future integration between the brands would require an explicit architectural reconsideration outside this project; it must never emerge accidentally.

