<p align="center">
  <img src="icon.svg" alt="Vaultwarden Logo" width="21%">
</p>

# Vaultwarden on StartOS

> **Upstream docs:** <https://github.com/dani-garcia/vaultwarden/wiki>
>
> Everything not listed in this document should behave the same as upstream
> Vaultwarden. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[Vaultwarden](https://github.com/dani-garcia/vaultwarden) is a lightweight, self-hosted Bitwarden-compatible password manager written in Rust. This package provides a managed instance with admin token generation, signup control, SMTP configuration, and automatic primary domain selection.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

This package runs **2 containers**:

| Container | Image | Purpose |
|-----------|-------|---------|
| vaultwarden | `vaultwarden/server` (Alpine variant) | Password manager server |
| argon2 | Custom `dockerBuild` | Admin token Argon2id hashing (used only during token generation) |

- **Architectures:** x86_64, aarch64
- **Entrypoint:** Default upstream entrypoint for the vaultwarden container

## Volume and Data Layout

| Volume | Mount Point | Contents |
|--------|-------------|---------|
| `main` | `/data` | Encrypted vault database (SQLite), config, attachments, `store.json` |

**Critical:** This volume contains all your passwords and sensitive data. Ensure backups are secure and tested.

## Installation and First-Run Flow

On first install:

1. `config.json` and `store.json` are seeded with defaults
2. Auto-selects a `.local` domain as primary if not configured
3. A **critical task** is created prompting the user to run the **Create Admin Token** action
4. On update, an **important task** is created for the **Toggle Signups** action to confirm signup state

No upstream setup wizard — admin token and primary domain are configured via StartOS actions.

## Configuration Management

| StartOS-Managed (via actions) | Upstream-Managed |
|-------------------------------|------------------|
| Admin token (Argon2id hashed) | All vault data, user accounts, organizations |
| Signups enabled/disabled | User settings within the web vault |
| Primary domain (for links and invites) | |
| SMTP (disabled / system / custom) | |

## Network Access and Interfaces

| Interface | ID | Type | Port | Path | Description |
|-----------|----|------|------|------|-------------|
| Web Vault | `vault` | ui | 80 | `/` | Primary user interface |
| Admin Portal | `admin` | ui | 80 | `/admin` | Administrator interface (requires admin token) |

Both interfaces share the same origin.

## Actions (StartOS UI)

### Toggle Signups (`toggle-signups`)

| Property | Value |
|----------|-------|
| **Name** | Enable Signups / Disable Signups (dynamic based on current state) |
| **Purpose** | Toggle new user registration on or off |
| **Visibility** | Enabled |
| **Availability** | Any (running or stopped) |
| **Inputs** | None |
| **Outputs** | Signups state toggled in `config.json` |

### Create/Update Admin Token (`set-admin-token`)

| Property | Value |
|----------|-------|
| **Name** | Create Admin Token / Update Admin Token (dynamic) |
| **Purpose** | Generate a secure admin token for the Admin Portal |
| **Visibility** | Enabled |
| **Availability** | Any (running or stopped) |
| **Inputs** | None |
| **Outputs** | 32-character random token (masked, copyable). Argon2id hash stored in config. |

Created as a **critical task** on first install.

### Set Primary Domain (`set-primary-domain`)

| Property | Value |
|----------|-------|
| **Name** | Set Primary Domain |
| **Purpose** | Choose which URL serves as the primary domain for links and email invites |
| **Visibility** | Enabled |
| **Availability** | Any (running or stopped) |
| **Inputs** | Primary Domain (dynamic select from available interface URLs) |
| **Outputs** | Domain saved to `config.json` |

### Configure SMTP (`manage-smtp`)

| Property | Value |
|----------|-------|
| **Name** | Configure SMTP |
| **Purpose** | Set up email sending for invitations and notifications |
| **Visibility** | Enabled |
| **Availability** | Any (running or stopped) |
| **Inputs** | SMTP configuration: Disabled, System (uses StartOS system SMTP, with optional custom "From" address), or Custom (host, port, from, username, password, security) |
| **Outputs** | SMTP settings saved to config |

## Backups and Restore

- **Backed up:** `main` volume (encrypted vault database, attachments, configuration)
- **Restore behavior:** Volume restored in place; all vault data, users, and settings are preserved
- **Important:** Your vault data is encrypted with your master password. StartOS cannot recover data if you lose your master password.

## Health Checks

| Check | Daemon | Method | Success Condition |
|-------|--------|--------|-------------------|
| Web Interface | primary | Port listening (80) | Port 80 responds |

## Dependencies

None.

## Limitations and Differences

1. **No push notifications** — requires Bitwarden's proprietary push relay
2. **Admin token required** — must generate a token via action to access the admin portal
3. **SQLite database** — uses embedded SQLite rather than an external database
4. **No Bitwarden Send storage limits enforced server-side** — enforced by client only

## What Is Unchanged from Upstream

- Full Bitwarden API compatibility
- Encrypted vault storage
- Password, card, identity, and note storage
- Secure password generator
- TOTP authenticator
- Organization support
- Emergency access
- Folder organization
- Browser auto-fill
- All official Bitwarden client compatibility (browser extensions, desktop, mobile, CLI)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: vaultwarden
image: vaultwarden/server (Alpine), argon2 (custom dockerBuild)
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  vault: 80
dependencies: none
startos_managed_env_vars: []
actions:
  - toggle-signups
  - set-admin-token
  - set-primary-domain
  - manage-smtp
```
