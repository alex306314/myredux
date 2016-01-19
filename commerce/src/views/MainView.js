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

const ID = 1;

function mapStateToProps(state){
  return {
    currentMenuId: state.appReducer.get('currentMenuId'),
    menuItems: state.appReducer.get('menuItems').toJS(),
    imageItems: state.appReducer.get('imageItems').toJS(),
    page: state.appReducer.getIn(['newsList','menu_id_'+ID, 'page']),
    perPage: state.appReducer.getIn(['newsList','menu_id_'+ID, 'perPage']),
    list: state.appReducer.getIn(['newsList','menu_id_'+ID, 'list']).toJS(),
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
    if(props.list.length == 0){
      this.getData();
    }
  }
  componentDidMount(){
  }
  getData(){
    g.getListData(
      this.props.page,
      this.props.perPage
    ).then((listData)=>{
        this.props.actions.setListData(ID,listData)
      })
      .catch((e)=>{})
  }
  render(){
    return (
      <div>
        <Header showSearch={true}/>

        <div className="mui-content headercon">
          <IScrollPullRefresh
            height={innerHeight-44}
            loadingHandle={this.loadingHandle.bind(this)}
            refreshHandle={this.refreshHandle.bind(this)}
            >

            <ISlideMenu items={this.props.menuItems} currentMenuId={ID}/>

            <Carousel items={this.props.imageItems}/>

            <div className="mainrecti">热门推荐</div>

            <NewsList items={this.props.list} />
          </IScrollPullRefresh>
        </div>
      </div>
    );
  }
  loadingHandle(){
    var self = this;
    return new Promise((resolve, reject)=>{
      g.getListData(
        this.props.page,
        this.props.perPage
      ).then((listData)=>{
          self.props.actions.pendingListData(ID, listData)
          var loadingWidthNoData = listData.list.length? false: true;
          resolve(loadingWidthNoData)
        })
        .catch((e)=>reject(e))
    })
  }
  refreshHandle(){
    var self = this;
    return new Promise((resolve, reject)=>{
      g.getListData(
        this.props.page,
        this.props.perPage
      ).then((listData)=>{
          self.props.actions.setListData(ID,listData)
          resolve()
        })
        .catch((e)=>reject(e))
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)