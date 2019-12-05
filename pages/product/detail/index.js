// pages/product/detail/index.js
import product from '../../../model/product.js';
import { login } from '../../../model/model.js';
let loginModel = new login();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attr_value:null,
    select_attr_ids:[],
    buy_info: { buy_num: 1, source: 0, product_id: 0, sku_id: 0, attr_val_path:''},
    show_product_attr:false,
    price_array:[],
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.buy_info.product_id = options.id
    if (options.source) this.data.buy_info.source = options.source
    this.setData(this.data);
    loginModel.isLogin((res) => {
      this.getDetail();
    });
  },

  /**
   * 获取商品详情
   */
  getDetail:function(){
    let param = { id: this.data.buy_info.product_id};
    product.getDetail(param,(res)=>{
      this.setData({ detail: res.data, price_array: res.data.price.split('.')});
    });
  },
  /**
   * 收藏商品
   */
  collectGoods:function(){
    let param = { id: this.data.buy_info.product_id };
    product.collect(param, (res) => {
      this.data.detail.is_collect = !this.data.detail.is_collect;
      this.setData(this.data);
    });
  },

  /**
   * 显示规格
   */
  showProductAttr:function(){
    this.data.show_product_attr = !this.data.show_product_attr;
    this.setData(this.data)
  },

  /**
   * 选择规格
   */
  selectAttr:function(e){
    this.data.select_attr_ids[e.currentTarget.dataset.index] = e.currentTarget.dataset.id;
    //组合规格值
    this.data.buy_info.attr_val_path = this.data.select_attr_ids.join(',');
    //判断价格问题
    this.data.detail.sku_group.forEach((e)=>{
      if (e.attr_val_path == this.data.buy_info.attr_val_path){
        this.data.buy_info.sku_id = e.id
        this.data.attr_value = e;
      }
    });
    this.setData(this.data)
  },

  /**
   * 设置购买数量
   */
  setBuyNumber:function(e){
    this.data.buy_info.buy_num = e.detail.value
    this.setData({ buy_info:this.data.buy_info})
  },

  /**
   * 提交订单
   */
  submitOrder:function(){
    console.log(this.data.buy_info)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return { 
      title: this.data.detail.product_name,
      path: 'pages/product/detail/index?id=' + this.data.buy_info.product_id +'&source=2',
      imageUrl: this.data.detail.image
    }
  }
})