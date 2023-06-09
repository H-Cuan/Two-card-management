// pages/faceImg/faceImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'1',
data:{
}
  },
  
//拍摄照片
 takePhoto() {
   const that =this
   wx.login({
    success :(res) =>{
    console.log(res.code)
    that.data.data.code = res.code 
  }
  })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        wx.uploadFile({
          url: 'https://lfzhnb.lfgw.net/api.index/upload', //上传服务器地址
          filePath: res.tempImagePath,
          name: 'image',
          formData: {
            'image': res.tempImagePath
          },
          success: (res) => {
            //上传成功
            console.log(res)
            const ress = JSON.parse(res.data)
            console.log(ress)
            that.data.data.photo = ress.data
            console.log(that.data.data)
            if(that.data.type==1){
              if(wx.getStorageSync('is_help')==0){
                that.data.data.device_id = wx.getStorageSync('device_Id')
                wx.request({
                  url: 'https://lfzhnb.lfgw.net/api.index/insertTwoCardBank',
                  data: that.data.data,
                  method:'POST',
                  success:(res)=> {
      console.log(res)
      if(res.data.code==200){
        wx.showToast({
          title: '上传成功！',
          icon: 'success',
          duration: 1500
      })
        wx.navigateTo({url:'../audit/audit'})
      }else{
        wx.showToast({
          title: '上传资料失败，请重新上传！',
          icon: 'error',
          duration: 1500
      })
      }
                  }
                })
              }else{
                that.data.data.token = wx.getStorageSync('token')
                wx.request({
                  url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/insertTwoCardBank',
                  data: that.data.data,
                  method:'POST',
                  success:(res)=> {
      console.log(res)
      if(res.data.code==200){
        wx.showToast({
          title: '上传成功！',
          icon: 'success',
          duration: 1500
      })
        wx.navigateTo({url:'../audit/audit'})
      }else{
        wx.showToast({
          title: '上传资料失败，请重新上传！',
          icon: 'error',
          duration: 1500
      })
      }
      
                  }
                })
              }
            }
            if(that.data.type==2){
              if(wx.getStorageSync('is_help')==0){
                that.data.data.device_id = wx.getStorageSync('device_Id')
                wx.request({
                  url: 'https://lfzhnb.lfgw.net/api.index/insertTwoCardService',
                  data: that.data.data,
                  method:'POST',
                  success:(res)=> {
                    if(res.data.code==200){
                      wx.showToast({
                        title: '上传成功！',
                        icon: 'success',
                        duration: 1500
                    })
                      wx.navigateTo({url:'../audit/audit'})
                    }else{
                      wx.showToast({
                        title: '上传资料失败，请重新上传！',
                        icon: 'error',
                        duration: 1500
                    })
                    }
                  }
                })
              }else{
                  that.data.data.token = wx.getStorageSync('token')
                wx.request({
                  url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/insertTwoCardService',
                  data: that.data.data,
                  method:'POST',
                  success:(res)=> {
                    if(res.data.code==200){
                      wx.showToast({
                        title: '上传成功！',
                        icon: 'success',
                        duration: 1500
                    })
                      wx.navigateTo({url:'../audit/audit'})
                    }else{
                      wx.showToast({
                        title: '上传资料失败，请重新上传！',
                        icon: 'error',
                        duration: 1500
                    })
                    }
                  }
                })
              }
            }
          },
        })
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.login({
      success :(res) =>{
      console.log(res.code)
    }
    })
    let that = this
    this.data.type = wx.getStorageSync('type')
    const text = wx.getStorageSync('nation')
    const Info = wx.getStorageSync('Info')
    Info!==''?this.data.data = Info:this.data.data = text
    this.data.data.is_help = wx.getStorageSync('is_help')
    this.data.data.wx_unionid = '2222'
    this.data.data.apply_phone = wx.getStorageSync('phone')
    this.setData({
      show:false
    })
    wx.showModal({
      title: '系统提示\r\n人脸核身通过请上传人像照片',
      success: res=> {
        console.log(res)
        if (res.confirm) {
          this.setData({
            show:true
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
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