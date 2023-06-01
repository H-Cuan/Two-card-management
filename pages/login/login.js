// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:'',
    password:'',
    queDing:'',
    checked:0
  },
login(e){
let tel = this.data.tel 
let password = this.data.password
if(this.data.checked==1){
  wx.request({
    url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/login',
    data: {
     tel,
     password
    },
    method:'POST',
    success:(res)=> {
      console.log(res)
      if(res.data.code == 200){
        wx.setStorageSync('token',res.data.data.token)
        wx.setStorageSync('type',res.data.data.type)
        wx.switchTab({url:'../applyList/applyList'})
      } else{
        wx.showToast({
          title: res.data.message,
          icon: 'error',
          mask:true,
          duration: 2000//持续的时间
        })
      }
    }
  })
}else{
  wx.showToast({
    mask:true,
    title: '请勾选用户服务协议',
    icon: 'error',
    duration: 2000//持续的时间
  })
}
},
inputphone(e){
      this.data.tel = e.detail.value
      console.log(this.data.tel)
},
inputpassword(e){
  console.log( this.data.password)
  this.data.password = e.detail.value
},
checkboxChange(e) {
  let checked =e.detail.value.length;
  console.log(checked);
  if (checked == 1) {
    this.data.checked = 1
  }else{
    this.data.checked = 0
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.setData({
  queDing:false,
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