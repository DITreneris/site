---
name: scaffold-mvp
description: Historical — initial Vite scaffold from snippet.txt is complete. Use deploy-vercel skill for production deploy instead.
disable-model-invocation: true
---

# Scaffold MVP Skill (Historical)

**Status:** Project is fully scaffolded. Do not re-run initialization steps.

The MVP lives in `src/` with Vite + React 19 + Tailwind v4. For new work:

- UI changes → `ui-builder` agent + `DESIGN_SYSTEM.md` §14
- Content → `ecosystem-content` skill + `primal_concept.txt`
- Deploy → `deploy-vercel` skill

## Original scaffold steps (reference only)

1. `npm create vite@latest . -- --template react-ts`
2. Migrate data from `snippet.txt` → `src/data/`
3. Split JSX into `src/components/` by tab

These steps were completed in v0.1.0. See `CHANGELOG.md`.
