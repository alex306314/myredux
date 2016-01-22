import * as types from '../constants'
import initialState from './initialState'
import Immutable from 'immutable'

window.Immutable = Immutable

export function appReducer(state = initialState, action={}){
  switch(action.type){
    case types.SET_HEADER:
      return state.updateIn(['header'], value=>action.header);
    case types.SET_CURRENT_MENU_ID:
      return state.updateIn(['currentMenuId'],value=>action.id);
    case types.SET_SLIDE_IMAGES:
      return state.setIn(['imageItems'],Immutable.fromJS(action.images));
    case types.SET_NEWS_LIST_DATA:
      return state.setIn(['newsList','menu_id_'+action.menuId], Immutable.fromJS(action.data));
    //加载更多数据
    case types.PENDING_NEWS_LIST_DATA:
      var newState = state.setIn(['newsList','menu_id_'+action.menuId, 'page'], action.data.page);
      newState = newState.setIn(['newsList','menu_id_'+action.menuId, 'perPage'], action.data.perPage);
      return newState.updateIn(['newsList','menu_id_'+action.menuId, 'list'],
          list=>list.concat(action.data.list));
    default:
      return state;
  }
}