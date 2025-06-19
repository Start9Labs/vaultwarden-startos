## Important!!

Vaultwarden is a _self-hosted_ password manager, which means your passwords physically live on your StartOS server. Be sure to create backups and keep them safe. If you lose your StartOS data drive or uninstall Vaultwarden, and you have not made a backup, all your passwords will be lost forever.

# Usage Instructions

## Connecting to Your Vaultwarden Server

You can use Vaultwarden simply by visitng any of your Web Vault address in the browser. You can also use a variety of Bitwarden clients, including browsers extensions, desktop apps, and mobile apps. For a complete list of options and detailed instructions, see the [docs](https://docs.start9.com/latest/user-manual/service-guides/vaultwarden).

## Using The Admin Portal

This portal enables you to configure environment settings, enable or disable new signups, edit users, edit organizations, and more. To use the admin portal:

1. Ensure you have your `Admin Token` ready. If you forgot or lost it, you can easily regenerate one by going to Actions > Update Admin Token.
2. Navigate to the Admin Portal by clicking **"Admin Portal"** from the Interfaces section of your Vaultwarden service dashboard.
3. Authenticate with your admin token from step 1.

### SMTP Configuration

To set SMTP credentials for your Vaultwarden server, use **Actions > Configure SMTP** from your Vaultwarden service page. _Do not_ use the admin portal; any credentials entered into the admin portal will be overwritten the next time Vaultwarden is started.
