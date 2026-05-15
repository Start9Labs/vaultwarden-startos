import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson } from '../fileModels/config.json'

export const v_1_36_0 = VersionInfo.of({
  version: '1.36.0:1',
  releaseNotes: {
    en_US: `**Bumps**

- Vaultwarden → 1.36.0 (security fixes: SSO Login CSRF, user/org enumeration, SSRF via icon endpoint, SSO existing-user binding — see upstream advisories)
- start-sdk → 1.5.1

**Features**

- Item archiving support (upstream)
- Web Vault updated to v2026.4.1 (upstream)`,
    es_ES: `**Actualizaciones**

- Vaultwarden → 1.36.0 (correcciones de seguridad: CSRF de inicio de sesión SSO, enumeración de usuarios/organizaciones, SSRF mediante el punto final de iconos, vinculación de usuario existente SSO — véanse los avisos upstream)
- start-sdk → 1.5.1

**Funciones**

- Compatibilidad con el archivado de elementos (upstream)
- Web Vault actualizado a v2026.4.1 (upstream)`,
    de_DE: `**Aktualisierungen**

- Vaultwarden → 1.36.0 (Sicherheitskorrekturen: SSO-Login-CSRF, Benutzer-/Organisationsaufzählung, SSRF über Icon-Endpoint, SSO-Bindung an bestehende Benutzer — siehe Upstream-Hinweise)
- start-sdk → 1.5.1

**Funktionen**

- Unterstützung für die Archivierung von Einträgen (Upstream)
- Web Vault auf v2026.4.1 aktualisiert (Upstream)`,
    pl_PL: `**Aktualizacje**

- Vaultwarden → 1.36.0 (poprawki bezpieczeństwa: CSRF logowania SSO, enumeracja użytkowników/organizacji, SSRF przez punkt końcowy ikon, powiązanie istniejącego użytkownika SSO — zobacz informacje upstream)
- start-sdk → 1.5.1

**Funkcje**

- Obsługa archiwizacji elementów (upstream)
- Web Vault zaktualizowany do v2026.4.1 (upstream)`,
    fr_FR: `**Mises à jour**

- Vaultwarden → 1.36.0 (corrections de sécurité : CSRF de connexion SSO, énumération des utilisateurs/organisations, SSRF via le point d'accès des icônes, liaison d'utilisateur existant SSO — voir les avis upstream)
- start-sdk → 1.5.1

**Fonctionnalités**

- Prise en charge de l'archivage des éléments (upstream)
- Web Vault mis à jour vers v2026.4.1 (upstream)`,
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
