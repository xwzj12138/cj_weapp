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
    cooperation.add(this.data.form,(res)=>{
      wx.showToast({ title: '提交成功，工作人员会尽快联系您！' });
      setTimeout((res) => {
        wx.navigateBack({ delta: 1 })
      }, 1500);
    })
  }
})