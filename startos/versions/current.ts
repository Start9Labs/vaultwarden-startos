import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson } from '../fileModels/config.json'

export const current = VersionInfo.of({
  version: '1.36.0:2',
  releaseNotes: {
    en_US: `**Bumps**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Notes**

- Includes upstream security fixes (SSO Login CSRF, user/organization enumeration, SSO existing-user binding, SSRF via icon endpoint). See the upstream 1.36.0 release notes for details.`,
    es_ES: `**Actualizaciones**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Notas**

- Incluye correcciones de seguridad upstream (CSRF en inicio de sesión SSO, enumeración de usuarios/organizaciones, vinculación de usuario existente SSO, SSRF mediante endpoint de iconos). Consulta las notas de la versión 1.36.0 para más detalles.`,
    de_DE: `**Aktualisierungen**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Hinweise**

- Enthält Sicherheitskorrekturen aus dem Upstream (SSO-Login-CSRF, Benutzer-/Organisationsaufzählung, SSO-Bindung an bestehende Benutzer, SSRF über Icon-Endpunkt). Details siehe die Upstream-Release-Notes zu 1.36.0.`,
    pl_PL: `**Aktualizacje**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Uwagi**

- Zawiera poprawki bezpieczeństwa z upstreamu (CSRF logowania SSO, enumeracja użytkowników/organizacji, powiązanie istniejącego użytkownika przez SSO, SSRF przez endpoint ikon). Szczegóły w upstreamowych notatkach do wydania 1.36.0.`,
    fr_FR: `**Mises à jour**

- Vaultwarden → 1.36.0
- start-sdk → 1.5.0

**Notes**

- Inclut des correctifs de sécurité de l'amont (CSRF de connexion SSO, énumération d'utilisateurs/organisations, liaison d'utilisateur existant via SSO, SSRF via le point de terminaison des icônes). Voir les notes de version 1.36.0 amont pour plus de détails.`,
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
