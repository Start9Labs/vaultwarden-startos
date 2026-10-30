import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.37.4:3',
  releaseNotes: {
    en_US:
      'Internal updates (start-sdk 3.1.1). Added guidance on routing outbound traffic through StartTunnel to keep your home IP private.',
    es_ES:
      'Actualizaciones internas (start-sdk 3.1.1). Se añaden indicaciones para enviar el tráfico saliente a través de StartTunnel y mantener privada la IP de tu hogar.',
    de_DE:
      'Interne Aktualisierungen (start-sdk 3.1.1). Hinweise zum Leiten ausgehenden Datenverkehrs durch StartTunnel ergänzt, um die heimische IP-Adresse privat zu halten.',
    pl_PL:
      'Aktualizacje wewnętrzne (start-sdk 3.1.1). Dodano wskazówki dotyczące kierowania ruchu wychodzącego przez StartTunnel, aby zachować prywatność domowego adresu IP.',
    fr_FR:
      'Mises à jour internes (start-sdk 3.1.1). Ajout de conseils pour acheminer le trafic sortant via StartTunnel afin de préserver la confidentialité de votre adresse IP personnelle.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
