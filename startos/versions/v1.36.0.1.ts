import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson } from '../fileModels/config.json'

export const v_1_36_0_1 = VersionInfo.of({
  version: '1.36.0:1',
  releaseNotes: {
    en_US: `**Bumps**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.1

**Upstream highlights**

- Security fixes (SSO CSRF, user/organization enumeration, SSO existing-user binding, SSRF via icon endpoint)
- Item archiving support
- Web Vault updated to v2026.4.1

See the [upstream release notes](https://github.com/dani-garcia/vaultwarden/releases/tag/1.36.0) for the full changelog.`,
    es_ES: `**Actualizaciones**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.1

**Aspectos destacados de upstream**

- Correcciones de seguridad (CSRF en SSO, enumeración de usuarios/organizaciones, vinculación SSO de usuario existente, SSRF mediante el endpoint de iconos)
- Soporte para archivar elementos
- Web Vault actualizado a v2026.4.1

Consulte las [notas de la versión upstream](https://github.com/dani-garcia/vaultwarden/releases/tag/1.36.0) para ver el registro de cambios completo.`,
    de_DE: `**Aktualisierungen**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.1

**Wichtigste Änderungen im Upstream**

- Sicherheitskorrekturen (SSO-CSRF, Benutzer-/Organisationsenumeration, SSO-Bindung bestehender Benutzer, SSRF über Icon-Endpunkt)
- Unterstützung für das Archivieren von Einträgen
- Web Vault auf v2026.4.1 aktualisiert

Vollständiges Änderungsprotokoll in den [Upstream-Versionshinweisen](https://github.com/dani-garcia/vaultwarden/releases/tag/1.36.0).`,
    pl_PL: `**Aktualizacje**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.1

**Najważniejsze zmiany w upstream**

- Poprawki bezpieczeństwa (CSRF w SSO, enumeracja użytkowników/organizacji, powiązanie istniejącego użytkownika SSO, SSRF przez punkt końcowy ikon)
- Obsługa archiwizowania elementów
- Web Vault zaktualizowany do v2026.4.1

Pełną listę zmian zobacz w [informacjach o wydaniu upstream](https://github.com/dani-garcia/vaultwarden/releases/tag/1.36.0).`,
    fr_FR: `**Mises à jour**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.1

**Points forts d'amont**

- Correctifs de sécurité (CSRF SSO, énumération d'utilisateurs/organisations, liaison SSO d'un utilisateur existant, SSRF via le point d'accès des icônes)
- Prise en charge de l'archivage des éléments
- Web Vault mis à jour vers v2026.4.1

Voir les [notes de version amont](https://github.com/dani-garcia/vaultwarden/releases/tag/1.36.0) pour le changelog complet.`,
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml: { 'admin-token'?: string } | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await configJson.merge(effects, {
          admin_token: configYaml['admin-token'] || '',
          domain: '',
          smtp_security: 'starttls',
        })

        // remove old start9 dir
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
