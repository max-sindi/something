import api from '../../apiUrls'
import {success, error} from "redux-saga-requests";

const FETCH_WEATHER = 'FETCH_WEATHER'
const SELECT_CITY = 'SELECT_CITY'

export const fetchWeather = (cityId) => (dispatch, getState) => dispatch({
  type: FETCH_WEATHER,
  request: {
    url: api.weather,
    params: (function() {
      const coords = getState().cities.citiesStore[cityId].geometry.coordinates
      return {
        lat: coords[1],
        lon: coords[0],
      }
    }())
  }
})

export const selectCity = (cityId) => ({
  type: SELECT_CITY,
  payload: {
    cityId
  }
})

const initialState = {
  weather: {},
  selectedCityId: null,
}

export default (state = initialState, { type, payload, data }) => {
  switch (type) {
    case SELECT_CITY: return {
      ...state,
      selectedCityId: payload.cityId
    }

    case success(FETCH_WEATHER): {
      return {
        ...state,
        weather: data,
        // citiesList: data,
        // citiesStore: data.reduce((accum, val) => {
        //   accum[val.id] = val;
        //   return accum
        // }, {})
      }
    }
    default: return state;
  }
}