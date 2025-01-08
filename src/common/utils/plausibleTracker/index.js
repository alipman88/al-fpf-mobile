import { Dimensions } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { rollbar } from '@fpf/common/utils/rollbar'

// This code is based partly on:
// https://github.com/plausible/plausible-tracker
// https://github.com/plausible/analytics/discussions/1871
//
// We are not using the plausible-tracker npm package because it may be abandoned.

/**
 * @param {string} eventName - required
 * @param {object} data - required
 *    - url {string}: url to be tracked - required (or use path)
 *    - path {string}: url fragment appended to domain
 *    - domain {string}: tracking domain - required
 *    - referrer {string}
 *    - deviceWidth {integer}: width of window in pixels
 *    - props {hash}: additional data to track with the event
 */
async function sendEvent(eventName, data) {
  try {
    const userAgent = await DeviceInfo.getUserAgent()

    // Add a request timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000 /* ms */)

    const payload = {
      n: eventName,
      u: data.path ? `https://${data.domain}/${data.path}` : data.url,
      d: data.domain,
      r: data.referrer,
      w: data.deviceWidth,
      p: data.props ? JSON.stringify(data.props) : undefined,
    }

    await fetch(`${data.apiHost}/api/event`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
  } catch (e) {
    rollbar.error('Plausible sendEvent failed', e, data)
  }
}

/**
 * Plausible tracking API class.
 *
 * Example usage:
 *
 *    const plausible = Plausible({ domain: 'https://foo.com' })
 *    plausible.trackEvent('signup', { url: 'https://foo.com/user' })
 */
export default function Plausible(defaults = {}) {
  function getConfig() {
    return {
      apiHost: 'https://plausible.io',
      deviceWidth: Dimensions.get('window').height,
      domain: '',
      referrer: null,
      ...defaults,
    }
  }

  const trackEvent = async function (eventName, eventData) {
    await sendEvent(eventName, { ...getConfig(), ...eventData })
  }

  const trackPageview = async function (eventData) {
    await this.trackEvent('pageview', eventData)
  }

  return { trackEvent, trackPageview }
}
