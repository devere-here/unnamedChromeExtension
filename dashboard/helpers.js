export const convertTime = (ms) => {
  if (!ms) {
    return {
      hours: 0,
      minutes: 0
    }
  }

  const MS_TO_MINUTE = 1/60000
  let totalMinutes = +ms * MS_TO_MINUTE
  totalMinutes = totalMinutes.toFixed(2)

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: Math.floor(totalMinutes % 60)
  }
}

export const getRemainingTime = (timeUsed, timeAllowed = 0) => {
  const timeRemaining = +timeAllowed - timeUsed
  return convertTime(timeRemaining)
}

export const convertToMS = (hours, minutes) => {
  const msFromMinutes = minutes * 60000
  const msFromHours = hours * 60000 * 24

  return msFromMinutes + msFromHours
}
