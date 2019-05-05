import * as ActionTypes from './ActionType'

const initialState = {
  path: '/'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.onupdate:
      return {
        ...state,
        path: action.payload
      }
    default:
      return state
  }
}
