# Private planning (local)

**Local / private — do not commit** planning or deploy content here.

This folder holds machine-local product and release notes. The public repo ships this README only so clones and agents know the contract.

## Expected files (gitignored)

| File | Purpose |
|------|---------|
| `ROADMAP.md` | Product horizon and phased plan |
| `TODO.md` | Max-ROI execution queue |
| `DEPLOY.md` | Full Vercel + DNS + GSC runbook |

## Rules

- Do not add `ROADMAP.md`, `TODO.md`, or `DEPLOY.md` at the repo root.
- Do not commit anything in this folder except this README.
- Missing files are OK (other machine, Cloud agent). Use the public `deploy-vercel` skill checklist, or skip roadmap/todo work.
