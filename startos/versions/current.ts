import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.37.5:2',
  releaseNotes: {
    en_US: `- An admin token carried over from the StartOS 0.3.5 version of this package is stored only as a hash, and keeps working. Backups made before this update hold it in the clear; if one may have been exposed, run **Rotate Admin Token**.
- Disabling signups does not stop invitations: the Admin Portal, and any user through an organization or emergency access, can still invite people, and each invitation lets its recipient create an account. To stop them, turn off Allow invitations in the Admin Portal's General settings. Without SMTP, whoever first registers an invited email address gets that account.
- After **Rotate Admin Token**, an Admin Portal session that is already signed in stays signed in for up to 20 minutes.`,
    es_ES: `- Un token de administrador heredado de la versión de este paquete para StartOS 0.3.5 se guarda solo como hash y sigue funcionando. Las copias de seguridad hechas antes de esta actualización lo contienen en texto claro; si alguna pudo quedar expuesta, ejecute **Rotar token de administrador**.
- Deshabilitar los registros no detiene las invitaciones: el portal de administración, y cualquier usuario mediante una organización o el acceso de emergencia, pueden seguir invitando a personas, y cada invitación permite a su destinatario crear una cuenta. Para impedirlas, desactive Allow invitations en General settings del portal de administración. Sin SMTP, quien registre primero una dirección de correo invitada obtiene esa cuenta.
- Tras **Rotar token de administrador**, una sesión del portal de administración ya iniciada sigue activa hasta 20 minutos.`,
    de_DE: `- Ein aus der StartOS-0.3.5-Version dieses Pakets übernommenes Admin-Token wird nur noch als Hash gespeichert und funktioniert weiterhin. Vor diesem Update erstellte Backups enthalten es im Klartext; falls eines offengelegt worden sein könnte, führen Sie **Admin-Token erneuern** aus.
- Deaktivierte Registrierungen halten Einladungen nicht auf: Das Admin-Portal und jeder Benutzer über eine Organisation oder den Notfallzugriff können weiterhin Personen einladen, und jede Einladung erlaubt ihrem Empfänger, ein Konto zu erstellen. Um sie zu unterbinden, deaktivieren Sie Allow invitations unter General settings im Admin-Portal. Ohne SMTP erhält das Konto, wer eine eingeladene E-Mail-Adresse zuerst registriert.
- Nach **Admin-Token erneuern** bleibt eine bereits angemeldete Sitzung im Admin-Portal bis zu 20 Minuten angemeldet.`,
    pl_PL: `- Token administratora przeniesiony z wersji tego pakietu dla StartOS 0.3.5 jest przechowywany wyłącznie jako skrót i nadal działa. Kopie zapasowe wykonane przed tą aktualizacją zawierają go jawnym tekstem; jeśli któraś mogła zostać ujawniona, uruchom **Zmień token administratora**.
- Wyłączenie rejestracji nie blokuje zaproszeń: portal administratora oraz każdy użytkownik przez organizację lub dostęp awaryjny mogą nadal zapraszać osoby, a każde zaproszenie pozwala odbiorcy założyć konto. Aby je zablokować, wyłącz Allow invitations w sekcji General settings portalu administratora. Bez SMTP konto otrzymuje ten, kto pierwszy zarejestruje zaproszony adres e-mail.
- Po **Zmień token administratora** sesja w portalu administratora, która jest już zalogowana, pozostaje aktywna do 20 minut.`,
    fr_FR: `- Un jeton d'administration repris de la version de ce paquet pour StartOS 0.3.5 n'est plus stocké que sous forme de hachage, et continue de fonctionner. Les sauvegardes faites avant cette mise à jour le contiennent en clair ; si l'une d'elles a pu être exposée, exécutez **Renouveler le jeton d'administration**.
- Désactiver les inscriptions n'arrête pas les invitations : le portail d'administration, et n'importe quel utilisateur via une organisation ou l'accès d'urgence, peuvent toujours inviter des personnes, et chaque invitation permet à son destinataire de créer un compte. Pour les bloquer, désactivez Allow invitations dans les General settings du portail d'administration. Sans SMTP, la première personne qui enregistre une adresse e-mail invitée obtient ce compte.
- Après **Renouveler le jeton d'administration**, une session du portail d'administration déjà ouverte le reste jusqu'à 20 minutes.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
