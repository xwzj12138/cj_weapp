// pages/notice/index.js
import notice from '../../model/notice.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取通知信息内容
    notice.detail({id:options.id},(res)=>{
      this.setData({ content: res.content});
    });
  }
})