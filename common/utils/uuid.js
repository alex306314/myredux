
window.g = window.g || {};
g.utils = g.utils || {};

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
//生成唯一字串
g.utils.uuid = function () {
  return 'u' + new Date().getTime().toString()
    + s4()
}