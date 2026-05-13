import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson } from '../fileModels/config.json'

export const v_1_36_0_1 = VersionInfo.of({
  version: '1.36.0:1',
  releaseNotes: {
    en_US: `**Bumps**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Notes**

- Upstream 1.36.0 contains multiple security fixes (SSO Login CSRF, user/organization enumeration, SSO existing-user binding, SSRF via icon endpoint). Updating is strongly recommended.
- Upstream adds support for archiving items and bundles web vault v2026.4.1.`,
    es_ES: `**Cambios**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Notas**

- La versión 1.36.0 incluye varias correcciones de seguridad (CSRF en inicio de sesión SSO, enumeración de usuarios/organizaciones, vinculación SSO de usuarios existentes, SSRF en el endpoint de iconos). Se recomienda encarecidamente actualizar.
- Se añade compatibilidad con el archivado de elementos y se incluye la web vault v2026.4.1.`,
    de_DE: `**Aktualisierungen**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Hinweise**

- Upstream 1.36.0 enthält mehrere Sicherheitskorrekturen (SSO-Login-CSRF, Benutzer-/Organisationsaufzählung, SSO-Bindung bestehender Benutzer, SSRF über den Icon-Endpunkt). Eine Aktualisierung wird dringend empfohlen.
- Upstream ergänzt die Archivierung von Einträgen und enthält den Web Vault v2026.4.1.`,
    pl_PL: `**Aktualizacje**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Uwagi**

- Wersja upstream 1.36.0 zawiera kilka poprawek bezpieczeństwa (CSRF logowania SSO, wyliczanie użytkowników/organizacji, powiązanie SSO istniejącego użytkownika, SSRF przez endpoint ikon). Zaleca się natychmiastową aktualizację.
- Dodano obsługę archiwizacji elementów oraz dołączono web vault v2026.4.1.`,
    fr_FR: `**Mises à jour**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Notes**

- La version 1.36.0 d'upstream contient plusieurs correctifs de sécurité (CSRF de connexion SSO, énumération des utilisateurs/organisations, liaison SSO d'utilisateurs existants, SSRF via l'endpoint d'icônes). La mise à jour est fortement recommandée.
- L'archivage des éléments est ajouté et le web vault v2026.4.1 est inclus.`,
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
