// pages/veriface/veriface.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  touxiang(){
    wx.navigateTo({url:'../idEntity/idEntity'})
  },
  guohui(){
    wx.navigateTo({url:'../nationalEmblem/nationalEmblem'})
  },
  takePhoto(e) {
    const ctx = wx.createCameraContext();
    var that = this;
    ctx.takePhoto({
     quality: 'high',
     fail: (res) => {
     //res.tempImagePath表示获取到的图片地址
     console.log(res)
    }
  }); 
  },
veriface(e){
  const that = this
  wx.checkIsSupportFacialRecognition({
    success(res) {
      const idMes = wx.getStorageSync('nation')
      console.log(idMes)
      const Info = wx.getStorageSync('Info')
      console.log(Info)
      if (Info!==''){
        wx.startFacialRecognitionVerify({
          name: Info.name, // 身份证名称
          idCardNumber: Info.identity, // 身份证号码
          checkAliveType: 2, // 1:读数字（默认值）；2:屏幕闪烁
          success: function(resFacial) {
            console.log(resFacial)
            wx.navigateTo({url:'../faceImg/faceImg'})
            if (resFacial.errCode == 0) {
              // 人脸识别成功之后调用个人信息保存接口
              that.saveInfo()
            } else {
              Toast(resFacial.errMsg)
            }
          },
          fail: err => {
            console.log(err)
            if (err.errCode == 90100) Toast('用户已取消！')
            else Toast('人脸识别失败！')
          }
        })
      }else{
        const idMes = wx.getStorageSync('nation')
        wx.startFacialRecognitionVerify({
          name: idMes.name, // 身份证名称
          idCardNumber: idMes.identity, // 身份证号码
          checkAliveType: 2, // 1:读数字（默认值）；2:屏幕闪烁
          success: function(resFacial) {
            console.log(resFacial)
            wx.navigateTo({url:'../faceImg/faceImg'})
            if (resFacial.errCode == 0) {
              // 人脸识别成功之后调用个人信息保存接口
              that.saveInfo()
            } else {
              Toast(resFacial.errMsg)
            }
          },
          fail: err => {
            console.log(err)
            if (err.errCode == 90100) Toast('用户已取消！')
            else Toast('人脸识别失败！')
          }
        })
      }
      
     
    },
    fail(res) {
      console.log('判断是否支持人脸识别功能错误回调：', res)
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   const idMes = wx.getStorageSync('nation')
      console.log(idMes)
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