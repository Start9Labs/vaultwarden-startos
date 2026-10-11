import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_1_36_0_3 } from './v1.36.0_3'
import { v_1_37_3_1 } from './v1.37.3_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_1_36_0_3, v_1_37_3_1],
})
