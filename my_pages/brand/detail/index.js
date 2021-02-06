// pages/my/brand/detail/index.js
import brand from '../../../model/brand.js';
import { config } from '../../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: { token: '' },
    upload_api: '',
    form:{
      id: 0, brand_name: '', qrcode: '', intro:''
    }
  },
  /**
   * 输入框值发生变化时的事件,电脑端暂时有问题,手机端没有问题
   */
  inputChange: function (e) {
    this.data.form[e.detail.name] = e.detail.value;
    this.setData(this.data);
  },
  /**
   * 上传封面图
   */
  uploadImage: function (e) {
    this.data.form.qrcode = e.detail.uploadResult.data.longUrl;
    this.setData(this.data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.data.form.id = options.id;
      this.data.form.brand_name = options.brand_name;
      this.data.form.qrcode = options.qrcode;
      this.data.form.intro = options.intro;
    }
    this.data.formData.token = wx.getStorageSync('token').token;
    this.data.upload_api = config.uploadUrl;
    this.setData(this.data)
  },
  /**
   * 添加品牌
   */
  submit:function(){
    if (this.data.form.brand_name == '') return wx.showToast({ title: '请输入品牌名称', icon: 'none' });
    if (this.data.form.qrcode == '') return wx.showToast({ title: '请上传品牌logo', icon: 'none' });
    if(this.data.form.id>0){
      return brand.update(this.data.form, (res) => {
        getApp().globalData.is_refresh = true;
        wx.navigateBack({});
      });
    }
    brand.add(this.data.form, (res) => {
      getApp().globalData.is_refresh = true;
      wx.navigateBack({});
    });
  }
})