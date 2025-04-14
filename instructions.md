## Important!!

Vaultwarden is a _self-hosted_ password manager, which means your passwords physically live on your StartOS server. Be sure to create backups and keep them safe. If you lose your StartOS data drive or uninstall Vaultwarden, and you have not made a backup, all your passwords will be lost forever.

# Usage Instructions

## Connecting to Your Vaultwarden Server

You can use Vaultwarden simply by visitng your unique .local or .onion address in the browser. You can also use a variety of Bitwarden clients, including browsers extensions, desktop apps, and mobile apps. For a complete list of options and detailed instructions, see the [docs](https://docs.start9.com/latest/user-manual/service-guides/vaultwarden).

## Using The Admin Portal

This portal enables you to configure environment settings, enable or disable new signups, edit users, edit organizations, and more. To use the admin portal:

1. Copy your `Admin Token` from StartOS via Services > Vaultwarden > Properties.
2. Navigate to your Vaultwarden address with "/admin" suffixed. e.g. `https://<your_vaultwarden_address>/admin`
3. Authenticate with your admin token copied in step 1.

### SMTP

To set SMTP credentials for your Vaultwarden server, you must use the "Manage SMTP" Action in Vaultwarden on StartOS. _Do not_ use the admin portal; any credentials entered into the admin portal will be overwritten the next time Vaultwarden is started.
