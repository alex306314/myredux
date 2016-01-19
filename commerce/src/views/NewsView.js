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
    menuItems: state.appReducer.get('menuItems').toJS(),
    newsList: state.appReducer.get('newsList').toJS()
  }
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

class NewsView extends React.Component
{
  constructor(props){
    super(props)
    this.state = {
      menuId: 2,
    };
  }
  render(){
    let {newsList} = this.props;
    var indexNews = newsList['menu_id_' + this.state.menuId] || [];
    return (
      <div>
        <Header showSearch={false} title="电商资讯" />

        <div className="mui-content headercon">
          <IScrollPullRefresh height={innerHeight-44}>
            <ISlideMenu items={this.props.menuItems} currentMenuId={this.state.menuId} />
            <NewsList items={indexNews} baseKey="category_list"/>
          </IScrollPullRefresh>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsView);