/**
 * Source from React Native Email Link, altered so we can compose
 */

import { ActionSheetIOS, Linking } from 'react-native'
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
function isAppInstalled(app, subject, toEmail) {
  return new Promise(resolve => {
    if (!(app in prefixes)) {
      console.log(app, 'not in', prefixes)
      return resolve(false)
    }

    const url = getComposeUrl(app, subject, toEmail)
    Linking.canOpenURL(url)
      .then(isSupported => resolve(isSupported))
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
  toEmail = ''
) {
  return new Promise(async resolve => {
    const availableApps = []
    for (let app in prefixes) {
      const avail = await isAppInstalled(app, subject, toEmail)
      if (avail) {
        availableApps.push(app)
      }
    }
    if (availableApps.length < 2) {
      return resolve(availableApps[0] || null)
    }

    const options = availableApps.map(app => titles[app])
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
 *     title: string, // of the alert
 *     message: string, // of the alert
 *     cancelLabel: string,
 *     toEmail: string,
 *     subject: string
 * }} options
 */
export const chooseMailApp = (options = {}) => async (dispatch, getState) => {
  if (!options || typeof options !== 'object') {
    throw new EmailException(
      'First parameter of `chooseMailApp` should contain object with options.'
    )
  }

  const { subject, toEmail } = options

  let app = mailApp.selectors.getPreferredApp(getState())
  if (app) {
    const available = await isAppInstalled(app, subject, toEmail)
    // preferred app is not available, so let's have the user choose again
    if (!available) {
      app = null
    }
  }

  if (!app) {
    const { title, message, cancelLabel } = options
    app = await askAppChoice(title, message, cancelLabel, subject, toEmail)
    if (app) {
      dispatch(mailApp.actions.setPreferredApp(app))
    }
  }

  if (app) {
    return Linking.openURL(getComposeUrl(app, subject, toEmail))
  }
}
