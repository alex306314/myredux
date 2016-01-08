/**
 * 分类新闻列表
 */
import React from 'react';
import Header from '../components/Header'
import PullRefreshLoad from '../components/PullRefreshLoad'
import NewsList from '../components/NewsList'

export default class CategoryView extends React.Component
{

  render(){

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
        <Header showSearch={false} title="国内新闻" />

        <div className="mui-content headercon">
          <PullRefreshLoad>
            <NewsList items={indexNews} baseKey="category_list"/>
          </PullRefreshLoad>
        </div>
      </div>
    );
  }
}