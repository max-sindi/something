import { combineReducers } from 'redux'
import focus from './focus'
import auth from './auth'
import online from './online'
import users from './users'
import cities from './cities'
import weather from './weather'

export default combineReducers({
  focus,
  auth,
  online,
  users,
  cities,
  weather,
})