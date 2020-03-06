import product from '../../../model/product.js';
import userAddress from '../../../model/userAddress.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: { attr_val_path: "", buy_num: 0, product_id: 0, sku_id: 0, source: 0, postage: 0, pay_money: 0, source:0},
    address_info:null,
    product_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.pay_money = 0;
    options.source = getApp().globalData.source;
    this.setData({ form:options});
    this.orderPreview();
  },

  /**
   * 获取订单预览信息
   */
  orderPreview(){
    product.order_preview(this.data.form,(res)=>{
      //计算支付价格
      res.forEach((e)=>{
        this.data.form.pay_money = this.data.form.pay_money + e.price * this.data.form.buy_num
      });
      this.setData({ product_list: res,form:this.data.form});
    });
  },

  /**
   * 支付
   */
  pay:function(){
    if(this.data.address_info==null) return wx.showToast({title: '请设置收货地址',icon:'none'});
    product.pay(this.data.form,(res)=>{
      res.success = (result)=>{
        wx.redirectTo({ url: '/pages/my/order/list/index'});
      }
      res.fail = (result) => {
        wx.showToast({title: '支付失败',icon:'none'});
        setTimeout((res) => {
          wx.reLaunch({ url: '/pages/my/order/list/index' });
        }, 1100);
      }
      wx.requestPayment(res);
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userAddress.getDefault((res)=>{
      this.setData({ address_info:res})
    });
  }
})