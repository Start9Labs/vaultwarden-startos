# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Only the Argon2 hash of the admin token is ever written.** The `argon2` image exists solely to produce it; don't "simplify" by storing the token itself, and don't drop the image without replacing the hashing path.
- **`config.json` is Vaultwarden's own file, shared with its admin portal.** The model must stay loose so a setting changed in the portal survives the package's next write. Adding a key to the shape is a decision to own it against the portal.
- **The admin-token task is checked on every init, not just install.** Losing the token has no recovery path, so re-raising is the only way back to the admin portal.
- **`systemSmtp.json` exists so the system-SMTP choice keeps tracking.** Init re-reads StartOS's SMTP settings and rewrites the `smtp_*` keys each start; collapsing this into a one-time copy into `config.json` silently freezes the credentials.
- **`domain` re-picks silently when it stops being published** — no task. Note the cost before changing that: the domain is the WebAuthn origin, so a change invalidates registered passkeys.
- **`ip_header` is set to match StartOS's reverse proxy**, not left to the app's default; without it rate limiting and logs attribute every request to the proxy.
