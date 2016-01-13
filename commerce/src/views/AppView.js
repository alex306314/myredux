import React from 'react'


export default class AppView extends React.Component
{
  constructor(porps){
    super(porps)
  }
  render(){

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}