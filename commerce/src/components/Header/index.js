
import './style.scss'
import React from 'react';

export default class Header extends React.Component
{
  render(){
    const title = this.props.title||'陕西电子商务';
    var searhClass = this.props.showSearch?'hserh show':'hserh';
    return (
      <header className="c-main-header">
        <a className="ti">{title}</a>
        <a className="hserh">
          <span className="mui-icon mui-icon-search"></span>
        </a>
      </header>
    );
  }
}