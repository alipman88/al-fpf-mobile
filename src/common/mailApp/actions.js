/**
 * Source from React Native Email Link, altered so we can compose
 */

import { ActionSheetIOS, Linking, Platform } from 'react-native'
import { mailApp } from './slice'

class EmailException {
  constructor(message) {
    this.message = message
    this.name = 'EmailException'
  }
}

const prefixes = {
  'apple-mail': 'message://',
  gmail: 'googlegmail://',
  spark: 'readdle-spark://',
  airmail: 'airmail://',
  outlook: 'ms-outlook://',
}

const titles = {
  'apple-mail': 'Mail',
  gmail: 'Gmail',
  spark: 'Spark',
  airmail: 'Airmail',
  outlook: 'Outlook',
}

function getComposeUrl(app, subject = '', email = '') {
  subject = encodeURIComponent(subject)

  switch (app) {
    case 'gmail':
      return `${prefixes[app]}co?subject=${subject}&to=${email}`
    case 'spark':
      return `${prefixes[app]}compose?subject=${subject}&recipient=${email}`
    case 'airmail':
      return `${prefixes[app]}compose?subject=${subject}&to=${email}`
    case 'outlook':
      return `${prefixes[app]}compose?subject=${subject}&to=${email}`
    default:
      return `mailto:${email}?subject=${subject}`
  }
}

/**
 * Check if a given mail app is installed.
 *
 * @param {string} app
 * @returns {Promise<boolean>}
 */
function isAppInstalled(app, subject, email) {
  return new Promise((resolve) => {
    if (!(app in prefixes)) {
      return resolve(false)
    }

    const url = getComposeUrl(app, subject, email)
    Linking.canOpenURL(url)
      .then((isSupported) => resolve(isSupported))
      .catch(() => resolve(false))
  })
}

/**
 * Ask the user to choose one of the available mail apps.
 * @param title
 * @param message
 * @param cancelLabel
 * @returns {Promise<String|null>}
 */
function askAppChoice(
  title = 'Open mail app',
  message = 'Which app would you like to open?',
  cancelLabel = 'Cancel',
  subject = '',
  email = '',
) {
  return new Promise(async (resolve) => {
    const availableApps = []
    for (let app in prefixes) {
      const avail = await isAppInstalled(app, subject, email)
      if (avail) {
        availableApps.push(app)
      }
    }
    if (availableApps.length === 0) {
      return resolve({ app: null, status: 'unavailable' })
    } else if (availableApps.length === 1) {
      return resolve({ app: availableApps[0], status: 'selected' })
    }

    const options = availableApps.map((app) => titles[app])
    options.push(cancelLabel)

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: title,
        message: message,
        options: options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex === options.length - 1) {
          return resolve({ app: null, status: 'canceled' })
        }
        return resolve({ app: availableApps[buttonIndex], status: 'selected' })
      },
    )

    return
  })
}

/**
 * Parses the given mailto url into an object with keys for the mailto parts, e.g.
 * "mailto:foo@bar.com?subject=Hi" returns:
 *  { email: "foo@bar.com", suject: "Hi" }
 *
 * @param {String} url - mailto url
 * @return {Object | null}
 */
export function parseMailto(url) {
  if (!url) return null

  try {
    const urlObject = new URL(url)
    if (urlObject.protocol !== 'mailto:') {
      return null
    }

    const email = urlObject.pathname
    const params = new URLSearchParams(urlObject.search)
    const subject = params.get('subject')
    const body = params.get('body')

    const parsed = {}
    if (email) parsed.email = email
    if (subject) parsed.subject = subject
    if (body) parsed.body = body

    return parsed
  } catch (e) {
    console.error(`Invalid mailto URL: ${e}`)
    return null
  }
}

/**
 * Compose a message in an email app, or let the user choose what app to open.
 * Choosing an app is currently only supported by iOS.  Other platforms will
 * link to the default mailto handler.
 *
 * @param {{
 *     title: string, // of the alert
 *     message: string, // of the alert
 *     cancelLabel: string,
 *     email: string,
 *     subject: string
 *     mailto: string, // mailto URL to extract email and subject
 * }} options
 */
export const composeEmail =
  (options = {}) =>
  async (dispatch, getState) => {
    if (!options || typeof options !== 'object') {
      throw new EmailException(
        'First parameter of `composeEmail` should contain object with options.',
      )
    }

    if (options.mailto) {
      options = Object.assign(parseMailto(options.mailto), options)
    }

    const { subject, email } = options

    // Get the current preferred app, and double check that it's available
    let app = mailApp.selectors.getPreferredApp(getState())
    if (app) {
      const available = await isAppInstalled(app, subject, email)
      // preferred app is not available, so let's have the user choose again
      if (!available) {
        app = null
      }
    }

    // If there's no current preferred app available and we're on iOS,
    // ask the user which app they prefer
    if (!app && Platform.OS === 'ios') {
      const { title, message, cancelLabel } = options
      let status
      ;({ app, status } = await askAppChoice(
        title,
        message,
        cancelLabel,
        subject,
        email,
      ))

      // User clicked cancel button when asked to select app - take no action
      if (status === 'canceled') {
        return
      }

      // No obvious mail app was available, but perhaps a mailto link will still work
      if (status === 'unavailable') {
        app = `mailto:${email}?subject=${subject}`
      }

      // Use user-selected app to open mailto link
      dispatch(mailApp.actions.setPreferredApp(app))
    }

    return Linking.openURL(getComposeUrl(app, subject, email))
  }
