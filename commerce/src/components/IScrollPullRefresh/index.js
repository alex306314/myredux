/**
 * iscrll 实现下拉刷新
 *
 *
 if(this.options.isPullRefreshC){
      if( (
          (this.canRefresh && !this.canLoading)
          ||
          (!this.canRefresh && this.canLoading)
        )
        && this.moved
        && this.resetPosition(this.options.bounceTime)){
        return
      }
    }else{
      if (this.resetPosition(this.options.bounceTime) ) {
        	return;
      }
    }
 *
 * 解决点击自动下拉 需要修改iscroll-probe 560行 _end函数内部判断机制
 *
 *
 * 下拉具体处理 返回 Promise 对象
 * props: Promise loadingHandle(resolve,reject)
 * 上拉加载具体处理
 * props: Promise refreshHandle(resolve(loadingWidthNoData), reject)
 *
 */

import './style.scss'
import React from 'react'

var HFZ = html_font_size;

export default class IScrollPullRefresh extends React.Component
{
  constructor(props){
    super(props)
    HFZ = html_font_size;
    this.state = {
      id: g.utils.uuid(),
      //下拉刷新显示图标
      refreshIcon:'',
      refreshText: '下拉刷新',
      refreshTime: this.getTimeString(),
      distance: 0.8,
      showPullUpLoading: typeof props.showPullUpLoading!=='undefined'?props.showPullUpLoading:true,
      showPullDownRefresh: typeof props.showPullDownRefresh!=='undefined'?props.showPullDownRefresh:true,
    };
    this.iscroll = null;
    this.isInAjax = false;
    //console.log(this.state.showPullDownRefresh)
  }
  componentWillUnmount(){
    //销毁当前iscroll对象
    this.iscroll.destroy()
    this.iscroll = null
  }
  componentDidMount(){
    var self = this
      ,$s = $('#'+self.state.id)
      ,dis = self.state.distance*HFZ
      ,disr = dis * (-1)
      ,refreshHandle = this.props.refreshHandle || self.refreshHandle
      ,loadingHandle = this.props.loadingHandle || self.loadingHandle
      ,a=1;

    //window.c = this;

    self.initIScroll();
    //划动事件
    this.iscroll.on('scroll', function(){

      //console.log(this)
      self.y = this.y
      self.directionY = this.directionY
      //下拉刷新
      if(self.directionY<0 && self.state.showPullDownRefresh){
        if(this.y<=0 && (this.y>disr) && self.iscroll.canRefresh){
          self.setRefresh3()
        }
        if(this.y>0){
          self.iscroll.canRefresh = true;
          self.setRefresh2()
        }
      }

      //上拉加载更多
      if(self.directionY>0 && self.state.showPullUpLoading){
        var maxScrollY = this.maxScrollY + disr
          ,maxy = maxScrollY - this.y;
        //console.log(maxy)
        if(maxy > 0){
          self.iscroll.canLoading = true;
          self.setLoading(2);
        }else if(maxy>disr && maxy<0 && self.iscroll.canLoading){
          self.setLoading(3);
        }
      }
    });

    //划动结束
    this.iscroll.on('scrollEnd', function(){

      var _t = this;
      //下拉刷新
      if(self.state.showPullDownRefresh &&  self.iscroll.canRefresh && !self.isInAjax){
        self.isInAjax = true;
        //调用promise  .then-resolve   .catch->reject
        refreshHandle().then(()=>{
          self.refreshComplete()
        }).catch(()=>{
          self.refreshComplete()
        });
      }

      if(!self.iscroll.canRefresh && this.y>disr){
        self.resetTopPosition();
      }

      //下拉结束处理
      if(self.state.showPullUpLoading && self.iscroll.canLoading && !self.isInAjax ){
        self.isInAjax = true;
        loadingHandle().then((loadingWidthNoData)=>{
          //判断resolve函数是否有传参数
          if(typeof loadingWidthNoData !== 'boolean'){
            console.error('LoadingHandle promise resolve function need first param [boolean loadingWidthNoData]!')
          }
          self.loadingComplete(loadingWidthNoData)
        }).catch(()=>{
          self.loadingComplete()
        });
      }

    })
    this.iscroll.on('scrollStart', function(){
      self.scrollInProgress = true;
      self.setRefresh1();
      self.setLoading(1);
      self.iscroll.canRefresh = false;
      self.iscroll.canLoading = false;
      this.refresh()
    })

  }
  //示例刷新操作
  //默认 延时操作 返回Promise对象
  refreshHandle(){
    return new Promise(function(resolve, reject){
      setTimeout(()=>{
        if(true){
          console.log('resolve')
          resolve();
        }else{
          reject();
        }
      }, 3000);
    });
  }
  //下拉刷新结束处理
  refreshComplete(){
    var self = this;
    self.resetTopPosition();
    self.isInAjax = false;
    self.iscroll.canRefresh = false;
    self.setTime();
    //console.log('this is refresh ajax complete')
  }
  //加载更多具体处理示例
  loadingHandle(){
    return new Promise(function(resolve, reject){
      setTimeout(()=>{
        if(true){
          console.log('loading resolve')
          var loadingWidthNoData = false;
          resolve(loadingWidthNoData);
        }else{
          reject();
        }
      }, 3000);
    });
  }
  loadingComplete(loadingWidthNoData){
    var self = this;
    self.isInAjax = false;
    self.iscroll.canLoading = false;

    //加载更多是否还有数据
    if(loadingWidthNoData){
      self.setLoading(4)
    }else{
      self.setLoading(1)
    }

  }
  //下拉内容位置重置
  resetTopPosition(timing=500){
    var self = this;

    $('#'+self.state.id+' .ptr_scroller').animate({
      top: '-'+ (self.state.distance*HFZ) +'px'
    },timing,'linear',function(){
      self.iscroll.scrollTo(0,self.state.distance*HFZ*(-1),0)
    })
  }

  initIScroll(){
    var self = this;
    //初始化
    this.iscroll = new IScroll('#'+this.state.id, {
      probeType:3,
      bounceTime: 250,
      bounceEasing: 'quadratic',
      tap:true,
      click:false,
      preventDefaultException:{tagName:/.*/},
      mouseWheel:true,
      scrollbars:true,
      fadeScrollbars:true,
      interactiveScrollbars:false,
      keyBindings:false,
      deceleration:self.props.deceleration||0.03,
      startY:self.state.distance*HFZ*(-1),
      //topOffset: self.state.distance*(-1),
      useTransform: false,
      bindToWrapper: true,
      maxScrollY:self.state.distance*HFZ,
      isPullRefreshC: true
    });
    //this.iscroll.scrollTo(0,self.state.distance*(-1),0)
  }
  render(){
    var height = this.props.height || innerHeight/HFZ;
    var scrollerContent = $('#'+this.state.id).find('.scroll_inner').height()/HFZ;
    var showLoading = this.state.showPullUpLoading;
    var scrollerHeight = scrollerContent<=height
      ? (showLoading?height-this.state.distance:height) +0.01 +'rem'
      : 'auto';


    var loadingCls = showLoading?'':' hide';
    var pullDownCls = this.state.showPullDownRefresh?'':' hide'

    return (
      <div id={this.state.id} className={"rd_iscroll_ptr "+loadingCls}
           style={{height:height+'rem'}}>
        <div className="ptr_scroller" style={{height:scrollerHeight}}>

          <div className={'pulldown' + pullDownCls}>
            <i className={'fa si' + this.state.refreshIcon}></i>
            <span className="refreshText tx">{this.state.refreshText}</span>
            <span className="refreshTime tx">最近更新时间:&nbsp;{this.state.refreshTime}</span>
          </div>

          <div className="scroll_inner">
            <div className="scroll_content">
              {this.props.children}
            </div>

            <div className={"pullup pu1 "+loadingCls}>
              <i className="fa si fa-long-arrow-up i1"></i>
              <i className="fa si fa-spinner fa-pulse i3"></i>

              <span className="refreshText tx i1">上拉加载更多</span>
              <span className="refreshText tx i2">松开加载数据</span>
              <span className="refreshText tx i3">正在加载...</span>
              <span className="refreshText tx i4">没有更多数据了</span>
            </div>

          </div>

        </div>
      </div>
    );
  }

  setRefresh1(){
    this.setState({
      refreshText:this.props.txtRefresh1||'下拉刷新',
      refreshIcon: " fa-long-arrow-down i1",
    })
  }
  setRefresh2(){
    this.setState({
      refreshText:this.props.txtRefresh1||'松开刷新数据',
      refreshIcon: " fa-long-arrow-down up i2",
    })
  }
  setRefresh3(){
    this.setState({
      refreshText:this.props.txtRefresh1||'正在加载...',
      refreshIcon: " fa-spinner fa-pulse i3",
    })
  }
  setLoading(num=1){
    var $s = document.querySelector('#'+this.state.id),
      cls='',
      $p = $s.querySelector('.pullup'),
      show = $p.classList.contains('show');
    switch(num) {
      case 2:
        cls = 'pu2 up'
        break;
      case 3:
        cls = 'pu3'
        break;
      case 4:
        cls = 'pu4'
        break;
      case 1:
      default:
        cls = 'pu1'
    }
    $p.className = (show?'pullup show ':'pullup ') + cls;
  }
  setTime(){
    this.setState({refreshTime:this.getTimeString()});
  }
  getTimeString(){
    var d = new Date(),
      h = d.getHours(),
      m = d.getMinutes(),
      s = d.getSeconds();

    return d.getFullYear()+'年'
      + (d.getMonth()+1)+'月'
      + d.getDate() + '日'
      + ' '
      + (h<10?'0'+h:h) + ':'
      + (m<10?'0'+m:m) + ':'
      + (s<10?'0'+s:s)
  }
}