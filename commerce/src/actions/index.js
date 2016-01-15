import * as types from '../constants'

export function showAlert(msg){
  return {
    type: types.TEST1,
    msg: msg
  }
}

export function setCurrentMenuId(menuId=1){
  return {
    type:types.SET_CURRENT_MENU_ID,
    id: menuId
  }
}