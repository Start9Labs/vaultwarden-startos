import { setupManifest } from '@start9labs/start-sdk/lib/manifest/setupManifest'

/**
 * In this function you define static properties of the service
 */
export const manifest = setupManifest({
  id: 'vaultwarden',
  title: 'Vaultwarden',
  version: '1.28.1.0',
  releaseNotes:
    '* Using gzip \n * Allow tls/https over onion \n * Set the password iterations to 2_000_000',
  license: 'GPL-3.0',
  wrapperRepo: 'https://github.com/Start9Labs/vaultwarden-wrapper',
  upstreamRepo: 'https://github.com/dani-garcia/vaultwarden',
  supportSite: 'https://vaultwarden.discourse.group/',
  marketingSite: 'https://github.com/dani-garcia/vaultwarden/',
  donationUrl: 'https://www.paypal.com/paypalme/DaniGG',
  description: {
    short: 'Secure password management',
    long: 'Vaultwarden is a lightweight and secure password manager for storing and auto-filling sensitive information such as usernames and passwords, credit cards, identities, and notes. It is an alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients. All data is stored in an encrypted vault on your Embassy.\n',
  },
  assets: {
    license: 'LICENSE',
    icon: 'icon.png',
    instructions: 'instructions.md',
  },
  dependencies: {},

  /// Changed
  volumes: {
    main: 'data',
  },
  containers: {
    main: {
      // Identifier for the main image volume, which will be used when other actions need to mount to this volume.
      image: 'main',
      // Specifies where to mount the data volume(s), if there are any. Mounts for pointer dependency volumes are also denoted here. These are necessary if data needs to be read from / written to these volumes.
      mounts: {
        // Specifies where on the service's file system its persistence directory should be mounted prior to service startup
        main: '/data',
      },
    },
  },
  alerts: {
    install: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
    update: null,
  },
  replaces: [],
})

export type Manifest = typeof manifest
