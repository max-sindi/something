import {success, error} from 'redux-saga-requests'

const CHECK_ONLINE = 'CHECK_ONLINE'

export const checkOnline = () => ({
  type: CHECK_ONLINE,
  request: {
    url: '/services/ping',
    method: 'get'
  }
})

const initialState = {
  isOnline: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case success(CHECK_ONLINE): return {...state, isOnline: true}
    case error(CHECK_ONLINE): return {...state, isOnline: false}
    default: return state
  }
}