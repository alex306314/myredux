/**
 * 可滑动tab标签
 */
import './SlideMenu.scss';
import React from 'react';
import uuid from '../../../../common/utils/uuid';

export default class SlideMenu extends React.Component
{
  constructor(props){
    super(props)
    this.state = {
      uuid:uuid()
    }
  }
  componentDidMount(){
    //e.detail.slideNumber
    this.refs.slide.addEventListener('slide',
      this.props.menuClick||((e)=>console.log(e.detail.slideNumber)));
  }
  render(){
    const self = this;
    return (
      <div className="mui-slider my-slide-menu" ref="slide">
        <div className="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div className="mui-scroll">
            {(this.props.items||[]).map((item,i)=>{
                var cls = i>0 ? "mui-control-item":"mui-control-item mui-active";
                return (<a className={cls} href={'#'+self.state.uuid + '_' + i}
                           key={'k'+self.state.uuid+i}>{item}</a>)
            })}
          </div>
        </div>

        <div className="mui-slider-group">
          {(this.props.items||[]).map((item,i)=>{
            var cls = i>0 ? "mui-slider-item mui-control-content"
              :"mui-slider-item mui-control-content mui-active";
            return (<div id={self.state.uuid + '_' + i} className={cls}
                         key={'k_'+self.state.uuid+i}></div>);
          })}
        </div>

      </div>
    );
  }
}