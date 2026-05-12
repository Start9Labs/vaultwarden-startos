# Vaultwarden

## Documentation

- [Vaultwarden wiki](https://github.com/dani-garcia/vaultwarden/wiki) — the upstream operator guide covering server configuration, admin portal usage, and behavioral differences from Bitwarden.
- [Bitwarden help](https://bitwarden.com/help/) — end-user documentation for the Bitwarden clients you'll connect to your Vaultwarden server.

## What you get on StartOS

- A **Web Vault** interface — the Bitwarden-compatible web app users sign in to and manage their vaults from.
- An **Admin Portal** interface at `/admin` — gated by an admin token you generate from StartOS, used to manage users, organizations, and server-wide settings.
- Compatibility with the official Bitwarden browser extensions, desktop, mobile, and CLI clients pointed at your Web Vault URL.

## Getting set up

After install, Vaultwarden posts a **critical task** to create your admin token. You can't start the service until it's done.

1. Run the **Create Admin Token** task. A random 32-character token is generated and shown once — copy it and save it somewhere safe before dismissing. The hashed form is stored on the server; the plain token is your only way into the Admin Portal. If you lose it, run the **Update Admin Token** action later to mint a new one.
2. Start Vaultwarden.
3. Open the **Web Vault** interface and create your first user account.
4. Open the **Admin Portal** interface, paste your admin token to sign in, and verify the server is healthy.
5. Vaultwarden also posts an **important task** asking you to confirm the signup setting. After your account exists, run the **Disable Signups** action so strangers with your URL can't register on your server.

## Using Vaultwarden

### Connecting clients

Install a Bitwarden client (browser extension, desktop, mobile, or CLI). In the client's settings, set the server URL to your Web Vault URL — then log in with the account you created.

### Actions

- **Disable Signups / Enable Signups** — toggles whether new accounts can be created on your server. The label flips to reflect the current state. After creating your own account, leave signups disabled unless you're actively inviting new users.
- **Create Admin Token / Update Admin Token** — generates (or regenerates) the token that gates the Admin Portal. Run **Update Admin Token** to rotate the token or recover if you've lost it.
- **Set Primary Domain** — picks which of your Vaultwarden URLs is treated as the primary one when Vaultwarden builds links for password-reset emails, organization invites, and similar messages. Use this when you've added a public clearnet domain and want emails to link to it instead of the default `.local` address.
- **Configure SMTP** — sets up outbound email for invitations, password-reset emails, and admin notifications. You can choose **Disabled**, **System** (reuse StartOS's system SMTP, optionally with a custom From address), or **Custom** (supply host, port, username, password, security mode, From address).
