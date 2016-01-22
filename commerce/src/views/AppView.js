import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as actionsCreators from '../actions'
import {
  Header,
  ISlideMenu,
} from '../components'

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

function mapStateToProps(state){
  return {
    header: state.appReducer.getIn(['header']),
    currentMenuId: state.appReducer.get('currentMenuId'),
    menuItems: state.appReducer.get('menuItems').toJS(),
  }
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actionsCreators, dispatch)
  }
}

class AppView extends React.Component
{
  constructor(porps){
    super(porps)
    this.initImageSlide()
  }
  componentDidMount(){
    $("#container").height(innerHeight+'px');
    $(document).on('dragstart',function(e){e.preventDefault()})
  }
  render(){

    return (
      <div>
        <Header showSearch={true} title={this.props.header}/>
        <ISlideMenu items={this.props.menuItems} currentMenuId={this.props.currentMenuId}/>

        <ReactCSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname
          })}
        </ReactCSSTransitionGroup>

      </div>
    );
  }
  initImageSlide(){
    let {setSlideImages} = this.props.actions;
    $.ajax({
      url: g.slideImagesUrl,
      type:'get',
      dataType:'json',
      success: function(data){
          setSlideImages(data)
      }
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);