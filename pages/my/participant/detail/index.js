// pages/my/participant/detail/index.js
import pruze from '../../../../model/pruze.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status_list: ['待开奖', '未中奖', '待领取', '领取过期', '待发货','已发货','中奖'],
    pruze_info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取奖品信息
    pruze.participantDetail({id:options.id},(res)=>{
      console.log(res)
      let kd_info = [];
      res.kd_info.forEach((e)=>{
        kd_info.unshift(e);
      });
      res.kd_info = kd_info;
      this.setData({ pruze_info:res});
    });
  }
})