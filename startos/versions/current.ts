import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { configJson } from '../fileModels/config.json'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { mainHostId } from '../utils'

export const current = VersionInfo.of({
  version: '1.37.3:1',
  releaseNotes: {
    en_US: `Updated Vaultwarden to 1.37.3.

- Strengthens account security by revoking remembered two-step login tokens after credential or two-step login changes and rate-limiting pre-login and authentication-request endpoints.
- Supports master-password changes from newer clients and organization-admin two-step login resets.
- Fixes organization imports, iOS registration, item unarchiving, and password changes from newer web vault layouts.
- Adds an admin setting to control account creation through SSO providers.

Upstream release notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3

- Open UI opens Vaultwarden at its primary domain.
- Update Admin Token and Disable Signups ask for confirmation before running.
- If the primary domain stops being one of Vaultwarden's addresses, Vaultwarden uses its public domain if it has one, otherwise its .local address, until it returns, and a task asks you to choose another. Passkeys and security keys used for two-step login stop working on the other domain until they are registered again there.
- Network ports left reserved by the StartOS 0.3.5 version of this package are freed. If that version had a Tor address, Vaultwarden moves it to the Web Vault, keeping the same .onion address, as soon as a version of Tor that allows it is installed.`,
    es_ES: `Vaultwarden actualizado a 1.37.3.

- Refuerza la seguridad de las cuentas al revocar los tokens recordados del inicio de sesión en dos pasos después de cambiar las credenciales o el inicio de sesión en dos pasos, y al limitar la frecuencia de las solicitudes de preinicio de sesión y autenticación.
- Permite cambiar la contraseña maestra desde clientes recientes y restablecer el inicio de sesión en dos pasos por parte de administradores de organizaciones.
- Corrige las importaciones de organizaciones, el registro en iOS, la restauración de elementos archivados y los cambios de contraseña desde diseños recientes de la bóveda web.
- Añade un ajuste de administración para controlar la creación de cuentas mediante proveedores SSO.

Notas de la versión upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3

- Abrir interfaz abre Vaultwarden en su dominio principal.
- Actualizar token de administrador y Deshabilitar registros piden confirmación antes de ejecutarse.
- Si el dominio principal deja de ser una de las direcciones de Vaultwarden, Vaultwarden usa su dominio público si tiene uno o, si no, su dirección .local, hasta que vuelva, y una tarea le pide elegir otro. Las llaves de acceso y las llaves de seguridad del inicio de sesión en dos pasos dejan de funcionar en el otro dominio hasta que se registren de nuevo allí.
- Se liberan los puertos de red que la versión de este paquete para StartOS 0.3.5 dejó reservados. Si esa versión tenía una dirección Tor, Vaultwarden la traslada a la Bóveda web, conservando la misma dirección .onion, en cuanto se instala una versión de Tor que lo permita.`,
    de_DE: `Vaultwarden auf 1.37.3 aktualisiert.

- Erhöht die Kontosicherheit, indem gespeicherte Zwei-Faktor-Anmeldetokens nach Änderungen an Anmeldedaten oder der Zwei-Faktor-Anmeldung widerrufen und Endpunkte für Voranmeldungen und Authentifizierungsanfragen begrenzt werden.
- Unterstützt Änderungen des Master-Passworts über neuere Clients und das Zurücksetzen der Zwei-Faktor-Anmeldung durch Organisationsadministratoren.
- Behebt Organisationsimporte, die Registrierung unter iOS, das Wiederherstellen archivierter Einträge und Passwortänderungen über neuere Web-Tresor-Oberflächen.
- Fügt eine Administratoreinstellung zur Steuerung der Kontoerstellung über SSO-Anbieter hinzu.

Upstream-Release-Notes: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3

- „Oberfläche öffnen“ öffnet Vaultwarden unter seiner primären Domain.
- „Admin-Token aktualisieren“ und „Registrierungen deaktivieren“ fragen vor der Ausführung nach einer Bestätigung.
- Ist die primäre Domain keine Adresse von Vaultwarden mehr, verwendet Vaultwarden seine öffentliche Domain, falls vorhanden, sonst seine .local-Adresse, bis sie zurückkehrt, und eine Aufgabe fordert Sie auf, eine andere zu wählen. Passkeys und Sicherheitsschlüssel für die Zwei-Faktor-Anmeldung funktionieren auf der anderen Domain erst, wenn sie dort erneut registriert werden.
- Netzwerkports, die die StartOS-0.3.5-Version dieses Pakets belegt gelassen hatte, werden freigegeben. Hatte diese Version eine Tor-Adresse, verlegt Vaultwarden sie auf den Web-Tresor und behält dieselbe .onion-Adresse, sobald eine Tor-Version installiert ist, die das erlaubt.`,
    pl_PL: `Zaktualizowano Vaultwarden do 1.37.3.

- Zwiększa bezpieczeństwo kont, unieważniając zapamiętane tokeny logowania dwuetapowego po zmianie danych logowania lub ustawień logowania dwuetapowego oraz ograniczając częstotliwość żądań wstępnego logowania i uwierzytelniania.
- Umożliwia zmianę hasła głównego w nowszych klientach oraz resetowanie logowania dwuetapowego przez administratorów organizacji.
- Naprawia import organizacji, rejestrację w systemie iOS, przywracanie zarchiwizowanych wpisów oraz zmianę hasła w nowszych układach sejfu internetowego.
- Dodaje ustawienie administracyjne kontrolujące tworzenie kont za pośrednictwem dostawców SSO.

Informacje o wydaniu upstream: https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3

- „Otwórz interfejs” otwiera Vaultwarden pod jego domeną główną.
- „Zaktualizuj token administratora” i „Wyłącz rejestracje” proszą o potwierdzenie przed uruchomieniem.
- Jeśli domena główna przestanie być jednym z adresów Vaultwarden, Vaultwarden używa swojej domeny publicznej, jeśli ją ma, a w przeciwnym razie adresu .local, dopóki nie wróci, a zadanie prosi o wybranie innej. Klucze dostępu i klucze bezpieczeństwa używane do logowania dwuetapowego przestają działać w innej domenie, dopóki nie zostaną tam ponownie zarejestrowane.
- Porty sieciowe, które wersja tego pakietu dla StartOS 0.3.5 pozostawiła zajęte, zostają zwolnione. Jeśli ta wersja miała adres Tor, Vaultwarden przenosi go do sejfu internetowego, zachowując ten sam adres .onion, gdy tylko zostanie zainstalowana wersja Tora, która na to pozwala.`,
    fr_FR: `Vaultwarden mis à jour vers 1.37.3.

- Renforce la sécurité des comptes en révoquant les jetons mémorisés de connexion en deux étapes après une modification des identifiants ou de la connexion en deux étapes, et en limitant la fréquence des requêtes de préconnexion et d'authentification.
- Permet de modifier le mot de passe principal depuis les clients récents et aux administrateurs d'organisation de réinitialiser la connexion en deux étapes.
- Corrige les imports d'organisation, l'inscription sous iOS, la restauration d'éléments archivés et les changements de mot de passe depuis les interfaces récentes du coffre web.
- Ajoute un réglage d'administration pour contrôler la création de comptes via les fournisseurs SSO.

Notes de version en amont : https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3

- Ouvrir l'interface ouvre Vaultwarden sur son domaine principal.
- Mettre à jour le jeton d'administration et Désactiver les inscriptions demandent une confirmation avant de s'exécuter.
- Si le domaine principal n'est plus l'une des adresses de Vaultwarden, Vaultwarden utilise son domaine public s'il en a un, sinon son adresse .local, jusqu'à son retour, et une tâche vous demande d'en choisir un autre. Les clés d'accès et clés de sécurité utilisées pour la connexion en deux étapes cessent de fonctionner sur l'autre domaine jusqu'à ce qu'elles y soient de nouveau enregistrées.
- Les ports réseau que la version de ce paquet pour StartOS 0.3.5 avait laissés réservés sont libérés. Si cette version avait une adresse Tor, Vaultwarden la déplace vers le coffre web, en conservant la même adresse .onion, dès qu'une version de Tor qui le permet est installée.`,
  },
  migrations: {
    up: async ({ effects }) => {
      const domain = await configJson.read((c) => c.domain).once()
      if (domain) await storeJson.merge(effects, { primaryUrl: domain })

      // Tor keeps an .onion on a retired port as unused; reattachTorOnions moves it to 80.
      const main = sdk.MultiHost.of(effects, mainHostId)
      const retired = [await main.retirePort(8080), await main.retirePort(3443)]
      if (retired.some(Boolean)) {
        await storeJson.merge(effects, { reattachTorOnions: true })
      }
    },
    down: IMPOSSIBLE,
  },
})
