// pages/my/cooperation/index.js
import cooperation from '../../../model/cooperation.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      company_name:'',
      product_name:'',
      linkman:'',
      wechat:'',
      remark:''
    }
  },
  /**
   * 设置输入的值
   */
  inputChange: function (e) {
    this.data.form[e.detail.name] = e.detail.value
    this.setData( this.data )
  },
  /**
   * 提交数据
   */
  handleClick:function(e){
    if (this.data.form.company_name == '') return wx.showToast({ title: '请输入公司名称' });
    if (this.data.form.product_name == '') return wx.showToast({ title: '请输入产品名称' });
    if (this.data.form.linkman == '') return wx.showToast({ title: '请输入联系人' });
    if (this.data.form.wechat == '') return wx.showToast({ title: '请输入微信号' });
    cooperation.add(this.data.form,(res)=>{
      wx.showToast({ title: '提交成功，工作人员会尽快联系您！' });
      setTimeout((res) => {
        wx.navigateBack({ delta: 1 })
      }, 1500);
    })
  }
})