import { commonReducer } from './commonReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  common: commonReducer
})