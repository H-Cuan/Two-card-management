// pages/deviceList/deviceList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
sn:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
                  that.onShow()
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
  cancel(){
    this.setData({
      show:false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const that = this
      wx.request({
        url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/checkBind',
        method:'POST',
        data:{
          token:wx.getStorageSync('token')
        },
        success:(res) =>{
          console.log(res)
          if(res.data.data.status === 1 ){
            console.log(222)
            that.data.sn = res.data.data.sn
            this.setData({
              bind:false,
              remove:true,
              deviceID:res.data.data.sn
            })
          } else {
            this.setData({
              bind:true,
              remove:false,
              deviceID:res.data.data.sn
            })
          }
        }
      })
  },
  removeDevice(){
    const that = this
    wx.showModal({
      title:'系统提示',
      content:'确定要解绑吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/unbind',
            method:'POST',
            data:{
              token:wx.getStorageSync('token'),
              sn:that.data.sn
            },
            success:(res)=>{
              console.log(res)
              if(res.data.code=='200'){
                wx.showToast({
                  title: res.data.message,
                  icon:'success',
                  mask:true,
                  complete(res){
                    that.onShow()
                  }
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindDevice(){
const that = this
  wx.scanCode({
    onlyFromCamera: true,   //值为 false  既可以使用相机也可以使用相册，  值为true 只能使用相机
    success:(res) => { //扫码成功后
         console.log(res)
        //res.result		所扫码的内容
        //res.scanType		所扫码的类型
        //res.charSet		所扫码的字符集
        //res.path			当所扫的码为当前小程序二维码时，会返回此字段，内容为二维码携带的 path
        //res.rawData		原始数据，base64编码
        that.parseParams(res.path);
        this.setData({
          show:true
        })
        that.setData({
          deviceId:that.data.id
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