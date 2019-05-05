import * as ActionType from './ActionType'
export const updateStateAction = payload => {
  return {
    type: ActionType.onupdate,
    payload
  }
}