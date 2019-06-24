import { combineReducers } from 'redux'
import focus from './focus'
import auth from './auth'
import online from './online'

export default combineReducers({
  focus,
  auth,
  online,
})