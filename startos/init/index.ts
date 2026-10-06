import { sdk } from '../sdk'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { seedFiles } from './seedFiles'
import { taskToggleSignups } from './taskToggleSignups'
import { setup } from './setup'
import { primaryUrlTask } from './primaryUrlTask'
import { reattachTorOnions } from './reattachTorOnions'
import { watchSystemSmtp } from './watchSystemSmtp'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  actions,
  primaryUrlTask,
  dependencies,
  taskToggleSignups,
  setup,
  watchSystemSmtp,
  reattachTorOnions,
)

export const uninit = sdk.setupUninit(versionGraph)
