---
name: anatomizer-prompt
description: Guide for the Anatomizer Builder — 5-part structured prompt format and example content. Use when editing Anatomizer selectors, assembled output, or adding new prompt presets.
paths: src/**/anatom*, src/data/**, snippet.txt
---

# Anatomizer Prompt Skill

## Purpose

The Anatomizer teaches users to build structured prompts using five explicit blocks instead of casual chat.

## Block order (fixed)

```
[SYSTEM ROLE]
{persona}

[BUSINESS CONTEXT]
{context}

[DYNAMIC VARIABLES]
{variables}

[INSTRUCTIONS]
{instructions}

[OUTPUT CONSTRAINTS]
{constraints}

### BEGIN RESPONSE ACCORDING TO SYSTEM RULES
```

## Content categories

Each category needs 3+ preset options in `ANATOMY_BUILDER_ITEMS`:

| Key | Label | Purpose |
|-----|-------|---------|
| `persona` | System Role | Who the AI acts as |
| `context` | Business Context | Situational background |
| `variable` | Dynamic Variables | Parameters and metrics |
| `instruction` | Instructions | What to produce |
| `constraint` | Output Constraints | Format, length, tone limits |

## Adding new presets

1. Add `{ title, content }` object to the appropriate array in data file
2. Keep titles short (2–4 words); content 1–2 sentences
3. Presets should span different business domains (ops, PR, HR) for variety
4. Constraints should include at least one format rule (JSON, table, word limit)

## UI behavior

- Five independent selectors (index state per category) via `ExclusiveChoiceGroup` (`radiogroup` + arrow keys)
- `useMemo` assembles final prompt text
- Pre-copy checklist (`PRE_COPY_CHECKS`) gates **Copy prompt** until all three checks are confirmed; checks reset when a layer selection changes
- One Copy control only; show 2-second "copied" / "Copy failed" feedback
- CorrectPromptPractice sits above the builder on `/#anatomizer`: weak prompt → pick structured fix → copy correct 5-layer prompt

## Exclusive choice vs quiz

- Sticky exclusive choice (LayerSelector, CorrectPromptPractice) → `src/components/shared/ExclusiveChoiceGroup.tsx`
- Maturity quiz options stay single-shot `quiz-option` buttons (click advances); wrap in `role="group"` only

## Reference implementation

Live data: `src/data/anatomyBuilder.ts`, `src/data/correctPromptPractice.ts`. UI: `CorrectPromptPractice.tsx`, `AnatomizerBuilder.tsx`, `LayerSelector.tsx`.

`snippet.txt` is **legacy only** — use it for historical format reference, not live product claims or palette.

## 5-layer demo vs 6-block course

Site Anatomizer and CorrectPromptPractice are **5-layer marketing demos**. Full **6-block** methodology is taught at `promptanatomy.app`. Keep that distinction in any intro/disclaimer copy.

## Lessons

See [`.cursor/LESSONS.md`](../LESSONS.md) for naming and brand corrections that apply when adding presets.
