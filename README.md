<p align="center">
  <img src="icon.svg" alt="Vaultwarden Logo" width="21%">
</p>

# Vaultwarden on StartOS

> Everything not listed in this document should behave the same as upstream
> Vaultwarden. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Vaultwarden](https://github.com/dani-garcia/vaultwarden/) is a Bitwarden-compatible password-manager server that the official Bitwarden clients talk to unmodified. This package generates the admin token as an Argon2 hash rather than storing it in the clear, keeps the primary domain on an address you actually publish, and opens signups only long enough for you to make your account.

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

Two images: upstream's unmodified Alpine image, and a four-line Alpine build that exists to run one command.

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

| Volume | Mount Point | Purpose                                                                                  |
| ------ | ----------- | ---------------------------------------------------------------------------------------- |
| `main` | `/data`     | The SQLite vault database, attachments, RSA keys, icon cache, and all three config files |

The database is the vault: every account, every organisation, and every encrypted entry. The RSA keypair beside it is what signs the auth tokens, so losing it logs every client out.

## File Models

Three models. One is Vaultwarden's own file, and two are small stores the package keeps beside it.

| File              | Format | Modelled                | Written by                                           |
| ----------------- | ------ | ----------------------- | ---------------------------------------------------- |
| `config.json`     | JSON   | Yes — `FileHelper.json` | Install, every init, and every action                |
| `systemSmtp.json` | JSON   | Yes — `FileHelper.json` | Install, and the Configure SMTP action               |
| `store.json`      | JSON   | Yes — `FileHelper.json` | Set Primary Domain, and the legacy-network migration |

**`config.json` is Vaultwarden's, not the package's.** It is the same file Vaultwarden's own admin portal writes, so a setting changed in the portal and a setting changed by an action land in the same place. Only the keys below are modelled; anything else the portal writes is left untouched, because the model parses loosely.

| Key               | Set by                                     | Notes                                                                           |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------- |
| `admin_token`     | The token action                           | Stored as an Argon2 hash, never as the token itself                             |
| `domain`          | Init, from the primary-domain choice       | The address Vaultwarden builds links from                                       |
| `signups_allowed` | Install, then the toggle action            | Seeded **on**, so you can create the first account                              |
| `ip_header`       | Model default                              | Defaults to `X-Forwarded-For`; an admin-portal override survives package writes |
| `smtp_*`          | Configure SMTP, or the system-SMTP watcher | Absent entirely when email is off                                               |

**`domain` follows the choice in `store.json`, and is rewritten on every init.** The user's choice is `store.json`'s `primaryUrl`, set by Set Primary Domain. Init writes `domain` from it, at the hostname's current port and scheme. While that hostname is not one of the vault interface's addresses, init writes the preferred address instead — a public domain (HTTPS first), else `.local`, else any other address — and raises the primary-domain task; with no address at all it keeps the stored one. The choice itself is kept, and `domain` returns to it when the address does. A `domain` edited in the admin portal is overwritten at the next init.

`store.json` also holds `reattachTorOnions`, set by the legacy-network migration and cleared once its Tor address has moved (see Network Access).

`systemSmtp.json` records only whether you chose StartOS's system SMTP and any custom From address. With it enabled, init re-reads the system's SMTP settings and rewrites the `smtp_*` keys; removing the system settings clears the saved SMTP credentials. Choosing custom SMTP or disabling email turns this tracking off, so init cannot overwrite that choice. The action and watcher share one mapping from SMTP settings to Vaultwarden's keys.

## Dependencies

None. Vaultwarden bundles its own SQLite database and needs nothing else installed.

## Network Access and Interfaces

Two interfaces on the same binding and the same port — the vault, and Vaultwarden's admin portal at a path beneath it. The admin interface is exported only while `admin_token` is set.

| Interface    | Id      | Type | Port | Path     | Description                         |
| ------------ | ------- | ---- | ---- | -------- | ----------------------------------- |
| Web Vault    | `vault` | ui   | 80   | `/`      | The primary interface, in a browser |
| Admin Portal | `admin` | ui   | 80   | `/admin` | Administrator operations            |

**Open UI opens the primary domain** — both interfaces nominate it — falling back to StartOS's usual choice when it is not one of their addresses.

**A server carried over from the legacy StartOS package** had its vault on internal ports 8080 and 3443. The legacy-network migration retires both. Once a Tor package supporting service-initiated onion reattachment is installed, init moves the old `.onion` address onto the vault binding on port 80, keeping the hostname, through Tor's `setupOnionReattachment`; until then `store.json`'s `reattachTorOnions` stays `true`.

Vaultwarden reads `X-Forwarded-For` through StartOS's reverse proxy. Upstream's default `ip_header_trusted_proxies` trusts non-global addresses and selects the rightmost untrusted address in a proxy chain. The package does not own that setting: an additional public proxy must be included in the trusted-proxy configuration to avoid logging and rate-limiting its address as the client.

Neither is masked. **While enabled, the admin portal is reachable at any address the vault is**, protected by the admin token and nothing else — so publishing the vault publishes the portal. That is why it is off until you enable it, and why the token is a 32-character generated value rather than something you choose. With `admin_token` empty, Vaultwarden registers no admin routes at all.

## Installation and First-Run Flow

Install seeds the config, uses the preferred address (normally `.local`) as the domain, and raises two tasks. No account exists yet, and the admin portal is off.

The order that works:

1. **Create your account** in the web vault. Vaultwarden has no bootstrap user; the first signup is yours.
2. **Disable signups** (`important`). Until you do, anyone who can reach a published address can create an account on your server.
3. **Set the primary domain** (`important`) — before registering a passkey or security key, since those are bound to it.
4. **Enable the admin portal** only if you need it — to invite users with signups off, manage organisations, or run diagnostics. Its token is shown once, and only the Argon2 hash is kept — there is no way to recover it, only to replace it.

Email is optional and off at install. Without SMTP, Vaultwarden cannot send invitations, email-verification, or the emergency-access flows, and two-factor by email is unavailable.

## Actions

Five actions, all available whether or not the service is running, and all applied on the next start.

### Enable Admin Portal / Disable Admin Portal

One action whose name, description, and warning flip with whether `admin_token` is set. The token is the state; nothing else records it.

- **What it changes:** enabling writes `admin_token` in `config.json` as an Argon2 hash produced by the `argon2` container; disabling writes it empty. The `admin` interface follows.
- **Cost:** seconds, then a restart.
- **Repeat safety:** a toggle. Both directions ask for confirmation.
- **Outputs:** enabling shows the token, masked and copyable, once. **It is not recoverable** — the hash is one-way.

### Rotate Admin Token

Hidden while the portal is off.

- **What it changes:** replaces `admin_token` with the hash of a fresh token; the old one stops working.
- **Cost:** seconds, then a restart.
- **Repeat safety:** safe to re-run; each run invalidates the previous token, and asks for confirmation first.
- **Outputs:** the new token, masked and copyable, shown once. This is also the recovery for a lost token.

### Set Primary Domain

Chooses which published address Vaultwarden treats as its domain. Built by `sdk.setupPrimaryUrl`; the select pre-selects the preferred address.

- **What it changes:** `primaryUrl` in `store.json`, which init writes to `domain` in `config.json`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent, but not consequence-free once in use — the domain is baked into invitation links, emergency-access links, and WebAuthn credentials. **Changing it invalidates registered WebAuthn/passkey two-factor devices**, which are bound to the origin they were registered at.

### Disable Signups / Enable Signups

One action whose name, description, and warning flip with the current state.

- **What it changes:** `signups_allowed` in `config.json`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** it is a toggle — running it twice returns to where you started. Both directions ask for confirmation.
- **Existing accounts are unaffected**; this governs only whether new ones can be created. Invitations sent from the admin portal work either way.

### Configure SMTP

Sets up outbound email.

- **What it changes:** `systemSmtp.json`, and the `smtp_*` keys in `config.json`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent; the form is pre-filled from whichever source is currently in use.
- **Three choices:** StartOS's system SMTP, your own server, or disabled. System mode keeps tracking StartOS settings, including their removal; custom and disabled modes clear the tracking flag. Selecting system mode without configured system SMTP clears any prior SMTP credentials.

## Tasks

Two tasks; the domain task can come back.

| Task               | Severity    | Raised when                                                         | Cleared when                                         |
| ------------------ | ----------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| Disable Signups    | `important` | At install                                                          | The action runs                                      |
| Set Primary Domain | `important` | While no domain is chosen, or the chosen one is not a vault address | A vault address is chosen, or the chosen one returns |

Signups are `important` rather than `critical` because the service is fully functional with the task outstanding — the risk is that it stays open.

## Health Checks

One check, on the only daemon. Upstream runs its SQLite migrations before opening the listener; the package does not duplicate them.

| Check     | Displayed       | Method               |
| --------- | --------------- | -------------------- |
| `primary` | "Web Interface" | Port 80 is listening |

A failure here means the listener is not open — inspect the service logs for startup, database-migration, or config-validation errors. Obsolete experimental client feature flags can also prevent the admin portal from saving settings; the package's loose model leaves unowned settings for the administrator to correct. A running service whose clients cannot sync is a different problem, and usually the domain: the Bitwarden apps validate the origin they were configured with.

**A listening port does not prove the config was loaded.** If the logs report `Failed to load configuration`, Vaultwarden ignores the entire `config.json` and uses defaults, including allowing signups and disabling the admin portal. Check for invalid JSON or out-of-range numeric values, correct the file, and restart. Settings that parse but fail validation instead prevent startup.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded.

- **Included:** the vault database with every account and encrypted entry, attachments, the RSA signing keys, and all three config files — including the hashed admin token and any SMTP password.
- **Restore:** complete, and clients stay logged in because the signing keys come back with everything else.
- **Check the domain after a restore.** If the restored server publishes different addresses, init uses the preferred address and raises the primary-domain task; any passkey two-factor registered against the old origin stops working until that address returns or the key is registered again.

**This backup is as sensitive as the vault it contains.** Entries stay encrypted under each user's master password, but the admin-token hash, the signing keys, and the SMTP credentials are all in it.

## Limitations and Differences

1. **The admin token is stored hashed and shown once.** There is no recovery — only replacement.
2. **Signups are open at install** and stay open until you run the action. There is no bootstrap admin, so the window is deliberate.
3. **The admin portal shares the vault's addresses**, at `/admin`. It cannot be published separately or restricted to a different address — only turned off.
4. **While the chosen domain is not published, Vaultwarden runs on the preferred address** (a public domain, else `.local`) and a task asks for another choice. Passkeys registered on the chosen domain do not work there.
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
  - /data/store.json # primaryUrl choice; reattachTorOnions flag
startos_managed_env_vars: [] # Vaultwarden is configured by config.json, not env
dependencies: []
interfaces:
  vault: { type: ui, port: 80 }
  admin: { type: ui, port: 80 } # path /admin; exported only while admin_token is set
actions:
  - toggle-admin-portal # name flips Enable/Disable; enabling generates the token
  - rotate-admin-token # hidden while the portal is off
  - set-primary-domain
  - toggle-signups # name flips with the current state
  - manage-smtp
tasks:
  - { action: toggle-signups, severity: important }
  - { action: set-primary-domain, severity: important } # while unset or unpublished
health_checks:
  - primary # displayed "Web Interface"
```
