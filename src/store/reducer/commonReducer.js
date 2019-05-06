import * as ActionTypes from '../ActionType'

const initialState = {
  path: '/',
  loginFlag: false
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
    case ActionTypes.onlogin:
      console.log('登录', action.payload)
      return {
        ...state,
        loginFlag: action.payload
      }
    default:
      return state
  }
}
