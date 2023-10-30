// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signature:'',
    cardNumber:'',
    type:'',
    showBind:false,
      id:'',
      data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancel(){
    this.setData({
      show:false,
      signatureShow:false
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
      url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/entryBank',
      data:{
        token:wx.getStorageSync('token'),
        bank_service_id: this.data.id,
        bank_card:this.data.cardNumber,
      },
      method:"POST",
      success:(res)=>{
        console.log(res)
        if(res.data.code==='200'){
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
    url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/entryService',
    data:{
      token:wx.getStorageSync('token'),
      service_service_id: this.data.id,
      tel_phone:this.data.cardNumber,
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
   timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
  },
  downLoadNotification(){
    wx.setStorageSync('qianming', this.data.signature)
  wx.navigateTo({
    url: '../../pages/saveSignature/saveSignature',
  })
// this.setData({
//   signatureShow:true
// })
  },
  confirmSignature(){
    this.downloadImage()
  },
  // 在小程序页面中的方法中调用下载图片的函数
downloadImage: function() {
  var that = this;
  wx.downloadFile({
    url: that.data.signature,
    success: function(res) {
      if (res.statusCode === 200) {
        // 保存图片到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function() {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
          },
          fail: function() {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    },
    fail: function(res) {
      console.log(res)
      wx.showToast({
        title: '下载失败',
        icon: 'error',
        duration: 2000
      });
    }
  });
},
clickSignature: function(e){
  var imgUrl = this.data.signature;
  wx.previewImage({
    urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
    current: '', // 当前显示图片的http链接，默认是第一个
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
},
clickImg: function(e){
  var imgUrl = this.data.imgUrl;
  wx.previewImage({
    urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
    current: '', // 当前显示图片的http链接，默认是第一个
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
},
  onLoad(options) {
    if(wx.getStorageSync('showBind')==1){
      this.setData({
        showBind:true
      })
    }
    const that = this
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
        that.data.imgUrl = res.data.data.photo
        that.data.signature = res.data.data.signature
        var date = new Date(res.data.data.update_time * 1000); // 将时间戳转换为毫秒级别
var year = date.getFullYear(); // 获取年份
var month = date.getMonth() + 1; // 获取月份，注意月份从0开始，所以需要加1
var day = date.getDate(); // 获取日期
var hours = date.getHours(); // 获取小时
var minutes = date.getMinutes(); // 获取分钟
var seconds = date.getSeconds(); // 获取秒钟

// 格式化为yy-mm-dd hh:mm:ss格式
var formatted_date = year.toString().substring(0) + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

console.log(formatted_date);
         res.data.data.update_time = formatted_date
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