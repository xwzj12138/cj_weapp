import { auth } from './auth.js'


// 文章相关
export default new class pay extends auth {
  constructor() { super(); }
  // 支付取消
  cancel(param, callback=null) {
    this.request({ url: 'api/v1/pay/cancel', type: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } })
  }
}