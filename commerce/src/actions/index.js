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

export function setSlideImages(images){
  return {
    type: types.SET_SLIDE_IMAGES,
    images:images
  }
}

export function setListData(menuId, data){
  return {
    type: types.SET_NEWS_LIST_DATA,
    menuId: menuId,
    data: data
  }
}

export function pendingListData(menuId, data){
  return {
    type: types.PENDING_NEWS_LIST_DATA,
    menuId:menuId,
    data: data
  }
}