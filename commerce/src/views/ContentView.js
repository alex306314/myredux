/**
 * 内容详页
 */
import React from 'react'
import { DetailHeader,IScrollPullRefresh  } from '../components'

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
  componentWillMount(){
    //$(".c-main-header").addClass("hide")
    //$(".islide_menu").addClass("hide")
    $("#container").addClass("detail_view");
  }
  componentWillUnMount(){
    $("#container").removeClass("detail_view");
  }
  render(){
    return(
      <div className="content_view">
        <DetailHeader />
        <IScrollPullRefresh
          height={(innerHeight-0.75*html_font_size)/html_font_size}
          showPullUpLoading={false}
          showPullDownRefresh={false}
          >
        <div className="big_imgw">
          <img src={this.state.img} alt={this.state.title}/>
        </div>
        <h2 className="con_ti">{this.state.title}</h2>
        <div className="con"
             dangerouslySetInnerHTML={this.createMarkup()}>
        </div>
        </IScrollPullRefresh>
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