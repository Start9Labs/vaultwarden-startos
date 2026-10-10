import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.37.4:0',
  releaseNotes: {
    en_US: `Updated Vaultwarden to 1.37.4. Updating promptly is recommended.

- Fixes seven security advisories, including a high-severity flaw that let revoked organization members retain access to organization items.
- Updates client compatibility and security around two-step login, invitations, attachments, event logs, sharing, and organization API keys.
- If you do not fully trust your organization admins, rotate the organization API key after updating; admins could previously view it.
- Receiving Sends requires a newer Bitwarden CLI than 2026.4.2. Legacy registration and pre-login endpoints are removed.
- If you use additional reverse proxies, include them in IP_HEADER_TRUSTED_PROXIES. Remove obsolete experimental feature flags before saving admin settings.
- Switching from system SMTP to custom SMTP or disabling email now keeps that choice after restart. Removing system SMTP clears its saved credentials instead of continuing to use them.
- Updates StartOS integration for automatic Tor-address reattachment (start-sdk 3.0.4).

[Full upstream release notes](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.4)`,
    es_ES: `Vaultwarden actualizado a 1.37.4. Se recomienda actualizar cuanto antes.

- Corrige siete avisos de seguridad, incluido un fallo de gravedad alta que permitía a miembros revocados conservar el acceso a elementos de la organización.
- Actualiza la compatibilidad con los clientes y la seguridad del inicio de sesión en dos pasos, las invitaciones, los adjuntos, los registros de eventos, el uso compartido y las claves API de organización.
- Si no confías plenamente en los administradores de tu organización, rota la clave API de organización después de actualizar; antes podían verla.
- Para recibir Sends se necesita un cliente CLI de Bitwarden posterior a 2026.4.2. Se eliminan los endpoints antiguos de registro y preinicio de sesión.
- Si usas proxies inversos adicionales, inclúyelos en IP_HEADER_TRUSTED_PROXIES. Elimina las opciones experimentales obsoletas antes de guardar los ajustes de administración.
- Cambiar del SMTP del sistema a un SMTP personalizado o deshabilitar el correo conserva ahora esa elección después de reiniciar. Eliminar el SMTP del sistema borra sus credenciales guardadas en lugar de seguir usándolas.
- Actualiza la integración con StartOS para volver a asociar automáticamente las direcciones Tor (start-sdk 3.0.4).

[Notas completas de la versión upstream](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.4)`,
    de_DE: `Vaultwarden auf 1.37.4 aktualisiert. Eine zeitnahe Aktualisierung wird empfohlen.

- Behebt sieben Sicherheitslücken, darunter eine schwerwiegende Lücke, durch die ausgeschlossene Organisationsmitglieder weiterhin auf Organisationseinträge zugreifen konnten.
- Aktualisiert die Client-Kompatibilität und die Sicherheit bei Zwei-Faktor-Anmeldung, Einladungen, Anhängen, Ereignisprotokollen, Freigaben und Organisations-API-Schlüsseln.
- Falls du deinen Organisationsadministratoren nicht vollständig vertraust, erneuere nach dem Update den Organisations-API-Schlüssel; Administratoren konnten ihn zuvor einsehen.
- Zum Empfangen von Sends ist eine neuere Bitwarden-CLI als 2026.4.2 erforderlich. Alte Registrierungs- und Voranmeldungsendpunkte wurden entfernt.
- Zusätzliche Reverse-Proxys müssen in IP_HEADER_TRUSTED_PROXIES stehen. Entferne veraltete experimentelle Funktionsflags vor dem Speichern der Administratoreinstellungen.
- Der Wechsel von System-SMTP zu eigenem SMTP oder das Deaktivieren von E-Mail bleibt nach einem Neustart bestehen. Wird System-SMTP entfernt, werden seine gespeicherten Zugangsdaten gelöscht statt weiterverwendet.
- Aktualisiert die StartOS-Integration zur automatischen Wiederanbindung von Tor-Adressen (start-sdk 3.0.4).

[Vollständige Upstream-Versionshinweise](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.4)`,
    pl_PL: `Zaktualizowano Vaultwarden do 1.37.4. Zalecana jest niezwłoczna aktualizacja.

- Usuwa siedem luk bezpieczeństwa, w tym lukę o wysokiej istotności, która pozwalała członkom organizacji zachować dostęp do jej wpisów po odebraniu uprawnień.
- Aktualizuje zgodność z klientami oraz zabezpieczenia logowania dwuetapowego, zaproszeń, załączników, dzienników zdarzeń, udostępniania i kluczy API organizacji.
- Jeśli nie ufasz w pełni administratorom organizacji, zmień jej klucz API po aktualizacji; wcześniej administratorzy mogli go zobaczyć.
- Odbieranie Sends wymaga klienta CLI Bitwarden nowszego niż 2026.4.2. Usunięto stare punkty końcowe rejestracji i wstępnego logowania.
- Jeśli używasz dodatkowych odwrotnych serwerów proxy, uwzględnij je w IP_HEADER_TRUSTED_PROXIES. Usuń przestarzałe eksperymentalne flagi funkcji przed zapisaniem ustawień administracyjnych.
- Zmiana systemowego SMTP na własny serwer lub wyłączenie poczty zachowuje teraz ten wybór po ponownym uruchomieniu. Usunięcie systemowego SMTP usuwa zapisane dane logowania zamiast nadal z nich korzystać.
- Aktualizuje integrację z StartOS w celu automatycznego ponownego przypisywania adresów Tor (start-sdk 3.0.4).

[Pełne informacje o wydaniu upstream](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.4)`,
    fr_FR: `Vaultwarden mis à jour vers 1.37.4. Une mise à jour rapide est recommandée.

- Corrige sept failles de sécurité, dont une faille de gravité élevée permettant aux membres révoqués de conserver l'accès aux éléments de leur organisation.
- Actualise la compatibilité des clients et la sécurité de la connexion en deux étapes, des invitations, des pièces jointes, des journaux d'événements, du partage et des clés API d'organisation.
- Si tu ne fais pas entièrement confiance aux administrateurs de ton organisation, renouvelle sa clé API après la mise à jour ; ils pouvaient auparavant la consulter.
- La réception de Sends nécessite un client CLI Bitwarden plus récent que 2026.4.2. Les anciens points d'accès d'inscription et de préconnexion sont supprimés.
- Si tu utilises des proxys inverses supplémentaires, ajoute-les à IP_HEADER_TRUSTED_PROXIES. Supprime les anciens indicateurs de fonctionnalités expérimentales avant d'enregistrer les réglages d'administration.
- Le passage du SMTP système à un SMTP personnalisé ou la désactivation des e-mails conserve désormais ce choix après un redémarrage. La suppression du SMTP système efface ses identifiants enregistrés au lieu de continuer à les utiliser.
- Actualise l'intégration StartOS pour rattacher automatiquement les adresses Tor (start-sdk 3.0.4).

[Notes de version complètes en amont](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.4)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
