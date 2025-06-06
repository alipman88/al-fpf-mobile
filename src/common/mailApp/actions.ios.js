/**
 * Source from React Native Email Link, altered so we can compose
 *
 * https://github.com/tschoffelen/react-native-email-link/blob/master/src/ios.js
 */

import { ActionSheetIOS, Linking, Platform } from 'react-native'
import { mailApp } from './slice'
import { EmailException, parseMailto } from './common'

const prefixes = {
  'apple-mail': 'message://',
  gmail: 'googlegmail://',
  inbox: 'inbox-gmail://',
  spark: 'readdle-spark://',
  airmail: 'airmail://',
  outlook: 'ms-outlook://',
  yahoo: 'ymail://',
  superhuman: 'superhuman://',
  yandex: 'yandexmail://',
  fastmail: 'fastmail://',
  protonmail: 'protonmail://',
  seznamemail: 'szn-email://',
}

const titles = {
  'apple-mail': 'Mail',
  gmail: 'Gmail',
  inbox: 'Inbox',
  spark: 'Spark',
  airmail: 'Airmail',
  outlook: 'Outlook',
  yahoo: 'Yahoo Mail',
  superhuman: 'Superhuman',
  yandex: 'Yandex',
  fastmail: 'Fastmail',
  protonmail: 'ProtonMail',
  seznamemail: 'Email.cz',
}

/**
 * Allowed params for each app url
 *  - apple-mail: https://ios.gadgethacks.com/news/always-updated-list-ios-app-url-scheme-names-0184033/
 *  - gmail: https://stackoverflow.com/questions/32114455/open-gmail-app-from-my-app
 *  - inbox: https://stackoverflow.com/questions/29655978/is-there-an-ios-mail-scheme-url-for-googles-inbox
 *  - spark: https://helpspot.readdle.com/spark/index.php?pg=kb.page&id=791
 *  - airmail: https://help.airmailapp.com/en-us/article/airmail-ios-url-scheme-1q060gy/
 *  - outlook: https://stackoverflow.com/questions/32369198/i-just-want-to-open-ms-outlook-app-and-see-mailto-screen-using-url-scheme-at-ios
 *  - fastmail: https://github.com/vtourraine/ThirdPartyMailer/blob/1.8.0/Sources/ThirdPartyMailer/ThirdPartyMailClient.swift#L80
 */
const uriParams = {
  'apple-mail': {
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
  },
  gmail: {
    path: 'co',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
  },
  inbox: {
    path: 'co',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
  },
  spark: {
    path: 'compose',
    to: 'recipient',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
  },
  airmail: {
    path: 'compose',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'htmlBody',
  },
  outlook: {
    path: 'compose',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
  },
  yahoo: {
    path: 'mail/compose',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
  },
  superhuman: {
    path: 'compose',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
  },
  yandex: {
    path: 'compose',
  },
  fastmail: {
    path: 'mail/compose',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
  },
  protonmail: {
    path: 'compose',
  },
  seznamemail: {
    path: 'mail',
  },
}

/**
 * Returns param to open app compose screen and pre-fill 'to', 'subject' and 'body',
 * @param {string} app
 * @param {{
 *     to: string,
 *     cc: string,
 *     bcc: string,
 *     subject: string,
 *     body: string,
 * }} options
 */
function getUrlParams(app, options) {
  const appParms = uriParams[app]
  if (!appParms) {
    return ''
  }

  const path = app === 'apple-mail' ? options.to || '' : appParms.path
  const urlParams = Object.keys(appParms).reduce((params, currentParam) => {
    if (options[currentParam]) {
      params.push(`${appParms[currentParam]}=${options[currentParam]}`)
    }
    return params
  }, [])

  return `${path}?${urlParams.join('&')}`
}

function getComposeUrl(app, subject = '', to = '') {
  const params = getUrlParams(app, { subject, to })
  let prefix = prefixes[app]

  if (app === 'apple-mail') {
    // apple mail prefix to compose an to is mailto
    prefix = 'mailto:'
  }

  return `${prefix}${params}`
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

    let { subject, email } = options

    if (subject) subject = encodeURIComponent(subject)

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

      if (status === 'unavailable') {
        app = null
      } else {
        // Save preferred app
        dispatch(mailApp.actions.setPreferredApp(app))
      }
    }

    let url
    if (app) {
      // Get appropriate url for the preferred app
      url = getComposeUrl(app, subject, email)
    } else {
      // No obvious mail app was available, but perhaps a mailto link will still work
      url = `mailto:${email || ''}?subject=${subject || ''}`
    }

    return Linking.openURL(url)
  }
