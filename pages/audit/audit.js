// pages/audit/audit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goBack:function(e){
    console.log(22)
   wx.reLaunch({
    url: '../applyList/applyList',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      inReview:false,
      approv:true,
      isHelp:false,
      auditFailure:false
    })
    console.log(wx.getStorageSync('is_help'))
    const help = wx.getStorageSync('is_help')
   if(help==1){
     this.setData({
      isHelp:true
     })
   }else{
    this.setData({
      isHelp:false
     })
   }
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