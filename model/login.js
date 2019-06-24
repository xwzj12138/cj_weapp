import {base} from '../utils/base.js'
export class login extends base{
  constructor(){
    super();
  }
  getToken(){
    return wx.getStorageSync('token')
  }
  authLogin(params,callback){
    wx.login({
      success:res=>{
        params['code'] = res.code
        this.request({
          url: 'app/v1/login',
          type: 'POST',
          data: params,
          sCallBack: (result) => {
            let cache = { token: result.data.token}
            wx.setStorageSync('token', cache)
            callback && callback(result)
          }
        })
      }
    })
  }
}