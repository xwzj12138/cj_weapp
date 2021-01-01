import { auth } from './auth.js'

//推广品牌相关
export default new class brand extends auth {
  constructor() {
    super();
  }
  //添加 
  add(param, callback) {
    this.request({ url: 'api/v1/brand/add', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取
  getList(callback) {
    this.request({ url: 'api/v1/brand/get', method: 'POST', data: {}, sCallBack: (res) => { callback(res); } })
  }
  //修改品牌信息
  update(param, callback) {
    this.request({ url: 'api/v1/brand/update', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}