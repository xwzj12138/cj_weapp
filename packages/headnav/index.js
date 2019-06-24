// packages/headnav/index.js
Component({
  pageLifetimes:{},
  lifetimes:{
    ready() {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({ statusBarHeight: res.statusBarHeight })
        }
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 每一行多少给item
    body: {
      type: Number,
      value: 50
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight:20
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
