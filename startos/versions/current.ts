import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.37.1:0',
  releaseNotes: {
    en_US: `Updated Vaultwarden to 1.37.1.

- Fixes organization invitations, which were broken in 1.37.0. If you applied a workaround for this locally, revert it now.
- Rebuilds the Alpine image with a corrected OpenSSL build, fixing a startup crash on installs that connect to a MySQL/MariaDB database over TLS.

Upstream release notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.1`,
    es_ES: `Vaultwarden actualizado a 1.37.1.

- Corrige las invitaciones de organización, que no funcionaban en 1.37.0. Si aplicaste alguna solución alternativa localmente, deshazla ahora.
- Reconstruye la imagen de Alpine con una compilación corregida de OpenSSL, lo que soluciona un fallo de arranque en instalaciones que se conectan a una base de datos MySQL/MariaDB mediante TLS.

Notas de la versión upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.1`,
    de_DE: `Vaultwarden auf 1.37.1 aktualisiert.

- Behebt Organisationseinladungen, die in 1.37.0 defekt waren. Falls du lokal einen Workaround dafür eingesetzt hast, mache ihn jetzt rückgängig.
- Erstellt das Alpine-Image mit einem korrigierten OpenSSL-Build neu und behebt damit einen Startabsturz bei Installationen, die sich per TLS mit einer MySQL-/MariaDB-Datenbank verbinden.

Upstream-Release-Notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.1`,
    pl_PL: `Zaktualizowano Vaultwarden do 1.37.1.

- Naprawia zaproszenia do organizacji, które nie działały w wersji 1.37.0. Jeśli zastosowano lokalnie obejście tego problemu, należy je teraz cofnąć.
- Przebudowuje obraz Alpine z poprawioną kompilacją OpenSSL, co usuwa awarię uruchamiania w instalacjach łączących się z bazą danych MySQL/MariaDB przez TLS.

Informacje o wydaniu upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.1`,
    fr_FR: `Vaultwarden mis à jour vers 1.37.1.

- Corrige les invitations d'organisation, qui étaient cassées en 1.37.0. Si vous avez appliqué un contournement localement, annulez-le maintenant.
- Reconstruit l'image Alpine avec une compilation OpenSSL corrigée, ce qui résout un plantage au démarrage sur les installations qui se connectent à une base de données MySQL/MariaDB via TLS.

Notes de version en amont : https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.1`,
  },
  migrations: {},
})
