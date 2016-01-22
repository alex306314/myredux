import './style.scss'
import React from 'react'
import history from '../../utils/history'

export default class DetailHeader extends React.Component
{
  constructor(props){
    super(props)
    this.state = {
      totalComment: props.totalComment || 0,
      totalDigg: props.totalDigg || 0
    }
  }
  componentDidMount(){
  }
  render(){
    return (
      <header className="detail_header" ref="header">
        <a className="btn btn_back" onClick={()=>{
        //$(".c-main-header").removeClass("hide")
        //$(".islide_menu").removeClass("hide")
        history.goBack()
        }}>
          <i className="fa fa-chevron-left"></i>
          <span className="tx">返回</span>
        </a>

        <a className="r btn btn_digg">
          <i className="fa fa-thumbs-up"></i>
          <span className="num">{this.state.totalDigg}</span>
        </a>
        <a className="r btn btn_comment">
          <i className="fa fa-commenting"></i>
          <span className="num">{this.state.totalComment}</span>
        </a>
        <a className="r btn btn_stars"><i className="fa fa-star"></i></a>
        <a className="r btn btn_share">
          <i className="fa fa-share-alt"></i>
        </a>
      </header>
    );
  }
}