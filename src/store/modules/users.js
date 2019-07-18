import api from '../../apiUrls'
import {success} from "redux-saga-requests";



const FETCH_USERS = 'FETCH_USERS'
const FETCH_USER = 'FETCH_USER'
const COMMENT_USER = 'COMMENT_USER'

export const commentUser = userId => ({
  type: COMMENT_USER,
  request: {
    url: api.user.comment(userId),
    method: 'post',
    data: {
      commentBody: 'alcatraz'
    }
  }
})
export const fetchUsers = () => ({
  type: FETCH_USERS,
  request: {
    url: api.user.user,
  }
})
export const fetchUser = (userId) => ({
  type: FETCH_USER,
  request: {
    url: `user/${userId}`,
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
    case success(FETCH_USER):
      return {
        ...state,
        usersStore: {
          ...state.usersStore,
          [data.id]: data
        }
      }
    default: return state;
  }
}