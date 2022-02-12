# Usage Instructions

## Choose your platform

A. **Use the Bitwarden browser extension (detailed screen shots below) on:**
- [Firefox](https://docs.start9labs.com/misc-guides/tor-firefox/index.html) (with Socks5 Proxy enabled) - (Mac, Windows, Linux, Android)
- Tor Browser - (Mac, Windows, Linux, Android)

B. **Use the Android Bitwarden native app with [Orbot](https://docs.start9labs.com/misc-guides/tor-os/android.html) running in VPN mode.**
⚠ (for this to work, `Private DNS` must be disabled in your Android settings)

C. **Access your Bitwarden web vault by visiting its Tor Address from any Tor-enabled browser.**


## Connecting to your App or Browser Extention

The instructions below are for Tor Browser on Mac, but you should follow similar steps on other platforms (such as browser extentions).

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

4. Copy your Vaultwarden Tor Address from the Services menu on your Embassy and paste it into the “Self Hosted Environment” → “Server URL” field. 
⚠ **Add “http://” (*not* https://) to the frontend of the onion URL.**
Then click “Save”.

<!-- MD_PACKER_INLINE BEGIN -->
![](./assets/img-4.png)
<!-- MD_PACKER_INLINE END -->

5. Click “Create Account” and fill in the required fields.

⚠ **This *does not* mean you are creating an account with Bitwarden or any other third party.** 
You are creating an account with *yourself* on your own Embassy. 
In fact, your friends and family can also create accounts on your personal Vaultwarden.
It’s awesome!

<!-- MD_PACKER_INLINE BEGIN -->
![](./assets/img-5.png)
<!-- MD_PACKER_INLINE END -->

6. Fill in an email address. This is *only* used for functions such as 2 Factor Authentication, and it will *only* be stored on your personal Embassy.
⚠ **This is unrelated to any accounts you might have on Bitwarden's premium service.** 

7. Fill in a new password for this Bitwarden account. It should be different from your Admin Token.

8. Click “Submit”. You're all set! Now you can log in with your email address and password.

## Important!!

Vaultwarden on the Embassy is a *self-hosted* password manager, which means your passwords physically live on your Embassy. Be sure to create backups and keep them safe. If you lose your Embassy or uninstall Vaultwarden, and you have not made a backup, all your passwords will be lost forever.

## System Administrator Portal

This portal enables you to configure environment settings, edit users, edit organizations and check version information. To use the admin portal: 

1. Copy the admin token from `Properties`
2. Navigate to your Vaultwarden Tor address + `/admin` ie. `http://<your_vaultwarden_tor_address>.onion/admin`
3. Paste the admin token into the input field to login to the admin dashboard. 
