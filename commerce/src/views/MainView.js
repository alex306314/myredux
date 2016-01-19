import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actionCreators from '../actions'

import {
  Header,
  IScrollPullRefresh,
  Carousel,
  ISlideMenu,
  NewsList
} from '../components'

import history from '../utils/history';

function mapStateToProps(state){
  return {
    currentMenuId: state.appReducer.get('currentMenuId'),
    menuItems: state.appReducer.get('menuItems').toJS(),
    imageItems: state.appReducer.get('imageItems').toJS(),
    newsList: state.appReducer.get('newsList').toJS()
  }
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}


/**
 * 推荐资讯 首页
 */
class MainView extends React.Component
{
  constructor(props, context){
    super(props, context)
    this.state = {
      menuId: 1
    };
  }
  componentDidMount(){
  }
  render(){
    var indexNews = this.props.newsList['menu_id_'+this.state.menuId] || [];
    return (
      <div>
        <Header showSearch={true}/>

        <div className="mui-content headercon">
          <IScrollPullRefresh
            height={innerHeight-44}
            >

            <ISlideMenu items={this.props.menuItems} currentMenuId={this.state.menuId}/>

            <Carousel items={this.props.imageItems}/>

            <div className="mainrecti">热门推荐</div>

            <NewsList items={indexNews} />
          </IScrollPullRefresh>
        </div>
      </div>
    );
  }
  handleRefresh(resolve, reject) {
    // do some async code here
    setTimeout(function(){
      if (1) {
        resolve();
      } else {
        reject();
      }
    },2000);

  }
  setTest(){
    this.props.actions.setCurrentMenuId(3)
  }
  setImage(){
    this.props.actions.setSlideImages([{img:'',title:'123'}])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)