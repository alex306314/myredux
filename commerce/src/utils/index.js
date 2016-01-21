window.g = window.g || {}

/**
 * 获取资讯列表
 * @returns {Promise}
 */
g.getListData = (menuId=1, page=1, perPage=10) => {
  return new Promise((resolve, reject)=>{
    $.ajax({
      url:g.listUrl,
      type:'get',
      data: {
        menuId: menuId,
        page:page,
        perPage:perPage
      },
      dataType:'json',
      success: (data)=>{
        var listData = {
          page:data.page,
          perPage:data.perPage,
          list:data.list,
        }
        resolve(listData);
      },
      error: (e)=>{
        reject(e)
      }
    });
  });
};