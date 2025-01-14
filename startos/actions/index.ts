import { sdk } from '../sdk'
import { setAdminToken } from './admin-token'
import { setPrimaryDomain } from './set-primary-url'

export const actions = sdk.Actions.of()
  .addAction(setAdminToken)
  .addAction(setPrimaryDomain)
