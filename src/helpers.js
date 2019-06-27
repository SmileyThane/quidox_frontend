const buildSetter = (state, setter) => obj => setter({ ...state, ...obj })

const setState = buildSetter(userState, setUserState)