const initialState = {
  focusedAreaId: null,
}

const SET_AREA_AS_FOCUSED = 'SET_AREA_AS_FOCUSED'

export const setAreaAsFocused = id => ({type: SET_AREA_AS_FOCUSED, payload: {id}})
export const setNothingAsFocused = () => ({type: SET_AREA_AS_FOCUSED, payload: {id: null}})

export default (state = initialState, action) => {
  const {type, payload} = action
  
  switch(type) {
    case SET_AREA_AS_FOCUSED:
      return Object.assign({}, state, {focusedAreaId: payload.id})

    default: return state
  }
}