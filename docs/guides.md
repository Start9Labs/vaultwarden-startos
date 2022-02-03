# Vaultwarden Setup Guide and Integrations

Please note that the version of Bitwarden server used on the Embassy is a fork called "Vaultwarden."  Despite this, it still functions with several of the apps/integrations that are built for, and still named after, "Bitwarden."  We apologize for any confusion this may cause.

## Vaultwarden Vault (WebUI)

1. First we will open up our Embassy and go to the Marketplace tab, select Vaultwarden, and install if you have not already done so.

2. After install, click Configure.  A strong admin token has been securely created by your Embassy, but you may change it if you wish.  This can also be changed later.  Click save.  Click start to run the service.

3. Next launch the Vaultwarden web interface. If you are connected to your Embassy on LAN, Vaultwarden will also launch on LAN. If you are connected over Tor, Vaultwarden will lanuch on Tor. What you are looking at now is your very own Vaultwarden website, served right from your Embassy. Let's create an account. Please note, you are creating an account with yourself on your own Vaultwarden website served from your own Vaultwarden server, there are no third parties involved here.  Enter an email for logging in, a strong password that you will remember, and optionally a password hint.  It is important to realize that this is the 'Master password' for all your other passwords.  Make it very strong, memorize it, write it down, and back it up to a safe place. If you lose it, you may lose access to all your passwords and your entire digital life.

Now you can log in to your new password manager!

4. We are greeted with our newly setup Vaultwarden password vault.  At the top you can visit 'Tools' for reports, a password generator, and to import data from another program, such as lastpass, onepass, or keepass.  'Settings' gives you all your options, including the ability to set up 2 factor authorization.

5. Back at the main page for your vault, let’s do a quick example login.  We can setup a new folder here and save new login.  For our example, we’re going to use our FileBrowser instance.  So click ‘Add item,’  then we’ll fill in some test information.  A name for the entry, a username, password, and the website we want to log in to.  Then click ‘Save.’

## Bitwarden Browser Extension

The Bitwarden browser extension will only work with Tor Borwser or Firefox browser, since those are the only two browsers capable of using Tor, or in other words, access .onion URLs. Brave Browser can also access .onion URLs, but only in special tabs, not in extension, so the Bitwarden extension will not work.

1. If you choose Tor Browser, everything will just work right out of the box. If you choose Firefox, you will need to configure both your computer and Firefox to enable Tor. We have guides available for multiple platforms and devices. Please see the documentation links in the description below.

2. In this example we will use Firefox.  First, install the browser extension, the link for this is in the resources section below.  Once installed, click on the extension and click 'Settings' in the top left.  Under 'Self-hosted environment,' you will see a field for 'Server URL,'. Here, we need to paste in our Vaultwarden Tor address. Go to your Embassy and copy you Vaultwarden Tor address, then return to the Bitwarden extension and paste it in, prefixed by "http://". Please note, you must paste in http, not https. Click 'Save.'

3. Now you can click on the extension again, click ‘Log In,’ and enter your credentials.  That’s it, the extension is all set up!

## Mobile App

### Android

You will need the Orbot app installed and running.  If you haven’t done this, you can see our video or docs on it, the links for which are in the resources section below.

1. Visit your app store of choice and download the Bitwarden app.  Once downloaded and installed, let’s go into Orbot, and add the app to the VPN apps list.  You may need to hit the refresh button in the top left to get it to populate.

2. Next, enter the Bitwarden app.  You’ll be greeted with a log-in screen, and just like in the extension, you can go to the top left gear icon to enter the Settings.  You'll need to enter your LAN address from your Embassy, so you can copy-paste it over to your phone, or type it in by hand.  Don’t forget to ensure the prefix is http:// and NOT https.  Hit save, and you’ll be returned to the log-in screen.

3. Go ahead and tap ‘Log In,’ enter your credentials, and you can access your Bitwarden app / Vaultwarden server.

### iOS

Unfortunately, the iOS app does not support Tor, so currently the Bitwarden app can only be synced on LAN.  Once synced, your app and passwords will be cached and available when you are on the go, and you will only need to be on LAN to update any edits to your vault.

1. Visit your app store and download the Bitwarden app.

2. Next, enter the Bitwarden app.  You’ll be greeted with a log-in screen, and just like in the extension, you can go to the top left gear icon to enter the Settings.  You'll need to enter your LAN address from your Embassy, so you can copy-paste it over to your phone, or type it in by hand.  Don’t forget to ensure the prefix is https://.  Hit save, and you’ll be returned to the log-in screen.

3. Go ahead and tap ‘Log In,’ enter your credentials, and you can access your Bitwarden app / Vaultwarden server.

## Desktop App

The desktop app is a bit more finicky, and arguably much less useful than the mobile and browser solutions, but below are the known good (tested) configurations if you'd like to use it.

### Linux

First, be sure to be running Tor natively.  There is a guide for this below.

1. Download the application from the website below.  Depending on your Linux distribution, you may want the AppImage, Deb, Snap, etc.

2. Run the program with the flag ` --proxy-server=socks5://127.0.0.1:9050` behind it.  You can run this from a terminal, and if you'd like to use a shortcut, edit that shortcut file to include the flag.

3. As with the other solutions above, click the 'Settings' icon, and enter your Vaultwarden Tor address.  You can then log in to your vault.

Alternatively, you may be able to run using your LAN address, but this has proven finicky, especially on Debian/Ubuntu systems.  You will have better luck if you have the Root CA installed at the OS level.

### Mac

1. Download the application from the website below.

2. LAN
    - For LAN access, follow the LAN setup in the instructions below.  After completing setup, simply open Bitwarden and add your LAN address in the 'Settings' and login.

3. Tor
    -For Tor access, follow the Tor setup in the instructions below.  Run the program with the flag ` --proxy-server=socks5://127.0.0.1:9050` behind it.  You can run this from a terminal, and if you'd like to use a shortcut, edit that shortcut file to include the flag.

4. You can now log in to your vault.

### Windows

1. Download the application from the website below.

2. Follow the Tor setup in the instructions below.  Make sure the Bitwarden directory is located in your user's directory (C:\Users\YOURUSER\AppData\Local\Bitwarden).  This is because you need permission to run over a proxy.  You can make a shortcut wherever you'd like.

3. Right-click the shortcut and click 'Properties.'  Add the flag ` --proxy-server=socks5://127.0.0.1:9050` to the end of the 'Target' field.  Click 'Apply,' then 'OK.'  Close Properties and launch the shortcut.

4. As with the other solutions above, click the 'Settings' icon, and enter your Vaultwarden Tor address.  You can then log in to your vault.

## Resources

### Bitwarden Firefox extension
https://addons.mozilla.org/en-US/firefox/addon/bitwarden-password-manager/

### Running Tor on your Devices
https://start9.com/latest/support/user-manual/configuration/tor-setup/tor-os/

### Setup LAN on your Devices
https://start9.com/latest/support/user-manual/configuration/lan-setup/lan-os/

### Configuring Firefox for Tor
https://start9.com/latest/support/user-manual/configuration/tor-setup/tor-firefox

### Running Tor on Android Video
https://www.youtube.com/watch?v=b__mVfN-BP8

### Bitwarden Desktop app
https://bitwarden.com/download/
