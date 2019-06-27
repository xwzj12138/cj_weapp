import { base } from '../utils/base.js'

export class cooperation extends base {
  constructor() {
    super();
  }
  //添加商务合作
  add(param, callback) {
    this.request({
      url: 'index/v1/applyCooperation/add',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
}