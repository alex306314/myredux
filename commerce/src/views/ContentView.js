/**
 * 内容详页
 */
import React from 'react'
import { DetailHeader } from '../components'

export default class ContentView extends React.Component
{
  constructor(props){
    super(props)
    //console.log(this)
    this.state = {
      id: props.routeParams.id || 0,
      img: '',
      title: '',
      content:''
    }
    this.getContent();
  }
  render(){
    return(
      <div className="content_view">
        <DetailHeader />
        <div className="big_imgw">
          <img src={this.state.img} alt={this.state.title}/>
        </div>
        <h2 className="con_ti">{this.state.title}</h2>
        <div className="con"
             dangerouslySetInnerHTML={this.createMarkup()}>
        </div>
      </div>
    );
  }
  createMarkup() { return {__html: this.state.content} }
  getContent(){
    var self = this;
    $.ajax({
      url:g.contentUrl,
      type:'get',
      data:{id: this.state.id},
      dataType:'json',
      success: function(data){
        self.setState({
          img:data.img,
          title: data.title,
          content: data.content
        });
      }
    });
  }
}