/* global process */
import Rollbar from 'rollbar'

const rollbarConfig = {
  accessToken: 'YOUR_POST_CLIENT_ITEM_ACCESS_TOKEN',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV,
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: process.env.REACT_APP_VERSION || '1.0.0',
        guess_uncaught_frames: true,
      },
    },
  },
}

export const rollbar = new Rollbar(rollbarConfig)
export default rollbar
