import Immutable from 'immutable'

const initalState = Immutable.fromJS({
  header:'陕西电子商务',   //标题
  //当前选中菜单ID
  currentMenuId: 1,
  menuItems : {
    1:{id:1, title:'首页',href:'/'},
    2:{id:2, title:'电商资讯',href:'/news'},
    3:{id:3, title:'专家专栏',href:'/expert'},
    4:{id:4, title:'数据报告',href:'/data'},
    5:{id:5, title:'会议培训',href:'/conference'},
    7:{id:7, title:'创业融资',href:'/finance'},
  },
  //首页轮播图片
  imageItems: [],
  //资讯列表
  newsList:{
    //menuID 所对应的资讯列表
    menu_id_1:{page:1, perPage:10, list:[]},
    menu_id_2:{page:1, perPage:10, list:[]},
    menu_id_3:{page:1, perPage:10, list:[]},
    menu_id_4:{page:1, perPage:10, list:[]},
    menu_id_5:{page:1, perPage:10, list:[]},
    menu_id_7:{page:1, perPage:10, list:[]},
  }
});

export default initalState;