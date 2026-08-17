<p align="center">
  <img src="icon.svg" alt="Vaultwarden Logo" width="21%">
</p>

# Vaultwarden on StartOS

> Everything not listed in this document should behave the same as upstream
> Vaultwarden. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Vaultwarden](https://github.com/dani-garcia/vaultwarden/) is a Bitwarden-compatible password-manager server that the official Bitwarden clients talk to unmodified. This package generates the admin token as an Argon2 hash rather than storing it in the clear, keeps the primary domain pointed at an address you actually publish, and opens signups only long enough for you to make your account.

- **Upstream repo:** <https://github.com/dani-garcia/vaultwarden/>
- **Wrapper repo:** <https://github.com/Start9Labs/vaultwarden-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

Two images: upstream's, unmodified, and a four-line Alpine build that exists to run one command.

| Property      | Value                                                   |
| ------------- | ------------------------------------------------------- |
| Images        | `vaultwarden/server` (alpine), plus `argon2.Dockerfile` |
| Architectures | x86_64, aarch64                                         |
| Entrypoint    | Upstream's                                              |

| Subcontainer      | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `vaultwarden-sub` | The `primary` daemon — the one to `attach` to |
| `argon2`          | Temporary; hashes the admin token, then exits |

**The second image is only there so the admin token never has to be stored in the clear.** Vaultwarden accepts an Argon2 PHC string in place of a plaintext admin token, and the alpine build provides the `argon2` binary to produce one. It runs for a second or two when the token action is invoked and holds no mounts at all.

## Volume and Data Layout

One volume, holding everything.

| Volume | Mount Point | Purpose                                                                             |
| ------ | ----------- | ----------------------------------------------------------------------------------- |
| `main` | `/data`     | The SQLite vault database, attachments, RSA keys, icon cache, and both config files |

The database is the vault: every account, every organisation, and every encrypted entry. The RSA keypair beside it is what signs the auth tokens, so losing it logs every client out.

## File Models

Two models. One is Vaultwarden's own file, and one is a small store the package keeps beside it.

| File              | Format | Modelled                | Written by                             |
| ----------------- | ------ | ----------------------- | -------------------------------------- |
| `config.json`     | JSON   | Yes — `FileHelper.json` | Install, every init, and every action  |
| `systemSmtp.json` | JSON   | Yes — `FileHelper.json` | Install, and the Configure SMTP action |

**`config.json` is Vaultwarden's, not the package's.** It is the same file Vaultwarden's own admin portal writes, so a setting changed in the portal and a setting changed by an action land in the same place. Only the keys below are modelled; anything else the portal writes is left untouched, because the model parses loosely.

| Key               | Set by                                     | Notes                                                                                                                         |
| ----------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `admin_token`     | The token action                           | Stored as an Argon2 hash, never as the token itself                                                                           |
| `domain`          | Init, then Set Primary Domain              | The address Vaultwarden builds links from                                                                                     |
| `signups_allowed` | Install, then the toggle action            | Seeded **on**, so you can create the first account                                                                            |
| `ip_header`       | Enforced                                   | Set to the header StartOS's reverse proxy actually sends, so rate limiting and logs see the real client rather than the proxy |
| `smtp_*`          | Configure SMTP, or the system-SMTP watcher | Absent entirely when email is off                                                                                             |

**`domain` re-picks itself.** On every init, if the stored value is missing or is no longer one of the addresses the vault interface publishes, the package silently replaces it with the `.local` address. No task is raised.

`systemSmtp.json` records only whether you chose StartOS's system SMTP and any custom From address. That indirection matters: with it enabled, init re-reads the system's SMTP settings on every start and rewrites the `smtp_*` keys, so changing the server's mail configuration propagates here without touching this package.

## Dependencies

None. Vaultwarden bundles its own SQLite database and needs nothing else installed.

## Network Access and Interfaces

Two interfaces on the same binding and the same port — the vault, and Vaultwarden's admin portal at a path beneath it.

| Interface    | Id      | Type | Port | Path     | Description                         |
| ------------ | ------- | ---- | ---- | -------- | ----------------------------------- |
| Web Vault    | `vault` | ui   | 80   | `/`      | The primary interface, in a browser |
| Admin Portal | `admin` | ui   | 80   | `/admin` | Administrator operations            |

Neither is masked. **The admin portal is reachable at any address the vault is**, protected by the admin token and nothing else — so publishing the vault publishes the portal. That is why the token is `critical` and why it is a 32-character generated value rather than something you choose.

## Installation and First-Run Flow

Install seeds the config, picks the `.local` address as the domain, and raises two tasks. No account exists yet and no credential is shown until you run the token task.

The order that works:

1. **Create the admin token** (`critical`). It is shown once, and only the Argon2 hash is kept — there is no way to recover it, only to replace it.
2. **Create your account** in the web vault. Vaultwarden has no bootstrap user; the first signup is yours.
3. **Disable signups** (`important`). Until you do, anyone who can reach a published address can create an account on your server.

Email is optional and off at install. Without SMTP, Vaultwarden cannot send invitations, email-verification, or the emergency-access flows, and two-factor by email is unavailable.

## Actions

Four actions, all available whether or not the service is running, and all applied on the next start.

### Create Admin Token / Update Admin Token

One action whose name flips depending on whether a token already exists.

- **What it changes:** `admin_token` in `config.json`, written as an Argon2 hash produced by the `argon2` container.
- **Cost:** seconds, then a restart.
- **Repeat safety:** safe to re-run; each run generates a fresh token and invalidates the previous one.
- **Outputs:** the token, masked and copyable, shown once. **It is not recoverable** — the hash is one-way, so a lost token means running this action again.

### Set Primary Domain

Chooses which published address Vaultwarden treats as its domain.

- **What it changes:** `domain` in `config.json`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent, but not consequence-free once in use — the domain is baked into invitation links, emergency-access links, and WebAuthn credentials. **Changing it invalidates registered WebAuthn/passkey two-factor devices**, which are bound to the origin they were registered at.

### Disable Signups / Enable Signups

One action whose name, description, and warning flip with the current state.

- **What it changes:** `signups_allowed` in `config.json`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** it is a toggle — running it twice returns to where you started.
- **Existing accounts are unaffected**; this governs only whether new ones can be created. Invitations sent from the admin portal work either way.

### Configure SMTP

Sets up outbound email.

- **What it changes:** `systemSmtp.json`, and the `smtp_*` keys in `config.json`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent; the form is pre-filled from whichever source is currently in use.
- **Three choices:** StartOS's system SMTP, your own server, or disabled. Choosing the system option is the one that keeps tracking — the settings are re-read on every start rather than copied once.

## Tasks

Two tasks, and one of them can come back.

| Task               | Severity    | Raised when                    | Cleared when    |
| ------------------ | ----------- | ------------------------------ | --------------- |
| Create Admin Token | `critical`  | Whenever no admin token is set | The action runs |
| Disable Signups    | `important` | At install                     | The action runs |

The token task is **not install-only**: init checks on every start, so clearing the token by hand brings it back. `critical` because without a token the admin portal is unreachable, and the portal is the only route to user management, organisation cleanup, and diagnostics.

Signups are `important` rather than `critical` because the service is fully functional with the task outstanding — the risk is that it stays open.

## Health Checks

One check, on the only daemon.

| Check     | Displayed       | Method               |
| --------- | --------------- | -------------------- |
| `primary` | "Web Interface" | Port 80 is listening |

Vaultwarden binds quickly, so a failure here means the process did not start — most often a value in `config.json` it rejects, which it names in the service logs. A running service whose clients cannot sync is a different problem, and usually the domain: the Bitwarden apps validate the origin they were configured with.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded.

- **Included:** the vault database with every account and encrypted entry, attachments, the RSA signing keys, and both config files — including the hashed admin token and any SMTP password.
- **Restore:** complete, and clients stay logged in because the signing keys come back with everything else.
- **Check the domain after a restore.** If the restored server publishes different addresses, init silently re-picks the `.local` one, and any passkey two-factor registered against the old origin stops working.

**This backup is as sensitive as the vault it contains.** Entries stay encrypted under each user's master password, but the admin-token hash, the signing keys, and the SMTP credentials are all in it.

## Limitations and Differences

1. **The admin token is stored hashed and shown once.** There is no recovery — only replacement.
2. **Signups are open at install** and stay open until you run the action. There is no bootstrap admin, so the window is deliberate.
3. **The admin portal shares the vault's addresses**, at `/admin`. It cannot be published separately or restricted to a different address.
4. **The domain is silently re-picked** when the stored one stops being published; there is no prompt.
5. **Changing the domain invalidates passkey and WebAuthn second factors**, which are bound to their original origin.
6. **Settings changed in the admin portal are not all modelled here**, so the package will not preserve or re-assert them — but it will not strip them either.
7. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: vaultwarden
image: vaultwarden/server # alpine; plus a local argon2.Dockerfile build
architectures:
  - x86_64
  - aarch64
subcontainers:
  - vaultwarden-sub # the running daemon
  - argon2 # temporary; hashes the admin token
volumes:
  main: /data
file_models:
  - /data/config.json # Vaultwarden's own; also written by its admin portal
  - /data/systemSmtp.json
startos_managed_env_vars: [] # Vaultwarden is configured by config.json, not env
dependencies: []
interfaces:
  vault: { type: ui, port: 80 }
  admin: { type: ui, port: 80 } # path /admin
actions:
  - set-admin-token # name flips Create/Update
  - set-primary-domain
  - toggle-signups # name flips with the current state
  - manage-smtp
tasks:
  - { action: set-admin-token, severity: critical } # re-raises whenever unset
  - { action: toggle-signups, severity: important }
health_checks:
  - primary # displayed "Web Interface"
```
