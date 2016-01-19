/**
 * 专家专栏
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

const ID = 3;

function mapStateToProps(state){
  return {
    menuItems: state.appReducer.get('menuItems').toJS(),
    page: state.appReducer.getIn(['newsList','menu_id_'+ID, 'page']),
    perPage: state.appReducer.getIn(['newsList','menu_id_'+ID, 'perPage']),
    list: state.appReducer.getIn(['newsList','menu_id_'+ID, 'list']).toJS(),
  }
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

class ExpertView extends React.Component
{
  constructor(props){
    super(props)
    if(props.list.length == 0){
      this.getData();
    }
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
        <Header showSearch={false} title="专家专栏" />

        <div className="mui-content headercon">
          <IScrollPullRefresh
            height={innerHeight-44}
            loadingHandle={this.loadingHandle.bind(this)}
            refreshHandle={this.refreshHandle.bind(this)}
            >
            <ISlideMenu items={this.props.menuItems} currentMenuId={ID}  />
            <NewsList items={this.props.list} baseKey="category_list"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpertView);