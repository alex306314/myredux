import * as types from '../constants'

export function showAlert(msg){
  return {
    type: types.TEST1,
    msg: msg
  }
}