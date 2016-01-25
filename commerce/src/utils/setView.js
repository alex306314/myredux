/**
 *
 */
class SetView
{
  constructor(){
    this.win = window;
    this.initFontSize = 100;
    this.initWidth = 640;
    this.timeout = 300;
    this.doc = this.win.document;

    this.win.html_font_size = 0;

    //是否有设定设计图大小对尺寸进行重置
    this.initWidth = typeof this.win.maxWidth == 'undefined' ? this.initWidth : this.win.maxWidth;

    //延时300秒回调
    setTimeout(this.init.bind(this), this.timeout);
    this.win.onresize = this.set;
    this.set();
  }

  init(){
    this.set();
    $('.preloading').remove();
    //this.doc.querySelector("body").style.visibility = "visible";
    $(document).trigger('viewReady');
    //this.dispatch(document, 'viewReady');
  }

  set() {
    var innerWidth = this.win.innerWidth>this.initWidth ? this.initWidth : this.win.innerWidth
    //暴露当前字体大小到全局变量
    this.win.html_font_size = this.initFontSize * innerWidth / this.initWidth;
    //设置文字大小
    //this.doc.querySelector("html").style.fontSize = html_font_size + "px";
    $('html').css({fontSize: html_font_size+'px'});
    //console.log(this.win)
  }

}

new SetView()





