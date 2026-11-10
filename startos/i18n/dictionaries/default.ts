export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting Vaultwarden!': 0,
  'Web Interface': 2,
  'The web interface is ready': 3,
  'The web interface is not ready': 4,
  'Web Vault': 5,
  'Primary user interface for interacting with Vaultwarden in a web browser': 6,
  'Admin Portal': 7,
  'User interface for administrator operations.': 8,
  'Your Admin Token': 13,
  'Save this token to a secure location.': 14,
  'Disable Signups': 15,
  'Enable Signups': 16,
  'Signups are currently enabled. Run this action to prohibit new signups.': 17,
  'Signups are currently disabled. Run this action to permit new signups.': 18,
  'Anyone with your Vaultwarden URL will be able to create an account on your server, which represents a security risk. Be careful!': 19,
  'Configure SMTP': 20,
  'Add SMTP credentials for sending emails.': 21,
  'Primary Domain': 22,
  'Set Primary Domain': 23,
  'Choose the URL Vaultwarden puts in the links and emails it sends': 26,
  'Generate a new token for the Admin Portal, shown once.': 27,
  'Replaces the current admin token. The old token stops working, and the new one is shown only once.': 28,
  'Choose the URL Vaultwarden puts in the links and emails it sends, such as invitations and password resets. Passkeys and security keys used for two-step login are tied to this domain, so after a change they must be registered again.': 29,
  'New accounts can no longer be created. Existing accounts are unaffected, and invitations from the Admin Portal still work.': 30,
  'After creating your first account, you should run the Action to disable signups. As it stands, anyone with your Vaultwarden URL can create an account on your server.': 31,
  'Rotate Admin Token': 32,
  'Enable Admin Portal': 33,
  'Disable Admin Portal': 34,
  'The Admin Portal is on. Run this action to turn it off and delete its token.': 35,
  'The Admin Portal is off. Run this action to turn it on and generate its token, shown once.': 36,
  'The current admin token stops working. While the portal is off, users can be invited only by turning it back on.': 37,
  'The Admin Portal will be reachable at every address the Web Vault is, protected only by its token.': 38,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
