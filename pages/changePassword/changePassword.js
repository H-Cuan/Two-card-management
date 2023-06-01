// pages/changePassword/changePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata:{
      token:'',
      password:'',
      password1:'',
      password2:'',
    }
  },
pw(e){
  this.data.formdata.password = e.detail.value
},
newpw(e){
  this.data.formdata.password1 = e.detail.value
},
qrnewpw(e){
  this.data.formdata.password2 = e.detail.value
},
savepw(){
let that = this
wx.request({
  url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/changePwd',
  data:this.data.formdata,
  method:'POST',
  success:res=>{
    console.log(res)
    if(res.data.code==200){
      wx.showToast({
        mask:true,
        title: res.data.message,
        icon: 'success',
        duration: 2000//持续的时间
      })
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    } else {
      this.setData({
        password:'',
        password1:'',
        password2:''
      })
      wx.showToast({
        mask:true,
        title: res.data.message,
        icon: 'error',
        duration: 2000//持续的时间
      })
    }
  }
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.formdata.token = wx.getStorageSync('token')
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