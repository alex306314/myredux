import React from 'react';

export default class Headerbar extends React.Component{
  render() {
    return (
      <header className="mui-bar mui-bar-nav">
        <a className="mui-icon mui-icon-back mui-icon-left-nav mui-pull-left"></a>
        <h1 id="title" className="mui-title">{this.props.title}</h1>
      </header>
    );
  }
}