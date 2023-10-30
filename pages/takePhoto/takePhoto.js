// pages/takePhoto/takePhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: 0,
    imgHeight: 0,
    imgTop: 0,
    imgLeft: 0,
  },
  takePhoto() {
    const that = this
    wx.getSystemInfo({
      success: function (res) {
      console.log(res)}
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.showLoading({
          title: '加载中',
          mask:true
        });
        console.log(res)
        wx.showLoading({
          title: '加载中',
          mask:true
        });
        console.log(res)
        that.tempToBase64(res.tempImagePath)
      }
    })
  },
  tempToBase64(e){
    wx.getFileSystemManager().readFile({
      filePath: e,
      encoding: 'base64',
      success: function(result) {
        const img = 'data:image/jpeg;base64,' + result.data
        console.log(img)
        setTimeout(function () {
          wx.hideLoading()
          let pages = getCurrentPages();//当前页面
let prevPage = pages[pages.length-2];//上一页面
prevPage.setData({//直接给上移页面赋值
  haveImg: 1,
  Base64Img:img
});
wx.navigateBack({//返回
  delta:1
})
        }, 2000)
      }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.ctx = wx.createCameraContext()
    let {windowWidth, windowHeight} = wx.getSystemInfoSync()
    console.log(windowWidth, windowHeight)
    var that = this;
    const query = wx.createSelectorQuery()
    query.select('.img').boundingClientRect()
    query.exec((res) => {
      console.log(res)
      that.setData({
        imgWidth: 550 / 750 * wx.getSystemInfoSync().windowWidth,
        imgHeight: 900 / 750 * wx.getSystemInfoSync().windowWidth,
        imgTop: 100 / 750 * wx.getSystemInfoSync().windowWidth,
        imgLeft: 100 / 750 * wx.getSystemInfoSync().windowWidth
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})