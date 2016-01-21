import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actionsCreators from '../actions'


function mapStateToProps(state){
  return {

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
    $(document).on('dragstart',function(e){e.preventDefault()})
  }
  render(){

    return (
      <div>
        {this.props.children}
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