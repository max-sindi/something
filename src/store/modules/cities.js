// import api from '../../apiUrls'
import {success, error} from "redux-saga-requests";


const FETCH_CITIES = 'FETCH_CITIES'
export const fetchCities = () => ({
  type: FETCH_CITIES,
  // request: {
  //   url: api.cities,
  // }
})

const initialState = {
  citiesList: [],
  citiesStore: {},
  citiesToSelect: [],
  citiesAreFetching: false,
}

export default (state = initialState, { type, payload, data }) => {
  switch (type) {
    case FETCH_CITIES: return {
      ...state,
      citiesAreFetching: true
    }
    case error(FETCH_CITIES): return {
      ...state,
      citiesAreFetching: true,
      citiesFetchingError: data
    }
    case success(FETCH_CITIES): {
      return {
        ...state,
        citiesAreFetching: false,
        citiesList: data,
        citiesToSelect: data.map(city => ({
          value: city.properties.capital,
          label: city.properties.capital
        })),
        citiesStore: data.reduce((accum, city) => {
          accum[city.properties.capital] = city;
          return accum
        }, {})
      }
    }
    default: return state;
  }
}