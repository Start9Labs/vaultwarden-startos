# Vaultwarden

## Documentation

- [Vaultwarden wiki](https://github.com/dani-garcia/vaultwarden/wiki) — the upstream operator guide covering server configuration, admin portal usage, and behavioral differences from Bitwarden.
- [Bitwarden help](https://bitwarden.com/help/) — end-user documentation for the Bitwarden clients you'll connect to your Vaultwarden server.

## What you get on StartOS

- A **Web Vault** interface — the Bitwarden-compatible web app users sign in to and manage their vaults from.
- An optional **Admin Portal** interface at `/admin` — off until you enable it, gated by an admin token you generate from StartOS, used to manage users, organizations, and server-wide settings.
- Compatibility with the official Bitwarden browser extensions, desktop, mobile, and CLI clients pointed at your Web Vault URL.

## Getting set up

1. Start Vaultwarden.
2. Open the **Web Vault** interface and create your first user account.
3. Vaultwarden posts an **important task** asking you to confirm the signup setting. After your account exists, run the **Disable Signups** action so strangers with your URL can't register on your server.
4. A second **important task** asks you to choose the **primary domain**. Choose it before you register a passkey or security key for two-step login, since those are tied to it.
5. If you need the Admin Portal — to invite users while signups are off, or to manage organizations and server settings — run **Enable Admin Portal**. A random 32-character token is generated and shown once; copy it somewhere safe before dismissing, since only its hash is stored. Then open the **Admin Portal** interface and sign in with it.

## Using Vaultwarden

### Connecting clients

Install a Bitwarden client (browser extension, desktop, mobile, or CLI). In the client's settings, set the server URL to your Web Vault URL — then log in with the account you created.

### Actions

- **Disable Signups / Enable Signups** — toggles whether new accounts can be created on your server. The label flips to reflect the current state. After creating your own account, leave signups disabled unless you're actively inviting new users.
- **Enable Admin Portal / Disable Admin Portal** — turns the Admin Portal on, generating its token, or off, deleting it. While it's off, the portal isn't reachable at any address. Leave it off when you're not using it.
- **Rotate Admin Token** — replaces the Admin Portal's token with a new one, shown once. Use it if you've lost the token or think it's exposed. Only shown while the portal is on.
- **Set Primary Domain** — picks which of your Vaultwarden URLs is treated as the primary one when Vaultwarden builds links for password-reset emails, organization invites, and similar messages, and which one **Open UI** opens. Use this when you want emails to link to a particular address. Passkeys and security keys are tied to this domain, so after changing it, register them again. If the chosen address stops being available, Vaultwarden uses a public domain if you have one, otherwise its `.local` address, until it returns — passkeys registered on the chosen domain don't work there, and a task asks you to choose again.
- **Configure SMTP** — sets up outbound email for invitations, password-reset emails, and admin notifications. You can choose **Disabled**, **System** (reuse StartOS's system SMTP, optionally with a custom From address), or **Custom** (supply host, port, username, password, security mode, From address). In **System** mode, removing StartOS's SMTP settings stops email sending until you configure them again.

### Outbound traffic

If you publish Vaultwarden through StartTunnel to keep your home IP private, send Vaultwarden's outbound traffic through that tunnel too. Vaultwarden fetches the website icons shown beside your logins itself, so otherwise each of those websites sees your home IP. If you use the tunnel for another reason, such as a port your router can't forward, there is nothing to change.
