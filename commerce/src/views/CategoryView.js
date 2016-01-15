/**
 * 分类新闻列表
 */
import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actionCreators from '../actions'

import {
  Header,
  IScrollPullRefresh,
  ISlideMenu,
  NewsList
} from '../components'

function mapStateToProps(state){
  return {
    currentMenuId: state.appReducer.get('currentMenuId'),
    menuItems: state.appReducer.get('menuItems').toJS(),
    newsList: state.appReducer.get('newsList').toJS()
  }
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

class CategoryView extends React.Component
{
  constructor(props){
    super(props)
    //更新当前menuId
    this.props.actions.setCurrentMenuId(parseInt(this.props.routeParams.menuId))
  }
  render(){
    let {newsList, currentMenuId} = this.props;
    var indexNews = newsList['menu_id_' + currentMenuId] || [];
    return (
      <div>
        <Header showSearch={false} title="国内新闻" />

        <div className="mui-content headercon">
          <IScrollPullRefresh height={innerHeight-44}>
            <ISlideMenu items={this.props.menuItems}
                        currentMenuId={parseInt(this.props.routeParams.menuId)} />
            <NewsList items={indexNews} baseKey="category_list"/>
          </IScrollPullRefresh>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);