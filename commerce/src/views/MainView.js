import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actionCreators from '../actions'

import {
  IScrollPullRefresh,
  Carousel,

  NewsList
} from '../components'

import history from '../utils/history';

const ID = 1;

function mapStateToProps(state){
  return {
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
    this.props.actions.setHeader('陕西电子商务');
    this.props.actions.setCurrentMenuId(ID);
  }
  getData(){
    g.getListData(
      ID,
      1,
      this.props.perPage
    ).then((listData)=>{
        this.props.actions.setListData(ID,listData)
      })
      .catch((e)=>{})
  }
  render(){
    return (
      <div className="main_view_component" style={{height:innerHeight+'px'}}>

        <div className="mui-content headercon">
          <IScrollPullRefresh
            height={(innerHeight-0.8*html_font_size)/html_font_size}
            loadingHandle={this.loadingHandle.bind(this)}
            refreshHandle={this.refreshHandle.bind(this)}
            >

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
        ID,
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
        ID,
        1,
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