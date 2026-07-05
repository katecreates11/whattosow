# What To Sow — instructions for Claude

**Read `PROJECT_CONTEXT.md` before starting any task. It is the source of truth for this project** — purpose, audience, brand voice, technical/UX/SEO/affiliate principles, and AI working rules.

Also authoritative:

- `docs/tone-of-voice.md` — how to write ALL copy (gentle friend at the allotment gate; Pooh warmth, Nigel Slater rhythm). Read before writing or editing any content.

Working rules that live outside the repo (Kate's session conventions):

- Build → Kate tests in the browser → fix. Batch everything into ONE deploy; never push without her say-so.
- `npm run dev` on localhost:3000; verify with `tsc --noEmit` + `npm run build` before any deploy.
- For anything bigger than a quick fix, describe the plan in 2–3 sentences and get a yes before writing code.
