import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson } from '../fileModels/config.json'

export const v_1_35_7_1 = VersionInfo.of({
  version: '1.35.7:1',
  releaseNotes: {
    en_US: 'Update Vaultwarden to 1.35.7; fix system SMTP credentials not being applied to Vaultwarden config',
    es_ES: 'Actualización de Vaultwarden a 1.35.7; corrección de las credenciales SMTP del sistema que no se aplicaban a la configuración de Vaultwarden',
    de_DE: 'Aktualisierung von Vaultwarden auf 1.35.7; Behebung des Problems, dass System-SMTP-Anmeldedaten nicht auf die Vaultwarden-Konfiguration angewendet wurden',
    pl_PL: 'Aktualizacja Vaultwarden do 1.35.7; naprawa poświadczeń SMTP systemu, które nie były stosowane do konfiguracji Vaultwarden',
    fr_FR: 'Mise à jour de Vaultwarden vers 1.35.7 ; correction des identifiants SMTP système non appliqués à la configuration de Vaultwarden',
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
