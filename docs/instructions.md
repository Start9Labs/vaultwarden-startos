## Important!!

Vaultwarden is a _self-hosted_ password manager, which means your passwords physically live on your Embassy. Be sure to create backups and keep them safe. If you lose your Embassy or uninstall Vaultwarden, and you have not made a backup, all your passwords will be lost forever.

# Usage Instructions

## Connecting to Your Vaultwarden Server

### Using Bitwarden Browser Extension (detailed screen shots below)

- The Bitwarden browser extension will work on Firefox (recommended) or Tor Browser. It will _not_ work on Chrome, Internet Explorer, or Brave. For Firefox, you must first ([get Tor running on your machine](https://docs.start9.com/latest/user-manual/connecting/connecting-tor/tor-os/index#tor-os)) and then enable Tor by following ([these instructions](https://start9.com/latest/user-manual/connecting/connecting-tor/tor-firefox/index)).

### Using Bitwarden Mobile App

- To use the Bitwarden mobile app, you must first enable Tor on your device by following the [iOS instructions](https://start9.com/latest/user-manual/connecting/connecting-tor/tor-os/tor-ios) or [Android instructions](https://start9.com/latest/user-manual/connecting/connecting-tor/tor-os/tor-android)

### Using Bitwarden Web Vault

- Simply click "Launch UI" from your Embassy Vaultwarden page.

## Detailed Instructions for using the browser extension

1. Open the browser and visit the add-ons section.

<!-- MD_PACKER_INLINE BEGIN -->

![](./assets/img-1.png)

<!-- MD_PACKER_INLINE END -->

2. Search for “Bitwarden” and click “Add to Firefox”.

<!-- MD_PACKER_INLINE BEGIN -->

![](./assets/img-2.png)

<!-- MD_PACKER_INLINE END -->

3. Access the Bitwarden settings.

<!-- MD_PACKER_INLINE BEGIN -->

![](./assets/img-3.png)

<!-- MD_PACKER_INLINE END -->

4. Copy your Vaultwarden Tor Address from the "Interfaces" section in your Embassy Vaultwarden page and paste it into the “Self Hosted Environment” → “Server URL” field.
   ⚠ **Add “http://” (_not_ https://) to the frontend of the onion URL.**
   Then click “Save”.

<!-- MD_PACKER_INLINE BEGIN -->

![](./assets/img-4.png)

<!-- MD_PACKER_INLINE END -->

5. Click “Create Account” and fill in the required fields.

⚠ **This _does not_ mean you are creating an account with Bitwarden or any other third party.**
You are creating an account with _yourself_ on your own Embassy.

<!-- MD_PACKER_INLINE BEGIN -->

![](./assets/img-5.png)

<!-- MD_PACKER_INLINE END -->

6. Fill in an email address. This is _only_ used for functions such as 2 Factor Authentication, and it will _only_ be stored on your personal Embassy.
   ⚠ **This is unrelated to any accounts you might have on Bitwarden's premium service.**

7. Fill in a new password for this Bitwarden account. It should be different from your Admin Token.

8. Click “Submit”. You're all set! Now you can log in with your email address and password.

## Admin Portal

This portal enables you to configure environment settings, enable or disable new signups, edit users, edit organizations, and more. To use the admin portal:

1. Copy your `admin token` from "Properties" in your Embassy Vaultwarden.
2. Navigate to your Vaultwarden addres with "/admin" suffixed. e.g. `http://<your_vaultwarden_address>/admin`
3. Authenticate with you admin token copied in step 1.
