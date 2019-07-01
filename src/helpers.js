// const buildSetter = (state, setter) => obj => setter({ ...state, ...obj })

// const setState = buildSetter(userState, setUserState)

/**
 * convert date to timestamp
 * @param {string} time
 * @returns {number}
 */
export const getTimeStamp = (time) => {
  return Math.round(new Date(time).getTime() / 1000)
}

export const getFileName = (url) => {
  return url.substring(url.lastIndexOf('/') + 1)
}
