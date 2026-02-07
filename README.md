<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# Vaultwarden for StartOS

This repository packages [Vaultwarden](https://github.com/dani-garcia/vaultwarden) for StartOS. This document describes what makes this package different from a default Vaultwarden deployment.

For general Vaultwarden usage and features, see the [upstream documentation](https://github.com/dani-garcia/vaultwarden/wiki).

## How This Differs from Upstream

This package provides a managed Vaultwarden instance with admin token generation using Argon2 hashing, signup control, SMTP configuration (including StartOS system SMTP integration), and automatic primary domain selection.

## Container Runtime

This package runs **2 containers**:

| Container | Image | Purpose |
|-----------|-------|---------|
| vaultwarden | `vaultwarden/server:1.35.2-alpine` | Password manager server |
| argon2 | Custom build | Admin token hashing |

The argon2 container is used only during admin token generation for secure password hashing.

## Volumes

| Volume | Contents | Backed Up |
|--------|----------|-----------|
| `main` | Encrypted vault database, config, attachments | Yes |

Mounted at `/data` inside the container.

**Critical:** This volume contains all your passwords and sensitive data. Ensure backups are secure and tested.

## Install Flow

On startup:
1. Auto-selects `.local` domain as primary if not configured
2. Creates task to generate admin token if none exists

## Configuration Management

### Auto-Configured Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| Primary domain | First `.local` URL | For links and invites |

### User-Configurable Settings

All configuration is done through Actions (see below).

## Network Interfaces

| Interface | Type | Port | Path | Description |
|-----------|------|------|------|-------------|
| Web Vault | ui | 80 | `/` | Main user interface |
| Admin Portal | ui | 80 | `/admin` | Administrator interface |

Both interfaces share the same origin. The Admin Portal requires an admin token to access.

## Actions

### Toggle Signups

Enable or disable new user registrations.

- **Dynamic name**: Shows "Enable Signups" or "Disable Signups" based on current state
- **Warning**: Displayed when enabling signups (security risk)
- **Default**: Signups disabled

### Create/Update Admin Token

Generate a secure admin token for accessing the Admin Portal.

- **Dynamic name**: "Create Admin Token" or "Update Admin Token"
- Uses Argon2id hashing (k=65540, t=3, p=4) via dedicated container
- Returns plaintext token (save it securely!)
- Hash stored in config

**Required on install** - created as critical task.

### Set Primary Domain

Select which Vaultwarden URL serves as the primary domain for links and email invites.

- Dynamically lists available URLs (LAN, Tor, custom domains)
- Required for email functionality

### Configure SMTP

Set up email sending for invitations and notifications.

**Options:**
- **System SMTP**: Use StartOS system-wide SMTP settings (if configured)
- **Custom**: Enter your own SMTP server details
- **Disabled**: No email functionality

System SMTP option allows optional custom "From" address override.

## Dependencies

None. Vaultwarden on StartOS is standalone.

## Backups

All data is backed up:
- `main` volume - encrypted vault database, attachments, configuration

**Important:** Your vault data is encrypted with your master password. StartOS cannot recover data if you lose your master password.

## Health Checks

| Check | Method | Success Condition |
|-------|--------|-------------------|
| Web Interface | Port listening | Port 80 responds |

## Client Compatibility

Vaultwarden is compatible with all official Bitwarden clients:
- Browser extensions (Chrome, Firefox, Safari, Edge)
- Desktop apps (Windows, macOS, Linux)
- Mobile apps (iOS, Android)
- CLI tool

Configure clients with your Vaultwarden URL (Settings → Self-hosted → Server URL).

## Limitations

1. **No push notifications**: Requires Bitwarden's proprietary push relay
2. **No Bitwarden Send storage limits**: Enforced by client, not server
3. **Admin token required**: Must generate token to access admin portal

## What's Unchanged

- Full Bitwarden API compatibility
- Encrypted vault storage
- Password, card, identity, and note storage
- Secure password generator
- TOTP authenticator
- Organization support
- Emergency access
- Folder organization
- Browser auto-fill

---

## Quick Reference (YAML)

```yaml
package_id: vaultwarden
upstream_version: 1.35.2
containers:
  - name: vaultwarden
    image: vaultwarden/server:1.35.2-alpine
  - name: argon2
    image: custom
    purpose: admin token hashing

volumes:
  main:
    backup: true
    mountpoint: /data
    contains: encrypted vault, config, attachments

interfaces:
  vault:
    type: ui
    port: 80
    path: /
  admin:
    type: ui
    port: 80
    path: /admin

actions:
  - id: toggle-signups
    name: Enable/Disable Signups
    has_input: false
    dynamic: true
  - id: set-admin-token
    name: Create/Update Admin Token
    has_input: false
    returns: plaintext token
  - id: set-primary-domain
    name: Set Primary Domain
    has_input: true
  - id: manage-smtp
    name: Configure SMTP
    has_input: true
    options: [system, custom, disabled]

dependencies: []

auto_configure:
  - primary domain (first .local URL)

health_checks:
  - name: Web Interface
    method: port_listening
    port: 80

install_tasks:
  - Create Admin Token (critical)
```
