# Bitwarden Android Client

Using the Android client it is possible to replace the default Google password management with your own self-hosted one that Bitwarden will connect to. This allows you to save passwords and passkeys for Android apps as well as websites.


1. Download the Bitwarden app [Google Play](https://play.google.com/store/apps/details?id=com.x8bit.bitwarden) | [Github](https://github.com/bitwarden/android/releases) | [zap.store](https://zapstore.dev/apps/naddr1qvzqqqr7pvpzq7xwd748yfjrsu5yuerm56fcn9tntmyv04w95etn0e23xrczvvraqqfkxmmd9eurscnfwshxy6t5washyer9dcshhuyg)

1. Head to the **Interfaces** section in the Vaultwarden service on your Start9 Server and indentity the type of interface you'd like to use.

1. Copy the preferred interface address.

1. Open the Bitwarden app. Tap the **self-hosted** dropdown menu and choose **self-hosted**. Paste your interface address to **Server URL** field and tap save.

   **Note:** For **Tor**, before you hit save: If the Tor address you have copied begin with **http** - Please change this to **https** instead of **http**

1. Tap 'Log In,' enter your credentials, and you can access your Bitwarden app / Vaultwarden server.

1. For the final step, you may need to search online for instructions specific to your flavor of Android. Typically on your Android device you can go to Settings and search for "Passwords" or "auto-fill". Turn _off_ Google, turn _on_ Bitwarden and/or set the autofill service to Bitwarden.