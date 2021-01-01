import {config} from './config.js'
export class base{
  constructor(){
    this.baseRequestUrl = config.restUrl
  }
  //发送请求获取数据
  request(params){
    params.url = this.baseRequestUrl + params.url;
    params.method = params.method?params.method:'GET';
    params.success = (res)=>{
      if(res.data.code!=200) {
        return wx.showToast({
          title: res.data.msg,
          icon: 'none',
          success: (cer) => {
            params.errCallBack && params.errCallBack(res.data);
          }
        });
      }
      params.sCallBack && params.sCallBack(res.data.result);
    }
    params.fail = (error)=>{
      return wx.showToast({title: error,icon:'none'})
    }
    wx.request(params);
  }
}