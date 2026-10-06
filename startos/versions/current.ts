import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { configJson } from '../fileModels/config.json'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { mainHostId } from '../utils'

export const current = VersionInfo.of({
  version: '1.37.3:1',
  releaseNotes: {
    en_US: `- Open UI opens Vaultwarden at its primary domain.
- Update Admin Token and Disable Signups ask for confirmation before running.
- If the primary domain stops being one of Vaultwarden's addresses, Vaultwarden uses its .local address until it returns, and a task asks you to choose another.
- Network ports left reserved by the StartOS 0.3.5 version of this package are freed. If that version had a Tor address, Vaultwarden moves it to the Web Vault, keeping the same .onion address, as soon as a version of Tor that allows it is installed.`,
    es_ES: `- Abrir interfaz abre Vaultwarden en su dominio principal.
- Actualizar token de administrador y Deshabilitar registros piden confirmación antes de ejecutarse.
- Si el dominio principal deja de ser una de las direcciones de Vaultwarden, Vaultwarden usa su dirección .local hasta que vuelva, y una tarea le pide elegir otro.
- Se liberan los puertos de red que la versión de este paquete para StartOS 0.3.5 dejó reservados. Si esa versión tenía una dirección Tor, Vaultwarden la traslada a la Bóveda web, conservando la misma dirección .onion, en cuanto se instala una versión de Tor que lo permita.`,
    de_DE: `- „Oberfläche öffnen“ öffnet Vaultwarden unter seiner primären Domain.
- „Admin-Token aktualisieren“ und „Registrierungen deaktivieren“ fragen vor der Ausführung nach einer Bestätigung.
- Ist die primäre Domain keine Adresse von Vaultwarden mehr, verwendet Vaultwarden seine .local-Adresse, bis sie zurückkehrt, und eine Aufgabe fordert Sie auf, eine andere zu wählen.
- Netzwerkports, die die StartOS-0.3.5-Version dieses Pakets belegt gelassen hatte, werden freigegeben. Hatte diese Version eine Tor-Adresse, verlegt Vaultwarden sie auf den Web-Tresor und behält dieselbe .onion-Adresse, sobald eine Tor-Version installiert ist, die das erlaubt.`,
    pl_PL: `- „Otwórz interfejs” otwiera Vaultwarden pod jego domeną główną.
- „Zaktualizuj token administratora” i „Wyłącz rejestracje” proszą o potwierdzenie przed uruchomieniem.
- Jeśli domena główna przestanie być jednym z adresów Vaultwarden, Vaultwarden używa swojego adresu .local, dopóki nie wróci, a zadanie prosi o wybranie innej.
- Porty sieciowe, które wersja tego pakietu dla StartOS 0.3.5 pozostawiła zajęte, zostają zwolnione. Jeśli ta wersja miała adres Tor, Vaultwarden przenosi go do sejfu internetowego, zachowując ten sam adres .onion, gdy tylko zostanie zainstalowana wersja Tora, która na to pozwala.`,
    fr_FR: `- Ouvrir l'interface ouvre Vaultwarden sur son domaine principal.
- Mettre à jour le jeton d'administration et Désactiver les inscriptions demandent une confirmation avant de s'exécuter.
- Si le domaine principal n'est plus l'une des adresses de Vaultwarden, Vaultwarden utilise son adresse .local jusqu'à son retour, et une tâche vous demande d'en choisir un autre.
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
