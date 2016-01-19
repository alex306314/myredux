import Immutable from 'immutable'

const initalState = Immutable.fromJS({
  //当前选中菜单ID
  currentMenuId: 1,
  menuItems : [
    {id:1, title:'首页',href:'/'},
    {id:2, title:'电商资讯',href:'/news'},
    {id:3, title:'专家专栏',href:'/expert'},
    {id:4, title:'数据报告',href:'/data'},
    {id:5, title:'会议培训',href:'/conference'},
    {id:6, title:'创业融资',href:'/finance'},
  ],
  //首页轮播图片
  imageItems: [],
  //资讯列表
  newsList:{
    //menuID 所对应的资讯列表
    menu_id_1:[
      {id:1,img:g.assetBaseUrl+'muwu.jpg',title:'国务院常务会议解读：扩大跨境电子商务综合试点 赢得外贸新优势',
        des:'6日召开的国务院常务会议决定，将先行试点的中国（杭州）跨境电子商务综合试验区初步探索出的相关政策体系和管理制度，向更大范围推广。'},
      {id:2,img:g.assetBaseUrl+'muwu.jpg',title:'我要飞的更高',
        des:'要把修复长江生态环境摆在压倒性位置,共抓大保护商务综合试验区初步探索出的相关政策体系和管理'},
      {id:3,img:g.assetBaseUrl+'muwu.jpg',title:'我要飞的更高',
        des:'要把修复长江生态环境摆在压倒性位置,共抓大保护先行试点的中国（杭州）跨境电子商务综合'},
      {id:4,img:g.assetBaseUrl+'muwu.jpg',title:'我要飞在压倒性位置,共抓大保护先行的更高',
        des:'要把修复长江生态环境摆在压倒性位置,共抓大保护先行试点的中国（杭州）跨境电子商务综合'},
      {id:5,img:g.assetBaseUrl+'muwu.jpg',title:'倒性位置,共抓大保护先行的更高',
        des:'要把修复长江生态环境摆在压倒性位置,共抓大保护先行试点的中国（杭州）跨境电子商务综合'},
    ],
    menu_id_2:[],
    menu_id_3:[],
    menu_id_4:[],
    menu_id_5:[],
    menu_id_6:[]
  }
});

export default initalState;