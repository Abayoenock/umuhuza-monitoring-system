export function getTimeDifference(timestamp) {
  const now = Math.floor(Date.now())
  const differenceInSeconds = Math.floor(now - timestamp)

  if (differenceInSeconds < 60) {
    return "active Now"
  }

  const minutes = Math.floor(differenceInSeconds / 60)
  if (minutes < 60) {
    return mins + " mins ago"
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours < 24) {
    return ` ${hours} ${
      hours > 1 ? "hrs" : "hr"
    } : ${remainingMinutes}  mins ago`
  }

  // If it's greater than one week, show the full date and time.
  const timestamp2 = new Date(timestamp * 1000)
  const dateString = timestamp2.toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  return dateString
}
