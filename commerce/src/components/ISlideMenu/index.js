/**
 * 滑动菜单
 * 需要:  hammer.js
 */
import './style.scss'
import React from 'react'
import {Link} from 'react-router'

const HFZ = html_font_size;

export default class ISlideMenu extends React.Component
{
  constructor(props){
    super(props)
    this.state = {
      id: g.utils.uuid(),
      width:props.width || 6.4,
      items: props.items || [],
      currentMenuId: props.currentMenuId || 1
    }
    //console.log(this.state.currentMenuId)
    this.$s = -1;
    this.hammer = -1;
    this.$ul = -1;
    this.totalWidth = 0;
    this.maxX = 0;
    this.x = 0;
    this.time = 1;
  }
  componentWillUnMount(){
    this.hammer.destroy();
    this.hammer = -1;
  }
  componentDidMount(){
    var self = this;
    this.$s = $('#'+this.state.id);
    this.$ul = this.$s.find('ul');

    this.$s.find('li').each(function(i,n){
      self.totalWidth += ($(n).width());
    });
    this.maxX = this.totalWidth - this.state.width*HFZ;

    this.initStyle()
    this.hammer = new Hammer(this.$s[0]);
    this.hammer.on('panstart', function(e){
      self.panStart(e);
    })
    this.hammer.on('panleft', function(e){
      self.panLeft(e);
    })
    this.hammer.on('panright', function(e){
      self.panRight(e);
    })
    this.hammer.on('panend', function(e){
      self.panEnd(e);
    })

    this.initActivePosition()
  }
  initStyle(){

  }
  //初始化菜单active项位置 显示到中间
  initActivePosition(){
    if(this.totalWidth<=this.state.width){ return } //可以全部显示不做处理

    var $a = this.$s.find('li.active'),
      $a = $a.length>0? $a :this.$s.find('li').eq(0).addClass('active'),
      activeLeft = $a.position().left,
      activeWidth = $a.width();
    if(activeLeft>(this.state.width-activeWidth)/2){
      var e = {deltaX:(activeLeft-(this.state.width*HFZ-activeWidth)/2)*(-1)};
      this.panStart(e);
      this.panLeft(e);
      this.panEnd(e);
    }
  }
  panStart(e){
    this.x = this.$ul.position().left;
  }
  panLeft(e){
    this.$ul.css({
      transform: 'translateX('+ (this.x+e.deltaX) +'px)',
      transition:'none'
    });
  }
  panRight(e){
    this.$ul.css({
      transform: 'translateX('+ (this.x+e.deltaX) +'px)',
      transition:'none'
    });
  }
  panEnd(e){
    var maxX = this.maxX * (-1);
    this.x = this.$ul.position().left;
    if(this.totalWidth<=this.state.width*HFZ || this.x>0){
      this.$ul.css({
        transform: 'translateX(0px)',
        transition:'transform 0.4s'
      });
    }
    if(this.totalWidth>this.state.width*HFZ && this.x<maxX){
      this.$ul.css({
        transform: 'translateX('+maxX+'px)',
        transition:'transform 0.4s'
      });
    }
  }
  render(){
    let lidom = [];
    for(var i in this.props.items){
      var item = this.props.items[i];
      var cls = item.id==this.state.currentMenuId ? 'active' : '';
      var dom = (
        <li key={'mni'+i} className={cls}>
          <Link to={item.href} onClick={this.onclick.bind(this)}>{item.title}</Link>
        </li>
      );
      lidom.push(dom);
    }

    return (
      <div id={this.state.id} className="islide_menu">
        <div className="ulw">
          <ul>
            {lidom}
          </ul>
        </div>
      </div>
    );
  }
  onclick(e){
    $('#'+this.state.id + ' li').removeClass('active')
    $(e.target).parent().addClass('active')
  }
}