import { auth } from './auth.js'


export default new class cooperation extends auth {
  constructor() { super(); }
  //添加商务合作
  add(param, callback) {
    this.request({ url: 'api/v1/applyCooperation/add', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}