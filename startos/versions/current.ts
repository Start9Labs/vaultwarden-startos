import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.37.0:1',
  releaseNotes: {
    en_US: `**Required update for Bitwarden clients 2026.7.0 and later.** The 2026.7.0 Bitwarden clients (browser extension, desktop, and mobile) changed what they expect from the server API. Against Vaultwarden 1.36.0 they log in successfully but the vault never loads — the item list sits on grey placeholders indefinitely. Vaultwarden 1.37.0 restores compatibility.

**After updating, force a sync in each client**, or log out and back in. A client that last synced against 1.36.0 keeps showing an empty vault until it re-syncs.

**Security fixes.** 1.37.0 resolves eight upstream advisories, all rated Medium: SSRF via the icon endpoint, cross-organization cipher access, cross-organization secret sharing, organization policy bypass on directory import, organization import authorization, organization data enumeration via the Manager role, Send access-count bypass, and unauthenticated WebSocket flooding. Updating promptly is recommended.

Upstream release notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.0`,
    es_ES: `**Actualización obligatoria para los clientes de Bitwarden 2026.7.0 y posteriores.** Los clientes de Bitwarden 2026.7.0 (extensión de navegador, escritorio y móvil) cambiaron lo que esperan de la API del servidor. Con Vaultwarden 1.36.0 inician sesión correctamente pero la caja fuerte nunca carga: la lista de elementos se queda indefinidamente en marcadores de posición grises. Vaultwarden 1.37.0 restaura la compatibilidad.

**Después de actualizar, fuerza una sincronización en cada cliente**, o cierra la sesión y vuelve a iniciarla. Un cliente cuya última sincronización fue contra 1.36.0 seguirá mostrando una caja fuerte vacía hasta que vuelva a sincronizar.

**Correcciones de seguridad.** 1.37.0 resuelve ocho avisos de seguridad upstream, todos de gravedad Media: SSRF mediante el endpoint de iconos, acceso a credenciales entre organizaciones, uso compartido de secretos entre organizaciones, elusión de políticas de organización en la importación de directorios, autorización en la importación de organizaciones, enumeración de datos de la organización mediante el rol Manager, elusión del límite de accesos en Send y saturación de WebSocket sin autenticar. Se recomienda actualizar cuanto antes.

Notas de la versión upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.0`,
    de_DE: `**Erforderliches Update für Bitwarden-Clients ab 2026.7.0.** Die Bitwarden-Clients der Version 2026.7.0 (Browser-Erweiterung, Desktop und Mobil) haben ihre Erwartungen an die Server-API geändert. Mit Vaultwarden 1.36.0 melden sie sich erfolgreich an, der Tresor lädt jedoch nie – die Eintragsliste bleibt dauerhaft bei grauen Platzhaltern. Vaultwarden 1.37.0 stellt die Kompatibilität wieder her.

**Erzwinge nach dem Update in jedem Client eine Synchronisierung**, oder melde dich ab und wieder an. Ein Client, der zuletzt mit 1.36.0 synchronisiert hat, zeigt weiterhin einen leeren Tresor, bis er neu synchronisiert.

**Sicherheitskorrekturen.** 1.37.0 behebt acht Upstream-Advisories, alle mit Schweregrad Mittel: SSRF über den Icon-Endpunkt, organisationsübergreifender Zugriff auf Einträge, organisationsübergreifende Weitergabe von Secrets, Umgehung von Organisationsrichtlinien beim Verzeichnisimport, Autorisierung beim Organisationsimport, Enumeration von Organisationsdaten über die Manager-Rolle, Umgehung des Zugriffszählers bei Send und unauthentifiziertes WebSocket-Flooding. Ein zeitnahes Update wird empfohlen.

Upstream-Release-Notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.0`,
    pl_PL: `**Wymagana aktualizacja dla klientów Bitwarden 2026.7.0 i nowszych.** Klienci Bitwarden w wersji 2026.7.0 (rozszerzenie przeglądarki, aplikacja desktopowa i mobilna) zmienili swoje oczekiwania wobec API serwera. Na Vaultwarden 1.36.0 logowanie się udaje, ale sejf nigdy się nie ładuje — lista wpisów pozostaje bezterminowo na szarych symbolach zastępczych. Vaultwarden 1.37.0 przywraca zgodność.

**Po aktualizacji wymuś synchronizację w każdym kliencie** lub wyloguj się i zaloguj ponownie. Klient, który ostatnio synchronizował się z wersją 1.36.0, będzie pokazywał pusty sejf do momentu ponownej synchronizacji.

**Poprawki bezpieczeństwa.** 1.37.0 usuwa osiem zgłoszeń bezpieczeństwa upstream, wszystkie o istotności Średniej: SSRF przez endpoint ikon, dostęp do wpisów między organizacjami, udostępnianie sekretów między organizacjami, obejście zasad organizacji przy imporcie katalogu, autoryzacja przy imporcie organizacji, enumeracja danych organizacji przez rolę Manager, obejście licznika dostępu w Send oraz nieuwierzytelnione zalewanie WebSocket. Zalecana jest niezwłoczna aktualizacja.

Informacje o wydaniu upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.0`,
    fr_FR: `**Mise à jour obligatoire pour les clients Bitwarden 2026.7.0 et ultérieurs.** Les clients Bitwarden 2026.7.0 (extension de navigateur, ordinateur et mobile) ont modifié ce qu'ils attendent de l'API du serveur. Avec Vaultwarden 1.36.0, la connexion réussit mais le coffre ne se charge jamais : la liste des éléments reste indéfiniment sur des espaces réservés gris. Vaultwarden 1.37.0 rétablit la compatibilité.

**Après la mise à jour, forcez une synchronisation dans chaque client**, ou déconnectez-vous puis reconnectez-vous. Un client dont la dernière synchronisation s'est faite avec 1.36.0 continuera d'afficher un coffre vide jusqu'à ce qu'il se resynchronise.

**Corrections de sécurité.** 1.37.0 corrige huit avis de sécurité en amont, tous de gravité Moyenne : SSRF via le point de terminaison des icônes, accès aux éléments entre organisations, partage de secrets entre organisations, contournement des politiques d'organisation lors de l'import d'annuaire, autorisation lors de l'import d'organisation, énumération des données d'organisation via le rôle Manager, contournement du compteur d'accès des Send et saturation WebSocket non authentifiée. Une mise à jour rapide est recommandée.

Notes de version en amont : https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.0`,
  },
  migrations: {},
})
