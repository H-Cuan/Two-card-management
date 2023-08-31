// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:""
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
        show:false
      })
  },
  cancel(){
    this.setData({
      show:false
    })
  },
  exit(){
    wx.showModal({
      title:'系统提示',
      content:'确定要退出吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.clearStorageSync()
    wx.reLaunch({
      url: '../login/login',
    })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  confirm(){
    const that = this
    console.log(this.data.id)
      wx.request({
        url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/bindDevice',
        data:{
          topic:this.data.id,
          token:wx.getStorageSync('token')
        },
        method:'POST',
        success:res=>{
          console.log(res)
          if(res.data.code == '200'){
              wx.showToast({
                title: res.data.message,
                icon:'success',
                mask:true,
                complete(res){
                  that.setData({
                    show:false
                  })
                  wx.showModal({
                    title: '系统提示',
                    content: '请重新登陆获取绑定设备',
                    complete: (res) => {
                      if (res.cancel) {
                        
                      }
                  
                      if (res.confirm) {
                        wx.clearStorageSync()
                        wx.reLaunch({
                          url: '../login/login',
                        })
                      }
                    }
                  })
                }
              })
          
          }else{
            wx.showToast({
              title: res.data.message,
              icon:'error',
              mask:true,
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
   this.getInfo()
  },
getInfo(){
  const that = this
  wx.request({
    url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/center',
    method:'POST',
    data:{
      token:wx.getStorageSync('token'),
    },
    success:(res)=>{
      console.log(res)
      if(res.data.data.avatar!=''&&null){
        that.setData({
          image:res.data.data.avatar,
          name:res.data.data.name,
          tel:res.data.data.tel
      })
      }else{
        this.setData({
          image:"../../img/8303f71d3ddd2adc4917d445886f3a7.png",
          name:res.data.data.name,
          tel:res.data.data.tel
        })
      }
     
    }
  })
},
parseParams(path) {
  // 使用正则表达式匹配参数
  const regex = /id=(\d+)/;
  const match = path.match(regex);

  if (match) {
    // 获取匹配到的参数值
    const id = match[1];
    this.data.id = id
    console.log("id:", id);
  } else {
    console.log("未找到参数");
  }
},
bindingDevice(){
  wx.navigateTo({
    url: '../../pages/deviceList/deviceList',
  })
  // const that = this
  // wx.scanCode({
  //   onlyFromCamera: true,   //值为 false  既可以使用相机也可以使用相册，  值为true 只能使用相机
  //   success:(res) => { //扫码成功后
  //        console.log(res)
  //       //res.result		所扫码的内容
  //       //res.scanType		所扫码的类型
  //       //res.charSet		所扫码的字符集
  //       //res.path			当所扫的码为当前小程序二维码时，会返回此字段，内容为二维码携带的 path
  //       //res.rawData		原始数据，base64编码
  //       that.parseParams(res.path);
  //       this.setData({
  //         show:true
  //       })
  //       that.setData({
  //         deviceId:that.data.id
  //       })
  //     }
  //     })
},
  changeAvatar(e){
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'front',
      success(res) {
        console.log(res)
        wx.showLoading({
          title: '加载中',
          mask:true
        });
        wx.uploadFile({
          url: 'https://lfzhnb.lfgw.net/api.index/upload', //上传服务器地址
          filePath: res.tempFiles[0].tempFilePath,
          name: 'image',
          formData: {
            'image': res.tempFiles[0].tempFilePath
          },
          success: (res) => {
            const ress = JSON.parse(res.data)
            wx.request({
              url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/changeAvatar',
              method:'POST',
              data:{
                token:wx.getStorageSync('token'),
                avatar:ress.data
              },
              success:(e)=>{
                wx.hideLoading();
                console.log(e)
                if(e.data.code==200){
                  wx.showToast({
                    title: '更换成功',
                    icon:'success',
                    mask:true
                  })
                  that.onShow()
                }
              }
            })
          }
        })
      }
    })
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