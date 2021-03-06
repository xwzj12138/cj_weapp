// pages/publish/article/index.js
import { config } from '../../../utils/config.js'
import article from '../../../model/article.js';
import pay from '../../../model/pay.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{token:''},
    upload_api: '',
    data: { cate_id: 0, images: [], title: '', tel: '', latitude: 0, longitude: 0,  total_task_num: 1, every_task_price:1}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.data.cate_id = options.cate_id;
    this.data.formData.token = wx.getStorageSync('token').token;
    this.data.upload_api = config.restUrl + 'index/v1/upload';
    this.setData(this.data)
  },
  /**
   * 输入框值发生变化时的事件,电脑端暂时有问题,手机端没有问题
   */
  inputChange: function (e) {
    this.data.data[e.detail.name] = e.detail.value;
    this.setData(this.data)
  },
  /**
   * 上传图片相关
   */
  upload:function(e){
    if (e.detail.click_type == 'del') {
      this.data.data.images.splice(e.detail.index, 1);
      return this.setData(this.data);
    }
    this.data.data.images.push(e.detail.uploadResult.data.longUrl)
    this.setData(this.data)
  },
  /**
   * 提交数据
   */
  handleClick:function(){
    if (this.data.data.title == '') return wx.showToast({ title: '请输入标题', icon: 'none' });
    if (this.data.data.title.length>255) return wx.showToast({ title: '标题不能超过255字符', icon: 'none' });
    if (this.data.data.tel.length > 15) return wx.showToast({ title: '手机号错误', icon: 'none' });
    if(this.data.data.cate_id==7){
      if (this.data.data.total_task_num < 1 || this.data.data.total_task_num > 65535) return wx.showToast({ title: '任务数只能在1~65535之间', icon: 'none' });
      if (this.data.data.every_task_price <= 0.01) return wx.showToast({ title: '任务单价至少0.1元', icon: 'none' });
      //发布任务时提示用户需要支付金额
      let pay_money = Math.round(this.data.data.total_task_num * this.data.data.every_task_price * 100) / 100;
      wx.showModal({
        title: '提示',
        content: '您的发布的任务需要支付' + pay_money+'元,是否确认发布',
        success:(res)=> {
          if (res.confirm) {
            this.submit();
          }
        }
      })
    } else {
      this.submit();
    }
    
  },
  /**
   * 提交
   */
  submit:function(){
    wx.showLoading({ title: '提交中', mask: true });
    wx.getLocation({
      success: (res) => {
        this.data.data.latitude = res.latitude
        this.data.data.longitude = res.longitude
        article.publish(this.data.data, (res) => {
          if(this.data.data.cate_id==7){
            this.wechatPay(res);
          }else{
            this.submitAfter();
          }
        });
      },
      fail: (err) => {
        wx.hideLoading();
        wx.openSetting({
          fail: (set_err) => {
            wx.showToast({ title: '请在系统设置中打开定位功能', icon: 'none' });
          }
        });
      }
    })
  },
  /**
   * 发起支付
   */
  wechatPay:function(pay_info){
    pay_info.success = (result)=>{
      this.submitAfter();
    }
    pay_info.fail = (err) => {
      let param = { id: pay_info.pay_id };
      pay.cancel(param);
      wx.reLaunch({ url: '/pages/my/my_article/list/index'});
    }
    wx.requestPayment(pay_info);
  },
  /**
   * 提交后跳转页面
   */
  submitAfter:function(){
    wx.hideLoading();
    wx.showToast({ title: '提交成功，等待审核' });
    setTimeout((res) => {
      wx.switchTab({
        url: '/pages/article/list/index',
      });
    }, 1100);
  }
})