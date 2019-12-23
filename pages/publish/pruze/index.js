// pages/publish/pruze/index.js
import { config } from '../../../utils/config.js'
import { pruze } from '../../../model/model.js'
import { brand } from '../../../model/model.js';
let brandModel = new brand();
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time_list:['1天','2天','3天','4天','5天','6天','7天'],
    brand_list:[],
    brands:[],
    formData: { token: '' },
    upload_api: '',
    data: { pruze_name: '', image: '', grade: 0, brand_id: '', time: '', pruze_detail:[]}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.formData.token = wx.getStorageSync('token').token;
    this.data.upload_api = config.restUrl + 'index/v1/upload';
    this.setData(this.data);
    //获取品牌列表
    brandModel.getList((res)=>{
      res.forEach((item)=>{
        this.data.brands.push(item.brand_name);
      });
      this.setData({ brand_list: res, brands:this.data.brands});
    });
  },
  /**
   * 上传图片
   */
  uploadImage:function(e){
    if (e.detail.click_type=='del'){
      this.data.data.pruze_detail.splice(e.detail.index,1);
      return this.setData(this.data);
    }
    if (e.currentTarget.dataset.type=='image'){
      this.data.data.image = e.detail.uploadResult.data.longUrl;
    }else{
      this.data.data.pruze_detail.push(e.detail.uploadResult.data.longUrl);
    }
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
  setEndTime:function(e){
    this.data.data.time = e.detail.value
    this.setData(this.data)
  },
  /**
   * 设置品牌
   */
  setBrand:function(e){
    this.data.data.brand_id = e.detail.value
    this.setData(this.data)
  },
  /**
   * 提交数据
   */
  handleClick:function(){
    if (this.data.data.pruze_name=='') return wx.showToast({title: '请输入奖品名称',icon:'none'});
    if (this.data.data.image == '') return wx.showToast({ title: '请上传封面图片', icon: 'none'});
    if (this.data.data.end_time == '') return wx.showToast({ title: '请选择结束时间', icon: 'none' });
    if (this.data.data.pruze_detail.length == 0) return wx.showToast({ title: '请上传详情图', icon: 'none' });
    this.data.data.time++
    this.data.data.brand_id = this.data.brand_list[this.data.data.brand_id].id
    pruzeModel.publish(this.data.data,(res)=>{
      wx.reLaunch({url: '/pages/index/index/index'});
    })
  }
})