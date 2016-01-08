/**
 * 资讯列表
 */
import './style.scss'
import React from 'react';

export default class NewsList extends React.Component
{
  render(){
    const items = this.props.items;
    const baseKey = this.props.baseKey || 'mainlist'
    return (
      <ul className="mui-table-view myul-list">
        {items.map((item,i)=>{
          return (
            <li className="mui-table-view-cell mui-media" key={baseKey+i}>
              <a>
                <img className="mui-media-object mui-pull-left" src={item.img}/>
                <div className="mui-media-body">
                  <span className="liti">{item.title}</span>
                  <p className="lides">{item.des}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    )
  }
}