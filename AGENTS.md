# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes. This file restates neither:
whoever changes the package has both, so it carries only what they don't — repo mechanics,
a change that looks right and is not, where the next thing gets added, a naming trap, a
build or test invocation particular to this repo.

**Fix a defect you spot rather than reporting it** — you have the package open and the
context to be sure. File **a GitHub issue on this repo** only when the call isn't yours to
make: you can't pin the cause down, two defensible fixes exist, or it's too large to ride on
the work in hand. An open issue is a report, not a queue — implement one when you're asked
to or when it's labelled `Approved`, then close it with `Closes #<n>`.

Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **`npm run check` runs TypeScript only.** Package builds remain a separate step.

- **Only the Argon2 hash of the admin token is ever written.** The `argon2` image exists solely to produce it; don't "simplify" by storing the token itself, and don't drop the image without replacing the hashing path.
- **`config.json` is Vaultwarden's own file, shared with its admin portal.** The model must stay loose so a setting changed in the portal survives the package's next write. Adding a key to the shape is a decision to own it against the portal.
- **`systemSmtp.json` exists so the system-SMTP choice keeps tracking.** Init re-reads StartOS's SMTP settings and rewrites the `smtp_*` keys each start; collapsing this into a one-time copy into `config.json` silently freezes the credentials.
- **Set the domain through `store.json`'s `primaryUrl`, never `config.json`'s `domain`.** Init rewrites `domain` from the choice on every start, so a direct write lasts until the next one.
- **`ip_header` is set to match StartOS's reverse proxy**, not left to the app's default; without it rate limiting and logs attribute every request to the proxy.
