import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.37.2:0',
  releaseNotes: {
    en_US: `Updated Vaultwarden to 1.37.2.

- Required for Bitwarden clients on version 2026.8.0 or newer. Update before reporting problems with a recent client.
- Updates the web vault to 2026.7.0.
- Fixes updating the collections an item belongs to, and the event log for a single user.
- Records the user's email address in successful login log entries.

Upstream release notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.2`,
    es_ES: `Vaultwarden actualizado a 1.37.2.

- Necesario para los clientes de Bitwarden en la versión 2026.8.0 o posterior. Actualiza antes de informar de problemas con un cliente reciente.
- Actualiza la bóveda web a la versión 2026.7.0.
- Corrige la actualización de las colecciones a las que pertenece un elemento y el registro de eventos de un usuario concreto.
- Registra la dirección de correo del usuario en las entradas de registro de inicios de sesión correctos.

Notas de la versión upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.2`,
    de_DE: `Vaultwarden auf 1.37.2 aktualisiert.

- Erforderlich für Bitwarden-Clients ab Version 2026.8.0. Aktualisiere, bevor du Probleme mit einem aktuellen Client meldest.
- Aktualisiert den Web-Tresor auf 2026.7.0.
- Behebt das Aktualisieren der Sammlungen, zu denen ein Eintrag gehört, sowie das Ereignisprotokoll für einen einzelnen Benutzer.
- Erfasst die E-Mail-Adresse des Benutzers in den Protokolleinträgen erfolgreicher Anmeldungen.

Upstream-Release-Notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.2`,
    pl_PL: `Zaktualizowano Vaultwarden do 1.37.2.

- Wymagane dla klientów Bitwarden w wersji 2026.8.0 lub nowszej. Zaktualizuj przed zgłoszeniem problemów z nowym klientem.
- Aktualizuje sejf internetowy do wersji 2026.7.0.
- Naprawia aktualizowanie kolekcji, do których należy wpis, oraz dziennik zdarzeń pojedynczego użytkownika.
- Zapisuje adres e-mail użytkownika we wpisach dziennika udanych logowań.

Informacje o wydaniu upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.2`,
    fr_FR: `Vaultwarden mis à jour vers 1.37.2.

- Nécessaire pour les clients Bitwarden en version 2026.8.0 ou ultérieure. Mettez à jour avant de signaler des problèmes avec un client récent.
- Met à jour le coffre web vers 2026.7.0.
- Corrige la mise à jour des collections auxquelles appartient un élément, ainsi que le journal d'événements d'un utilisateur donné.
- Enregistre l'adresse e-mail de l'utilisateur dans les entrées de journal des connexions réussies.

Notes de version en amont : https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.2`,
  },
  migrations: {},
})
