import React from 'react'
import MainAppBar from '../components/MainAppBar'
import Headerbar from '../components/test'

export default class AppView extends React.Component
{
  render(){
    return (
      <div>
        <MainAppBar/>
        {this.props.children}
        <select onChange={this.onChange}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <Headerbar title="test title"/>
      </div>
    );
  }
  onChange(e){
    console.log(e.target.value)
  }
}