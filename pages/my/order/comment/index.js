// pages/my/order/comment/index.js
import order from '../../../../model/order.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    goods_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
    this.getOrderGoodsList();
  },

  /**
   * 获取订单及商品列表
   */
  getOrderGoodsList:function(){
    let param = {id:this.data.id};
    order.goodsList(param,(res)=>{
      res.data.goods_list.forEach((e,i)=>{
        res.data.goods_list[i].product_score = 5;
        res.data.goods_list[i].express_score = 5;
      });
      this.setData(res.data)
    });
  }
})