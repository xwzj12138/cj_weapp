import {config} from './config.js'
export class base{
  constructor(){
    this.baseRequestUrl = config.restUrl
  }
  //发送请求获取数据
  request(params){
    var url = this.baseRequestUrl + params.url
    if (!params.type) {
      params.type = 'GET';
    }
    params.data.token = wx.getStorageSync('token').token
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {'content-type': 'application/json'},
      success: function (res) {
        if(res.data.code!=200) {
          return wx.showToast({
            title: res.data.msg,
            icon: 'none',
            success: (cer) => {
              params.errCallBack && params.errCallBack(res.data);
            }
          })
        }
        params.sCallBack && params.sCallBack(res.data);
      },
      fail: function (err) {
        return wx.showToast({title: err,icon:'none'})
      }
    })
  }
}