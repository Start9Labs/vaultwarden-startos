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
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **Only the Argon2 hash of the admin token is ever written.** The `argon2` image exists solely to produce it; don't "simplify" by storing the token itself, and don't drop the image without replacing the hashing path.
- **`config.json` is Vaultwarden's own file, shared with its admin portal.** The model must stay loose so a setting changed in the portal survives the package's next write. Adding a key to the shape is a decision to own it against the portal.
- **The admin-token task is checked on every init, not just install.** Losing the token has no recovery path, so re-raising is the only way back to the admin portal.
- **`systemSmtp.json` exists so the system-SMTP choice keeps tracking.** Init re-reads StartOS's SMTP settings and rewrites the `smtp_*` keys each start; collapsing this into a one-time copy into `config.json` silently freezes the credentials.
- **`domain` re-picks silently when it stops being published** — no task. Note the cost before changing that: the domain is the WebAuthn origin, so a change invalidates registered passkeys.
- **`ip_header` is set to match StartOS's reverse proxy**, not left to the app's default; without it rate limiting and logs attribute every request to the proxy.
