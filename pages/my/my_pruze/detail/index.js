// pages/my/my_pruze/detail/index.js
import { pruze} from '../../../../model/model.js';
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pruzeModel.getDetail({id:options.id},(res)=>{
      console.log(res.data)
    });
  }
})