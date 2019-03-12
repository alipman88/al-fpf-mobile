export const truncateText = (content, postTruncateLength, shouldTruncate) => {
  if (content.length > postTruncateLength) {
    return shouldTruncate
      ? `${content.substring(0, postTruncateLength)}...`
      : content
  }
  return content
}
