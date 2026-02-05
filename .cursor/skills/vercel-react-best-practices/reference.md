# Vercel React Best Practices — Reference

This skill is derived from [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), skill **react-best-practices**. Use these links when you need detailed rule text, code examples, or the full compiled guide.

## Upstream content

| Resource | URL |
|----------|-----|
| **Full compiled guide (all 57 rules)** | https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/AGENTS.md |
| **Individual rule files** | https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices/rules |
| **Skill README** | https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/README.md |

## Rule file naming

Rule files follow the pattern `rules/<rule-id>.md`, for example:

- `rules/async-parallel.md`
- `rules/bundle-barrel-imports.md`
- `rules/server-cache-react.md`

To fetch a specific rule:

```
https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/rules/<rule-id>.md
```

## What each rule file contains

- Why the rule matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

When applying or explaining a rule, prefer fetching the corresponding `rules/<rule-id>.md` or the relevant section from AGENTS.md for exact wording and examples.
