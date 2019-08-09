// pages/publish/index/index.js
import {article} from '../../../model/model.js'
let articleModel = new article();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取分类列表
    articleModel.getCateList({},(res)=>{
      this.setData({data:res.data})
    });
  },
  /**
   * 进入发布页面
   */
  goPublish:function(e){
    let url = '/pages/publish/pruze/index';
    if (e.currentTarget.dataset.id>0){
      url = '/pages/publish/article/index?cate_id=' + e.currentTarget.dataset.id;
    }
    return wx.navigateTo({url: url});
  }
})