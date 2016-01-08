/**
 * 图片轮播
 */

import './style.scss'
import React from 'react';

export default class ImageSlide extends React.Component {
  componentDidMount(){
    mui('#main_image_slide').slider({
      interval: 5000
    });
  }
  render() {
    const url = g.assetBaseUrl;
    const items = this.props.items || [],
      total = items.length;

    return (
      <div id="main_image_slide" className="mui-slider">
        <div className="mui-slider-group mui-slider-loop">

          <div className="mui-slider-item mui-slider-item-duplicate">
            <a>
              <img src={items[total-1]['img']}/>
              <p className="mui-slider-title">{items[total-1]['title']}</p>
            </a>
          </div>

          {items.map((item,i)=>{
            return (
              <div className="mui-slider-item" key={'mkeyslide_'+i}>
                <a>
                  <img src={item.img}/>
                  <p className="mui-slider-title">{item.title}</p>
                </a>
              </div>
            );
          })}

          <div className="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src={items[0]['img']}/>

              <p className="mui-slider-title">{items[0]['title']}</p>
            </a>
          </div>
        </div>
        <div className="mui-slider-indicator mui-text-right">
          {items.map((item,i)=>{
            var cls = i>0?"mui-indicator":"mui-indicator mui-active";
            return (
              <div className={cls} key={'sliidc'+i}></div>
            );
          })}
        </div>
      </div>
    )
      ;
  }
}