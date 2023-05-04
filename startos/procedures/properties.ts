import { setupProperties } from '@start9labs/start-sdk/lib/properties'
import { WrapperData } from '../wrapperData'
import { PropertyString } from '@start9labs/start-sdk/lib/properties/PropertyString'
import { PropertyGroup } from '@start9labs/start-sdk/lib/properties/PropertyGroup'

/**
 * With access to WrapperData, in this function you determine what to include in the Properties section of the UI
 */
export const properties = setupProperties<WrapperData>(
  async ({ wrapperData }) => {
    const adminToken = wrapperData.config.adminToken
    return [
      PropertyGroup.of({
        header: null,
        values: [
          PropertyString.of({
            // The display label of the property
            name: 'Admin Token',
            // A human-readable description of the property
            description:
              'Authentication token for logging into your admin dashboard.',
            // The value of the property
            value: adminToken,
            // optionally display a copy button with the property
            copyable: true,
            // optionally permit displaying the property as a QR code
            qr: false,
            // optionally mask the value of the property
            masked: false,
          }),
        ],
      }),
    ]
  },
)
