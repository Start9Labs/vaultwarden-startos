import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'vaultwarden',
  title: 'Vaultwarden',
  license: 'mit',
  wrapperRepo: 'https://github.com/Start9Labs/vaultwarden-startos/',
  upstreamRepo: 'https://github.com/dani-garcia/vaultwarden/',
  supportSite: 'https://vaultwarden.discourse.group/',
  marketingSite: 'https://github.com/dani-garcia/vaultwarden/',
  donationUrl: 'https://liberapay.com/dani-garcia/',
  description: {
    short: 'Secure password management',
    long: 'Vaultwarden is a lightweight and secure password manager for storing and auto-filling sensitive information such as usernames and passwords, credit cards, identities, and notes. It is an alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients. All data is stored in an encrypted vault on your server.',
  },
  volumes: ['main'],
  images: {
    vaultwarden: {
      source: {
        dockerTag: 'vaultwarden/server:1.32.7-alpine',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
