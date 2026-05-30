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

- Five independent selectors (index state per category)
- `useMemo` assembles final prompt text
- Copy button writes full assembled string to clipboard
- Show 2-second "copied" feedback

## Reference implementation

See `snippet.txt` lines 172–198 (data) and 265–289 (assembly logic).
