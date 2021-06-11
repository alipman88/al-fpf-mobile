/**
 * Source from React Native Email Link, altered so we can compose
 */

import { ActionSheetIOS, Linking, Platform } from 'react-native'
import { mailApp } from './slice'
import { appMessage } from '@components/AppMessage/slice'

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

function getComposeUrl(app, subject = '', toEmail = '') {
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
  return new Promise((resolve) => {
    if (!(app in prefixes)) {
      console.log(app, 'not in', prefixes)
      return resolve(false)
    }

    const url = getComposeUrl(app, subject, toEmail)
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
  toEmail = ''
) {
  return new Promise(async (resolve) => {
    const availableApps = []
    for (let app in prefixes) {
      const avail = await isAppInstalled(app, subject, toEmail)
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
      }
    )

    return
  })
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

  // Get the current preferred app, and double check that it's available
  let app = mailApp.selectors.getPreferredApp(getState())
  if (app) {
    const available = await isAppInstalled(app, subject, toEmail)
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
      toEmail
    ))

    if (status === 'unavailable') {
      // No application available to open mailto links - alert user
      return dispatch(
        appMessage.actions.setAppError(
          'No application configured to handle email links'
        )
      )
    } else if (status === 'canceled') {
      // User clicked cancel button when asked to select app - take no action
      return
    }

    // Use user-selected app to open mailto link
    dispatch(mailApp.actions.setPreferredApp(app))
  }

  return Linking.openURL(getComposeUrl(app, subject, toEmail))
}
