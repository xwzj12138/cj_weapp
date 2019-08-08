// pages/my/money/withdraw/index.js
import { user } from '../../../../model/model.js'
let userModel = new user();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now_brokerage:0,
    data:{
      money: '',
      extract_type: 1,
      real_name: '',
      account: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ now_brokerage: options.now_brokerage })
  },
  /**
   * 设置提现金额
   */
  inputChange:function(e){
    this.data.data[e.detail.name] = e.detail.value
    this.setData({ data: this.data.data})
  },
  /**
   * 提交数据
   */
  commit:function(){
    if (this.data.data.money=='') return wx.showToast({title: '请输入金额',icon:'none'});
    if (this.data.data.money>this.data.now_brokerage) return wx.showToast({ title: '余额不足', icon: 'none' });
    if (this.data.data.account == '') return wx.showToast({ title: '请输入微信账号', icon: 'none' });
    if (this.data.data.real_name =='') return wx.showToast({ title: '请输入名称', icon: 'none' });
    userModel.withdrawDeposit(this.data.data,(res)=>{
      wx.showToast({
        title: '提交成功',
      });
    })
  }
})