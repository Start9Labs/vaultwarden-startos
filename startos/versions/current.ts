import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.37.5:0',
  releaseNotes: {
    en_US: `Updated Vaultwarden to 1.37.5.

- Fixes two medium-severity security issues involving website icons and emergency access. Updating promptly is recommended.
- Updates the web vault to 2026.10.1 and restores compatibility with newer clients for two-step login settings and emergency account takeover.

**Before updating:** review custom numeric and cron settings against the upstream upgrade notes. Several numeric options now reject negative or out-of-range values; rate limits and database timeouts must be positive. An unparseable config file is ignored entirely, including signup restrictions and the admin token; other invalid settings prevent startup. Correct custom values before updating and check startup logs afterwards.

[Full upstream release and upgrade notes](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.5)`,
    es_ES: `Vaultwarden actualizado a 1.37.5.

- Corrige dos problemas de seguridad de gravedad media relacionados con los iconos de sitios web y el acceso de emergencia. Se recomienda actualizar cuanto antes.
- Actualiza la bóveda web a 2026.10.1 y restaura la compatibilidad con clientes recientes para los ajustes del inicio de sesión en dos pasos y la toma de control de cuentas mediante acceso de emergencia.

**Antes de actualizar:** revisa los ajustes numéricos y cron personalizados según las notas de actualización de upstream. Varias opciones numéricas ahora rechazan valores negativos o fuera de rango; los límites de frecuencia y los tiempos de espera de la base de datos deben ser positivos. Un archivo de configuración que no se pueda analizar se ignora por completo, incluidas las restricciones de registro y el token de administrador; otros ajustes inválidos impiden el arranque. Corrige los valores personalizados antes de actualizar y revisa los registros de arranque después.

[Notas completas de la versión y actualización de upstream](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.5)`,
    de_DE: `Vaultwarden auf 1.37.5 aktualisiert.

- Behebt zwei Sicherheitsprobleme mittleren Schweregrads bei Website-Symbolen und beim Notfallzugriff. Eine zeitnahe Aktualisierung wird empfohlen.
- Aktualisiert den Web-Tresor auf 2026.10.1 und stellt die Kompatibilität mit neueren Clients für Zwei-Faktor-Anmeldeeinstellungen und die Kontoübernahme per Notfallzugriff wieder her.

**Vor dem Update:** Prüfen Sie angepasste Zahlenwerte und Cron-Einstellungen anhand der Upstream-Upgrade-Hinweise. Mehrere numerische Optionen lehnen nun negative oder außerhalb des Wertebereichs liegende Werte ab; Ratenlimits und Datenbank-Zeitlimits müssen positiv sein. Eine nicht lesbare Konfigurationsdatei wird vollständig ignoriert, einschließlich Registrierungsbeschränkungen und Admin-Token; andere ungültige Einstellungen verhindern den Start. Korrigieren Sie angepasste Werte vor dem Update und prüfen Sie danach die Startprotokolle.

[Vollständige Upstream-Versions- und Upgrade-Hinweise](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.5)`,
    pl_PL: `Zaktualizowano Vaultwarden do 1.37.5.

- Naprawia dwa problemy bezpieczeństwa o średniej istotności dotyczące ikon witryn i dostępu awaryjnego. Zalecana jest szybka aktualizacja.
- Aktualizuje sejf internetowy do 2026.10.1 i przywraca zgodność z nowszymi klientami dla ustawień logowania dwuetapowego oraz przejmowania kont przez dostęp awaryjny.

**Przed aktualizacją:** sprawdź własne ustawienia liczbowe i cron zgodnie z instrukcjami aktualizacji upstream. Kilka opcji liczbowych odrzuca teraz wartości ujemne lub spoza zakresu; limity częstotliwości i limity czasu bazy danych muszą być dodatnie. Plik konfiguracji, którego nie można odczytać, jest ignorowany w całości, w tym ograniczenia rejestracji i token administratora; inne nieprawidłowe ustawienia uniemożliwiają uruchomienie. Popraw własne wartości przed aktualizacją i sprawdź później dzienniki uruchomienia.

[Pełne informacje o wydaniu i aktualizacji upstream](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.5)`,
    fr_FR: `Vaultwarden mis à jour vers 1.37.5.

- Corrige deux problèmes de sécurité de gravité moyenne concernant les icônes de sites web et l'accès d'urgence. Une mise à jour rapide est recommandée.
- Met à jour le coffre web vers 2026.10.1 et rétablit la compatibilité avec les clients récents pour les paramètres de connexion en deux étapes et la prise de contrôle d'un compte par accès d'urgence.

**Avant la mise à jour :** vérifiez les paramètres numériques et cron personnalisés dans les notes de mise à niveau en amont. Plusieurs options numériques rejettent désormais les valeurs négatives ou hors limites ; les limites de fréquence et les délais de la base de données doivent être positifs. Un fichier de configuration impossible à analyser est entièrement ignoré, y compris les restrictions d'inscription et le jeton d'administration ; d'autres paramètres invalides empêchent le démarrage. Corrigez les valeurs personnalisées avant la mise à jour et vérifiez ensuite les journaux de démarrage.

[Notes complètes de version et de mise à niveau en amont](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.5)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
