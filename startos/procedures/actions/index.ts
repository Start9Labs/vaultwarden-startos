import { sdk } from '../../sdk'
import { changeToken } from './changeToken'

/**
 * Add each new Action as the next argument to this function
 */
export const { actions, actionsMetadata } = sdk.setupActions(changeToken)
