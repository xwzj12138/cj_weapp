// pages/publish/pruze/index.js
import { config } from '../../../utils/config.js'
import { pruze } from '../../../model/model.js'
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    end_time_list:[{name:'1天',value:1}],
    formData: { token: '' },
    upload_api: '',
    data: { pruze_name: '', image: '', grade: '', brand_id: '', end_time: '', pruze_detail:[]}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.formData.token = wx.getStorageSync('token').token;
    this.data.upload_api = config.restUrl + 'index/v1/upload';
    // let date = new Date();
    // this.data.data.end_time_date = date.getFullYear();
    // this.data.data.end_time_date = this.data.data.end_time_date + '-' + date.getMonth();
    // this.data.data.end_time_date = this.data.data.end_time_date + '-' + date.getDate();
    this.setData(this.data)
  },
  /**
   * 上传封面图
   */
  uploadImage:function(e){
    this.data.data.image = e.detail.uploadResult.data.longUrl;
    this.setData(this.data)
  },
  /**
   * 上传详情图
   */
  uploadDetailImage: function (e) {
    this.data.data.pruze_detail.push(e.detail.uploadResult.data.longUrl);
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
   * 设置等级
   */
  setGrade:function(e){
    this.data.data.grade = e.detail.value
    this.setData(this.data)
  },
  /**
   * 设置结束日期
   */
  setEndTimeDate:function(e){
    this.data.data.end_time = e.detail.value
    this.setData(this.data)
  }
})