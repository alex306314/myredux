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
      <ul className="i_news_list_ul">
        {items.map((item,i)=>{
          return (
            <li className="li b_d1" key={baseKey+i}>
              <a className="a">
                <div className="imgw">
                  <img className="img" src={item.img}/>
                </div>
                <div className="nbody">
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