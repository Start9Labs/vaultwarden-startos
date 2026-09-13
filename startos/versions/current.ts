import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.37.3:0',
  releaseNotes: {
    en_US: `Updated Vaultwarden to 1.37.3.

- Strengthens account security by revoking remembered two-step login tokens after credential or two-step login changes and rate-limiting pre-login and authentication-request endpoints.
- Supports master-password changes from newer clients and organization-admin two-step login resets.
- Fixes organization imports, iOS registration, item unarchiving, and password changes from newer web vault layouts.
- Adds an admin setting to control account creation through SSO providers.

Upstream release notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3`,
    es_ES: `Vaultwarden actualizado a 1.37.3.

- Refuerza la seguridad de las cuentas al revocar los tokens recordados del inicio de sesión en dos pasos después de cambiar las credenciales o el inicio de sesión en dos pasos, y al limitar la frecuencia de las solicitudes de preinicio de sesión y autenticación.
- Permite cambiar la contraseña maestra desde clientes recientes y restablecer el inicio de sesión en dos pasos por parte de administradores de organizaciones.
- Corrige las importaciones de organizaciones, el registro en iOS, la restauración de elementos archivados y los cambios de contraseña desde diseños recientes de la bóveda web.
- Añade un ajuste de administración para controlar la creación de cuentas mediante proveedores SSO.

Notas de la versión upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3`,
    de_DE: `Vaultwarden auf 1.37.3 aktualisiert.

- Erhöht die Kontosicherheit, indem gespeicherte Zwei-Faktor-Anmeldetokens nach Änderungen an Anmeldedaten oder der Zwei-Faktor-Anmeldung widerrufen und Endpunkte für Voranmeldungen und Authentifizierungsanfragen begrenzt werden.
- Unterstützt Änderungen des Master-Passworts über neuere Clients und das Zurücksetzen der Zwei-Faktor-Anmeldung durch Organisationsadministratoren.
- Behebt Organisationsimporte, die Registrierung unter iOS, das Wiederherstellen archivierter Einträge und Passwortänderungen über neuere Web-Tresor-Oberflächen.
- Fügt eine Administratoreinstellung zur Steuerung der Kontoerstellung über SSO-Anbieter hinzu.

Upstream-Release-Notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3`,
    pl_PL: `Zaktualizowano Vaultwarden do 1.37.3.

- Zwiększa bezpieczeństwo kont, unieważniając zapamiętane tokeny logowania dwuetapowego po zmianie danych logowania lub ustawień logowania dwuetapowego oraz ograniczając częstotliwość żądań wstępnego logowania i uwierzytelniania.
- Umożliwia zmianę hasła głównego w nowszych klientach oraz resetowanie logowania dwuetapowego przez administratorów organizacji.
- Naprawia import organizacji, rejestrację w systemie iOS, przywracanie zarchiwizowanych wpisów oraz zmianę hasła w nowszych układach sejfu internetowego.
- Dodaje ustawienie administracyjne kontrolujące tworzenie kont za pośrednictwem dostawców SSO.

Informacje o wydaniu upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3`,
    fr_FR: `Vaultwarden mis à jour vers 1.37.3.

- Renforce la sécurité des comptes en révoquant les jetons mémorisés de connexion en deux étapes après une modification des identifiants ou de la connexion en deux étapes, et en limitant la fréquence des requêtes de préconnexion et d'authentification.
- Permet de modifier le mot de passe principal depuis les clients récents et aux administrateurs d'organisation de réinitialiser la connexion en deux étapes.
- Corrige les imports d'organisation, l'inscription sous iOS, la restauration d'éléments archivés et les changements de mot de passe depuis les interfaces récentes du coffre web.
- Ajoute un réglage d'administration pour contrôler la création de comptes via les fournisseurs SSO.

Notes de version en amont : https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3`,
  },
  migrations: {},
})
