/**
 * Source from React Native Email Link, altered so we can compose
 */

import { ActionSheetIOS, Linking } from 'react-native'

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
  outlook: 'ms-outlook://'
}

const titles = {
  'apple-mail': 'Mail',
  gmail: 'Gmail',
  spark: 'Spark',
  airmail: 'Airmail',
  outlook: 'Outlook'
}

function getComposeUrl(app, subject, toEmail) {
  switch (app) {
    case 'gmail':
      return `${prefixes[app]}co?subject=${subject}&to=${toEmail}`
    case 'spark':
      return `${prefixes[app]}compose?subject=${subject}&recipient=${toEmail}`
    case 'airmail':
      return `${prefixes[app]}compose?subject=${subject}&to=${toEmail}`
    case 'outlook':
      return `${prefixes[app]}compose?subject=${subject}&to=${toEmail}`
    default:
      return `mailto:${toEmail}?subject=${subject}`
  }
}

/**
 * Check if a given mail app is installed.
 *
 * @param {string} app
 * @returns {Promise<boolean>}
 */
export function isAppInstalled(app, subject, toEmail) {
  return new Promise(resolve => {
    if (!(app in prefixes)) {
      return resolve(false)
    }

    const url = getComposeUrl(app, subject, toEmail)
    Linking.canOpenURL(url)
      .then(isSupported => {
        resolve(isSupported)
      })
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
export function askAppChoice(
  title = 'Open mail app',
  message = 'Which app would you like to open?',
  cancelLabel = 'Cancel',
  subject = '',
  toEmail = ''
) {
  return new Promise(async resolve => {
    let availableApps = []
    for (let app in prefixes) {
      let avail = await isAppInstalled(app)
      if (avail) {
        availableApps.push(app)
      }
    }
    if (availableApps.length < 2) {
      return resolve(availableApps[0] || null)
    }

    let options = availableApps.map(app => titles[app])
    options.push(cancelLabel)

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: title,
        message: message,
        options: options,
        cancelButtonIndex: options.length - 1
      },
      buttonIndex => {
        if (buttonIndex === options.length - 1) {
          return resolve(null)
        }
        return resolve(availableApps[buttonIndex])
      }
    )

    return
  })
}

/**
 * Compose a message in an email app, or let the user choose what app to open.
 *
 * @param {{
 *     app: string | undefined | null,
 *     title: string, // of the alert
 *     message: string, // of the alert
 *     cancelLabel: string,
 *     toEmail: string,
 *     subject: string
 * }} options
 */
export async function chooseMailApp(options = {}) {
  if (!options || typeof options !== 'object') {
    throw new EmailException(
      'First parameter of `chooseMailApp` should contain object with options.'
    )
  }
  if (
    'app' in options &&
    options.app &&
    Object.keys(prefixes).indexOf(options.app) < 0
  ) {
    throw new EmailException(
      'Option `app` should be undefined, null, or one of the following: "' +
        Object.keys(prefixes).join('", "') +
        '".'
    )
  }

  let { app = null } = options

  const { subject, toEmail } = options
  if (!app) {
    const { title, message, cancelLabel } = options
    app = await askAppChoice(title, message, cancelLabel, subject, toEmail)
  }

  let url = null
  switch (app) {
    default:
      url = getComposeUrl(app, subject, toEmail)
  }

  if (url) {
    return Linking.openURL(url)
  }
}
