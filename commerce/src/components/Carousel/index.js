/**
 * 图片轮播组件
 */
import './style.scss'
import React from 'react'

export default class Carousel extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      id: g.utils.uuid(),
      width: props.width||(innerWidth>640?640:innerWidth),
      height:props.height||250,
      autoRun: props.autoRun || false,
      intervalTime: props.intervalTime || 5000,
    }
    this.hammer = -1;
    this.currentIdx = 1;
    this.prevIdx = 0;
    this.nextIdx = 0;
    this.total = 0;
    this.$s = -1;
    this.$li = -1;
    this.time = 1;
    this.isMoving = false;
    this.isAuto = false;
    this.interval = -1;
  }
  componentWidthUnMount(){
    this.destroy()
  }
  componentWillUpdate(){
    this.destroy()
  }
  componentDidUpdate(){
    //console.log('update')
    this.initActions();
  }
  componentDidMount(){
    //console.log('mount')
    this.initActions()
    //window.c = this;
  }
  initActions(){
    var self = this;
    this.$s = $('#'+this.state.id);
    this.$li = this.$s.find('.li');
    var width = this.state.width
      ,height = this.state.height
      ,a=1;
    this.currentIdx = this.$s.find('.li.active').index()+1;
    this.currentIdx = this.currentIdx<0?1:this.currentIdx;
    this.setStartCurrent();
    this.total = this.$li.length;

    this.setInitStyle(width,height)

    this.hammer = new Hammer(this.$s[0]);
    this.hammer.on('panstart', function(e){
      self.isAuto = false;
      self.clearInterval();
      self.panStart(e);
    });
    this.hammer.on('panleft', this.panLeft.bind(this));
    this.hammer.on('panright', this.panRight.bind(this));
    this.hammer.on('panend', this.panEnd.bind(this));

    if(this.state.autoRun){
      setTimeout(function(){
        self.isAuto = true;
        self.setInterval();
      }, this.state.intervalTime)
    }
  }
  destroy(){
    if(this.hammer!=-1){
      this.hammer.destroy();
      this.hammer = -1;
    }
    this.clearInterval();
  }
  /**
   * pan start
   * @param e
   */
  panStart(e){
    if(this.total<2) return;
    this.$li.removeClass('active next prev')
      .eq(this.currentIdx-1).addClass('active')
    if(e.deltaX<0){
      this.setStartNext();
    }else{
      this.setStartPrev();
    }
  }

  /**
   * pan left
   * @param e
   */
  panLeft(e){
    //console.log(e)
    if(this.total<2) return;
    var $a = this.$s.find('.li.active')
      ,$p = this.$s.find('.li.prev')
      ,$n = this.$s.find('.li.next');

    this.animLeft($a,e.deltaX);
    this.animLeft($p,this.state.width*(-1)-e.deltaX);
    this.animLeft($n,this.state.width+e.deltaX);
  }

  /**
   * pan right
   * @param e
   */
  panRight(e){
    if(this.total<2) return;
    var $a = this.$s.find('.li.active')
      ,$p = this.$s.find('.li.prev')
      ,$n = this.$s.find('.li.next');
    this.animLeft($a,e.deltaX);
    this.animLeft($p,this.state.width*(-1)+e.deltaX);
    this.animLeft($n,this.state.width+e.deltaX);

  }

  /**
   * pan end
   * @param e
   */
  panEnd(e){
    var self = this;
    if(this.total<2) return;
    //console.log(e)
    var max = this.state.width/4;
    max = this.isAuto?0:max;
    var backTime = e.distance/this.state.width * this.time;
    var time = this.time - backTime;
    var $a = this.$s.find('.li.active')
      ,$p = this.$s.find('.li.prev')
      ,$n = this.$s.find('.li.next')
    if(e.distance>=max){
      var dir = e.deltaX<0?-1:1;
      var left = this.state.width*dir,
        pleft = e.deltaX<0?this.state.width*dir:0,
        nleft = e.deltaX<0?0:this.state.width;

      this.animLeft($a,left,time);
      this.animLeft($p,pleft,time);
      this.animLeft($n,nleft,time);

      if(dir<0){
        this.currentIdx = this.nextIdx;
      }else{
        this.currentIdx = this.prevIdx;
      }
      this.$s.find('.car_indicator .i').removeClass('active')
        .eq(this.currentIdx-1).addClass('active');
    }else{
      this.animLeft($a,0,backTime);
      this.animLeft($p,this.state.width*(-1),backTime);
      this.animLeft($n,this.state.width,backTime);
    }

    if(this.state.autoRun && this.interval==-1){
      setTimeout(function(){
        self.setInterval();
      }, this.state.intervalTime)
    }
  }

  animLeft($s,left, time=-1){
    if(time<0){
      $s.css({
        left: left + 'px',
        transition:'none'
      });
    }else{
      $s.css({
        left: left + 'px',
        transition:'left ' + time + 's'
      });
    }
  }
  setInterval(){
    var self = this;
    this.interval = setInterval(function(){
      self.autoRun();
    }, this.state.intervalTime)
  }
  clearInterval(){
    if(this.interval!=-1){
      clearInterval(this.interval);
      this.interval = -1;
    }
  }
  autoRun(){
    this.isAuto = true;
    var self = this;
    var dis = 2;
    var e = {
      deltaX:dis*(-1),distance:dis
    };
    this.panStart(e)

    setTimeout(function(){
      self.panLeft(e)
      setTimeout(function(){
        self.panEnd(e)
      },50)
    },50)
  }
  setStartCurrent(){
    this.$li.removeClass('active')
      .eq(this.currentIdx-1).addClass('active').css({left:'0px'});
  }
  setStartPrev(){
    var left = this.state.width*(-1);
    this.prevIdx = this.currentIdx-1<=0?this.total:this.currentIdx-1;
    this.$li.removeClass('next prev')
      .eq(this.prevIdx-1).addClass('prev').css({left:left+'px'});
  }
  setStartNext(){
    var left = this.state.width;
    this.nextIdx = this.currentIdx+1 > this.total? 1 : this.currentIdx+1;
    this.$li.removeClass('next prev')
      .eq(this.nextIdx-1).addClass('next').css({left:left+'px'});
  }

  /**
   * 初始化尺寸
   * @param width
   * @param height
   */
  setInitStyle(width,height){
    $('#'+this.state.id).css({
      width:width + 'px',
      height: height + 'px'
    }).find('.car_ul').css({
      height: height + 'px'
    }).find('.li').css({
      width:width + 'px',
      height: height + 'px'
    });
  }
  render(){
    return(
      <div id={this.state.id} className="iscroll_carousel">
        <div className="car_ul">
          {this.props.items.map((item, i)=>{
            var title = (typeof item.title=='undefined'||item.title=='')
                ? ''
                : (<p className="cati"><span className="pin">{item.title}</span></p>),
              cls = i==0 ? 'li active':'li';
            return (
              <div className={cls} key={'imgslide'+i}>
                <img src={item.img} alt={item.title} className="caim"/>
                {title}
              </div>
            );
          })}
        </div>
        <div className="car_indicator">
          {this.props.items.map((item, i)=>{
            return i==0
              ? (<span key={'indc'+i} className="i active"></span>)
              : (<span key={'indc'+i} className="i"></span>)
          })}
        </div>
      </div>
    );
  }
}