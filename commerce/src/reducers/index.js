import * as types from '../constants'
import initialState from './initialState'
import Immutable from 'immutable'

window.Immutable = Immutable

export function appReducer(state = initialState, action={}){
  switch(action.type){
    case types.SET_CURRENT_MENU_ID:
      return state.updateIn(['currentMenuId'],value=>action.id);
    case types.SET_SLIDE_IMAGES:
      return state.setIn(['imageItems'],Immutable.fromJS(action.images));
    default:
      return state;
  }
}