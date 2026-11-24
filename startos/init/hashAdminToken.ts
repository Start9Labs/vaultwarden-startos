import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'
import { hashToken } from '../utils'

export const hashAdminToken = sdk.setupOnInit(async (effects) => {
  const token = (await configJson.read((c) => c.admin_token).once())?.trim()

  if (token && !token.startsWith('$argon2')) {
    await configJson.merge(effects, {
      admin_token: await hashToken(effects, token),
    })
  }
})
