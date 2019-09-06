/**
 * Calls the given function fn, which should return a promise.  If the promise
 * fails, retries it using the delay with an exponential backoff up to the
 * maxDelay.
 *
 * Returns a control object with a cancel method.  If the cancel method is called
 * the retry mechanism will be aborted.
 *
 * @param {function} fn - the function to call, which must return a promise
 * @param {integer} delay - milliseconds to wait before retrying
 * @param {integer} maxDelay - max milliseconds to wait before retrying
 * @returns {object} with cancel method
 */
export const retry = (fn, delay = 500, maxDelay = 10000) => {
  let canceled = false
  let timeoutId

  const control = {
    cancel: () => {
      canceled = false
      clearTimeout(timeoutId)
    }
  }

  const _pause = duration =>
    new Promise(res => {
      timeoutId = setTimeout(res, duration)
    })

  const _retry = delay => {
    if (!canceled) {
      fn().catch(() =>
        _pause(delay).then(() => {
          delay = Math.min(delay * 2, maxDelay)
          _retry(delay)
        })
      )
    }
  }

  _retry(delay)

  return control
}
