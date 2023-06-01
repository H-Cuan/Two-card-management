// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changePassword(){
    wx.navigateTo({
      url: '../../pages/changePassword/changePassword',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.setData({
  image:"https://ts1.cn.mm.bing.net/th/id/R-C.eebe5ef277285d150546fd77d248786d?rik=wtPsZPj%2bvwPglw&riu=http%3a%2f%2fimg2.3png.com%2feebe5ef277285d150546fd77d248786d2a9e.png&ehk=ggdcfi3%2fAkgaM%2beoDnnNjW7Oa1kjvq0xFijaqH5fVm4%3d&risl=&pid=ImgRaw&r=0"
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