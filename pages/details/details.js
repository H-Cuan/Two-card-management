// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNumber:'',
    type:'',
      id:'',
      data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancel(){
    this.setData({
      show:false
    })
  },
  // 扫描银行卡
  blankSuccess(res){
    console.log(res)
    this.data.cardNumber = res.detail.number.text
    this.setData({
      value:this.data.cardNumber
    })
  },
  // 输入卡号
  inputNumber(e){
    this.data.cardNumber = e.detail.value

  },
  // 通过
  pass(){
    this.setData({
      show:true
    })
  },
  confirm(){
    if(this.data.type==1){
      let regex = /^([1-9]{1})(\d{15}|\d{18})$/; 
      console.log(this.data.cardNumber)
  if (regex.test( this.data.cardNumber)) {
    console.log('是银行卡号码');
    wx.request({
      url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/examineBank',
      data:{
        token:wx.getStorageSync('token'),
        bank_service_id: this.data.id,
        bank_card:this.data.cardNumber,
        status:'1',
      },
      method:"POST",
      success:(res)=>{
        console.log(res)
        if(res.data.code===200){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            mask:true,
            duration: 2000//持续的时间
          })
          this.setData({
            show:false
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            mask:true,
            duration: 2000//持续的时间
          })
        }
      },
      fail:res=>{
        console.log(res)
      }
    })
  } else {
    wx.showToast({
      title: '请输入正确的卡号',
      icon: 'error',
      mask:true,
      duration: 2000//持续的时间
    })
  }
    }
   if(this.data.type==2){
    let regex = /^1[3456789]\d{9}$/;
    console.log(this.data.cardNumber)
if (regex.test( this.data.cardNumber)) {
  console.log('是手机号码');
  wx.request({
    url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/examineService',
    data:{
      token:wx.getStorageSync('token'),
      service_service_id: this.data.id,
      tel_phone:this.data.cardNumber,
      status:'1',
    },
    method:"POST",
    success:(res)=>{
      console.log(res)
      if(res.data.code===200){
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          mask:true,
          duration: 2000//持续的时间
        })
        this.setData({
          show:false
        })
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'error',
          mask:true,
          duration: 2000//持续的时间
        })
      }
    },
    fail:res=>{
      console.log(res)
    }
  })
} else {
  wx.showToast({
    title: '请输入正确的卡号',
    icon: 'error',
    mask:true,
    duration: 2000//持续的时间
  })
}
   }
  },
  // 拒绝
  refuse(){
    if(this.data.type==1){
      wx.request({
        url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/examineBank',
        data:{
          token:wx.getStorageSync('token'),
          bank_service_id: this.data.id,
          status:'3',
        },
        method:"POST",
        success:res=>{
          if(res.data.code===200){
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              mask:true,
              duration: 2000//持续的时间
            })
            this.setData({
              show:false
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'error',
              mask:true,
              duration: 2000//持续的时间
            })
          }
        }
      })
    }
    if(this.data.type==2){
      wx.request({
        url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/examineService',
        data:{
          token:wx.getStorageSync('token'),
          service_service_id: this.data.id,
          status:'3',
        },
        method:"POST",
        success:res=>{
          if(res.data.code===200){
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              mask:true,
              duration: 2000//持续的时间
            })
            this.setData({
              show:false
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'error',
              mask:true,
              duration: 2000//持续的时间
            })
          }
        }
      })
    }

  },
  onLoad(options) {
    console.log(wx.getStorageSync('token'))
    this.data.id = wx.getStorageSync('detail_id')
    this.data.type = wx.getStorageSync('type')
    if(this.data.type===1){
      this.setData({
        category:'银行',
        saomiao:true
      })
    }
    if(this.data.type===2){
      this.setData({
        category:'手机',
        saomiao:false
      })
    }
    this.setData({
      abnormal:false
    })
    wx.request({
      url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/getUser',
      data:{
        id:this.data.id,
        type:this.data.type
      },
      method:"POST",
      success:(res)=>{
        console.log(res)
        res.data.data.sex===1?res.data.data.sex='女':res.data.data.sex='男'
        this.setData({
          data:res.data.data
        })
        if(res.data.data.status===3){
          this.setData({
            abnormal:true
          })
        }else{
          this.setData({
            abnormal:false
          })
        }
      }
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