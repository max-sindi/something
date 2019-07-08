import api from '../../apiUrls'
import {success, error} from "redux-saga-requests";


const FETCH_USERS = 'FETCH_USERS'
export const fetchUsers = () => ({
  type: FETCH_USERS,
  request: {
    url: api.users,
  }
})

const initialState = {
  usersList: [],
  usersStore: {},
}

export default (state = initialState, { type, payload, data }) => {
  switch (type) {
    case success(FETCH_USERS): {
      return {
        ...state,
        usersList: data,
        usersStore: data.reduce((accum, val) => {
          accum[val.id] = val;
          return accum
        }, {})
      }
    }
    default: return state;
  }
}