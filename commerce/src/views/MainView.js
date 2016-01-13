import React from 'react'
import Header from '../components/Header'
//import PullRefresh from '../components/PullRefresh'
import IScrollPullRefresh from '../components/IScrollPullRefresh'

//import ReactPullToRefresh from 'react-pull-to-refresh'
import history from '../utils/history';

export default class MainView extends React.Component
{
  componentDidMount(){
  }
  render(){
    var items = ['首页','国内新闻','国际新闻','经济时报','经济半小时','哈哈哈'];
    var imageItems = [
      {img:g.assetBaseUrl+'muwu.jpg',title:'我要飞的更高'},
      {img:g.assetBaseUrl+'muwu.jpg',title:'我爱北京天安门'},
      {img:g.assetBaseUrl+'muwu.jpg',title:'将进酒'}
    ];
    var indexNews = [
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
    ];


    return (
      <div>
        <Header showSearch={true}/>

        <div className="mui-content headercon">
          <IScrollPullRefresh
            height={innerHeight-44}
            >

            <div className="mainrecti">热门推荐</div>
            <ul className="sample">
              <li>列表项1</li>
              <li>列表项2</li>
              <li>列表项3</li>
              <li>列表项4</li>
              <li>列表项5</li>
              <li>列表项6</li>
              <li>列表项7</li>
              <li>列表项8</li>
              <li>列表项9</li>
              <li>列表项10</li>
              <li>列表项11</li>
              <li>列表项12</li>
              <li>列表项13</li>
              <li>列表项14</li>
              <li>列表项15</li>
            </ul>

          </IScrollPullRefresh>
        </div>
      </div>
    );
  }
  menuClick(e){
    const index = e.detail.slideNumber;
    history.push('/category')
  }
  handleRefresh(resolve, reject) {
    // do some async code here
    setTimeout(function(){
      if (1) {
        resolve();
      } else {
        reject();
      }
    },2000);

  }
}