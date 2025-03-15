import { sdk } from '../sdk'
import { setAdminToken } from './admin-token'
import { manageSmtp } from './manage-smtp'
import { setPrimaryDomain } from './set-primary-url'

export const actions = sdk.Actions.of()
  .addAction(setAdminToken)
  .addAction(setPrimaryDomain)
  .addAction(manageSmtp)
