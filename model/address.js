import { base } from '../utils/base.js'

export class address extends base {
  constructor() {
    super();
  }
  //获取地址列表
  getList( callback) {
    this.request({
      url: 'index/v1/address/get',
      type: 'POST',
      data:{},
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //添加地址
  add(param, callback) {
    this.request({
      url: 'index/v1/address/add',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //修改地址
  update(param, callback) {
    this.request({
      url: 'index/v1/address/update',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //删除地址
  del(param, callback) {
    this.request({
      url: 'index/v1/address/del',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //设置默认地址
  setDefault(param, callback) {
    this.request({
      url: 'index/v1/address/setDefault',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
}