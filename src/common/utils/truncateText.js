import truncate from 'lodash/truncate'

export const truncateText = (content, postTruncateLength, shouldTruncate) => {
  return shouldTruncate && content.length > postTruncateLength
    ? truncate(content, { length: postTruncateLength, separator: /\s/ })
    : content
}
