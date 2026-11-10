import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '1.37.5:1',
  releaseNotes: {
    en_US: `The Admin Portal can now be turned off. **Enable Admin Portal** turns it on and generates its token; **Disable Admin Portal** turns it off and deletes the token, and **Rotate Admin Token** replaces the token while the portal is on. The portal is off on new installs, and stays on if you have already created a token.`,
    es_ES: `Ahora se puede desactivar el portal de administración. **Habilitar portal de administración** lo activa y genera su token; **Deshabilitar portal de administración** lo desactiva y elimina el token, y **Rotar token de administrador** reemplaza el token mientras el portal está activado. El portal está desactivado en las instalaciones nuevas y sigue activado si ya creó un token.`,
    de_DE: `Das Admin-Portal lässt sich jetzt deaktivieren. **Admin-Portal aktivieren** schaltet es ein und erzeugt sein Token; **Admin-Portal deaktivieren** schaltet es aus und löscht das Token, und **Admin-Token erneuern** ersetzt das Token, solange das Portal aktiviert ist. Bei Neuinstallationen ist das Portal deaktiviert; wenn Sie bereits ein Token erstellt haben, bleibt es aktiviert.`,
    pl_PL: `Portal administratora można teraz wyłączyć. **Włącz portal administratora** włącza go i generuje jego token; **Wyłącz portal administratora** wyłącza go i usuwa token, a **Zmień token administratora** zastępuje token, gdy portal jest włączony. W nowych instalacjach portal jest wyłączony, a jeśli token został już utworzony, pozostaje włączony.`,
    fr_FR: `Le portail d'administration peut désormais être désactivé. **Activer le portail d'administration** l'active et génère son jeton ; **Désactiver le portail d'administration** le désactive et supprime le jeton, et **Renouveler le jeton d'administration** remplace le jeton tant que le portail est activé. Le portail est désactivé sur les nouvelles installations et reste activé si vous avez déjà créé un jeton.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.action.clearTask(effects, 'vaultwarden:set-admin-token')
    },
    down: IMPOSSIBLE,
  },
})
