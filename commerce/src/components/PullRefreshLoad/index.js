/**
 * 下拉刷新 上拉加载组件
 */
import './style.scss'
import React from 'react';
import uuid from '../../../../common/utils/uuid';

export default class PullRefreshLoad extends React.Component
{
  constructor(props){
    super(props)
    this.state = {
      id: uuid()
    }
    this.props = {
      contentrefresh: '正在加载...'
    }
  }
  componentWillUnmount(){

  }
  componentDidMount(){
    console.log(232)
    const self = this;
    mui.init({
      pullRefresh: {
        container: '#' + this.state.id,
        down: {
          callback: self.props.pullDownRefresh || self.pullDownRefresh.bind(self)
        },
        up: {
          contentrefresh: self.props.contentrefresh,
          callback: self.props.pullUpRefresh || self.pullUpRefresh.bind(self)
        }
      }
    });
    if (mui.os.plus) {
      mui.plusReady(function() {
        setTimeout(function() {
          mui('#'+self.state.id).pullRefresh().pullupLoading();
        }, 1000);
      });
    } else {
      mui.ready(function() {
        mui('#'+self.state.id).pullRefresh().pullupLoading();
      });
    }
  }
  /**
   * 下拉刷新具体实现
   */
  pullDownRefresh(){
    const self = this;
    setTimeout(function(){
      self.endPullDownRefresh()
    },1000);
  }
  /**
   * 上拉加载具体实现
   */
  pullUpRefresh(){
    const self = this;
    setTimeout(function(){
      self.endPullUpRefresh()
    },1000);

  }
  endPullDownRefresh(){
    mui('#'+this.state.id).pullRefresh().endPulldownToRefresh(); //refresh completed
  }
  /**
   * @param hasData boolean 参数为true代表没有更多数据了
   */
  endPullUpRefresh(hasData=false){
    mui('#'+this.state.id).pullRefresh().endPullupToRefresh(hasData);
  }
  render(){

    return(
      <div id={this.state.id}
           style={{height:innerHeight-40+'px'}}
           className="mui-content mui-scroll-wrapper my-main-scr">
        <div className="mui-scroll">
          {this.props.children}
        </div>
      </div>
    );
  }
}
