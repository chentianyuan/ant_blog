import * as ActionTypes from '../ActionType'

const initialState = {
  path: '/'
}

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.onupdate:
      console.log('更新成功', {
        ...state,
        path: action.payload
      })
      return {
        ...state,
        path: action.payload
      }
    default:
      return state
  }
}
