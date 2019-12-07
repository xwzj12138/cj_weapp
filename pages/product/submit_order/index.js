import product from '../../../model/product.js';
import userAddress from '../../../model/userAddress.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: { attr_val_path: "", buy_num: 0, product_id: 0, sku_id: 0, source: 0, postage:0,pay_money:0},
    address_info:{},
    product_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.pay_money = 0;
    this.setData({ form:options});
    this.orderPreview();
  },

  /**
   * 获取订单预览信息
   */
  orderPreview(){
    product.order_preview(this.data.form,(res)=>{
      //计算支付价格
      res.data.forEach((e)=>{
        this.data.form.pay_money += e.price
      });
      this.setData({ product_list: res.data,form:this.data.form});
    });
  },

  /**
   * 支付
   */
  pay:function(){
    if(!this.data.address_info.id) return wx.showToast({title: '请设置收货地址',icon:'none'});
    product.pay(this.data.form,(res)=>{
      console.log(res);
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userAddress.getDefault((res)=>{
      this.setData({ address_info:res.data})
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})