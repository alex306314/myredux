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
    this.scale = 1;
    this.content = "";
    this.isIphone = navigator.userAgent.match(/(iphone|ipad|mac)/i);

    this.win.html_font_size = 0;

    //是否有设定设计图大小对尺寸进行重置
    this.initWidth = typeof this.win.maxWidth == 'undefined' ? this.initWidth : this.win.maxWidth;

    //延时300秒回调
    setTimeout(this.init.bind(this), this.timeout);
    this.win.onresize = this.set;
  }

  init(){
    this.set();
    this.doc.querySelector('.preloading').style.display='none'
    //this.doc.querySelector("body").style.visibility = "visible";
    this.dispatch(document, 'viewReady');
  }

  set() {
    //如果是ios做缩放处理
    //if (this.isIphone) {
    //  //this.setScale();
    //}
    //暴露当前字体大小到全局变量
    this.win.html_font_size = this.initFontSize * this.win.innerWidth / this.initWidth;
    //设置文字大小
    this.doc.querySelector("html").style.fontSize = html_font_size + "px";
    //console.log(this.win)
  }

  /**
   * 根据devicePixelRatio设置缩放参数
   */
  setScale() {
    var r = this.win.devicePixelRatio
    if (2 == r || 3 == r) {
      this.scale = 1 / r;
    }
    this.content = "width=device-width,initial-scale=" + this.scale + ", maximum-scale=" + this.scale + ", minimum-scale=" + this.scale + ", user-scalable=no";
    this.doc.querySelector("meta[name=viewport]").setAttribute('content', content);
  }

  /**
   * 浏览器自定义事件触发
   * @param ele
   * @param type
   */
  dispatch(ele, type) {
    if (this.doc.all) {
      // IE浏览器支持fireEvent方法
      ele.fireEvent('on' + type, evt)
    } else {
      // 其他标准浏览器使用dispatchEvent方法
      var evt = this.doc.createEvent('HTMLEvents');
      // initEvent接受3个参数：
      // 事件类型，是否冒泡，是否阻止浏览器的默认行为
      evt.initEvent(type, true, true);
      ele.dispatchEvent(evt);
    }
  }
}

new SetView()





