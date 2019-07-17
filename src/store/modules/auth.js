const CHECK_IS_LOGGED = 'CHECK_IS_LOGGED'

export const checkIsLogged = () => ({
  type: CHECK_IS_LOGGED,
  request: {
    url: 'auth/check-token',
    method: 'get',
    headers: {
      'authorization': localStorage.getItem('token')
    }
  }
})

const initialState = {
  isLogged: false
}

export default (state = initialState, action) => {
  const {type} = action

  switch (type) {
    default: return state
  }
}