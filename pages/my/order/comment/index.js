// pages/my/order/comment/index.js
import order from '../../../../model/order.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    id:0,
    goods_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.token = wx.getStorageSync('token').token;
    this.setData(options);
    this.getOrderGoodsList();
  },

  /**
   * 获取订单及商品列表
   */
  getOrderGoodsList:function(){
    let param = {id:this.data.id};
    order.goodsList(param,(res)=>{
      res.goods_list.forEach((e,i)=>{
        res.goods_list[i].product_score = 5;
        res.goods_list[i].express_score = 5;
        res.goods_list[i].content = '';
        res.goods_list[i].image_list = [];
      });
      this.setData(res);
    });
  },
  /**
   * 输入选择框
   */
  inputChange:function(e)
  {
    this.data.goods_list[e.currentTarget.dataset.index][e.detail.name] = e.detail.value
    this.setData(this.data)
  },

  /**
   * 添加删除图片
   */
  upload: function (e) {
    //添加图片
    if (e.detail.click_type=='add'){
      this.data.goods_list[e.currentTarget.dataset.index].image_list.push(e.detail.uploadResult.data.longUrl);
    }else{
      //删除图片
      this.data.goods_list[e.currentTarget.dataset.index].image_list.splice(e.detail.index, 1);
    }
    this.setData(this.data);
  },
  /**
   * 提交
   */
  submit:function(){
    let param = { order_id: this.data.id, comment_list:[]};
    this.data.goods_list.forEach((e)=>{
      param.comment_list.push({ 
        product_id: e.product_id, product_score: e.product_score,content:e.content, 
        express_score: e.express_score,image_list:e.image_list
      });
    });
    order.comment(param,(res)=>{
      getApp().globalData.is_refresh = true;
      wx.navigateBack({});
    });
  }
})