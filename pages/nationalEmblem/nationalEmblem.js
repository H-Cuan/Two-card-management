// pages/nationalEmblem/nationalEmblem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PersonalInfo:{}
  },
 convertRangeToDate(rangeString) {
    //使用正则表达式从字符串中提取日期范围
    var matchArray = rangeString.match(/^(\d{4}\.\d{2}\.\d{2})-(\d{4}\.\d{2}\.\d{2})$/);
    
    //如果没有匹配到正确的日期范围，则返回空字符串
    if (matchArray == null) {
      return "";
    }
    
    //从匹配数组中提取后面的日期
    var dateString = matchArray[2];
    
    //去掉日期中的点号
    dateString = dateString.replace(/\./g, "");
    
    //返回格式为 “YYYYMMDD” 的日期字符串
    return dateString;
  },
  shooting(e){
    const that = this
      console.log(e)
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        success: function(res) {
          // 获取临时文件路径
          var tempFilePaths = res.tempFiles[0].tempFilePath;
          
          // 将临时文件转换成 base64 字符串
          wx.getFileSystemManager().readFile({
            filePath: tempFilePaths,
            encoding: 'base64',
            success: function(result) {
              wx.showLoading({
                title: '加载中',
                mask:true
              });
              console.log('Base64 string:', result.data);
              const img = 'data:image/jpeg;base64,' + result.data
            console.log(img)
              wx.request({
                url: 'https://lfzhnb.lfgw.net/ocr/ocridcard',
                method:'POST',
                data:{
                  Img:img,
                  IdcardType:'1'
                },
                success:(res)=>{
                  console.log(res)
                  that.setData({
                    input:true,
                    content:false,
                    footer:false,
                    validity: res.data.yxq,
                    Authority: res.data.fzjg
                  })
                  var rangeString = res.data.yxq
                  var dateString = that.convertRangeToDate(rangeString);
                    console.log(dateString);  //输出：20240825
                    var util = require('../../utils/util')
                    var time = util.formatTime(new Date())
                    time[1]<10?time[1]='0'+time[1]:time[1]=time[1]
                    time[2]<10?time[2]='0'+time[2]:time[2]=time[2]
                  var date = time[0]+''+time[1]+''+time[2]
                that.data.PersonalInfo.indate = res.data.yxq
console.log(date)
                setTimeout(function () {
                  wx.hideLoading()
                }, 1000)
                if (dateString > date ) {
          wx.setStorageSync('nation',  that.data.PersonalInfo)
          that.setData({
                    Indate:true,
                    NotIndate:false
                  })
                }else{
                  that.setData({
                    Indate:false,
                    NotIndate:true
                  })
                }
       
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
                }
              })
            },
            fail: function(error) {
              console.log('Failed to read file:', error);
            }
          })
        }
      })
    },
//识别成功
success(e){
  let that = this
  console.log(e)
  wx.uploadFile({
    url:'https://lfzhnb.lfgw.net/api.index/upload',
    filePath:e.detail.image_path,
    name: 'image',
    formData: {
      image:e.detail.image_path
    },
    success: (res)=>{
      console.log(res)
      const ress = JSON.parse(res.data)
      that.data.PersonalInfo.identity_back = ress.data
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      var util = require('../../utils/util')
        var time = util.formatTime(new Date())
        time[1]<10?time[1]='0'+time[1]:time[1]=time[1]
        time[2]<10?time[2]='0'+time[2]:time[2]=time[2]
      var date = time[0]+''+time[1]+''+time[2]
      var validDate = e.detail.valid_date.text.slice(9)
      let dateStr = e.detail.valid_date.text
      let startDate = formatDate(dateStr.substring(0, 8))
      let endDate = formatDate(dateStr.substring(9))
      function formatDate(dateStr) {
        let year = dateStr.substring(0, 4)
        let month = dateStr.substring(4, 6)
        let day = dateStr.substring(6, 8)
        return `${year}.${month}.${day}`
      }
      this.setData({
        input:true,
        content:false,
        footer:false,
        validity: startDate + '-' + endDate,
        Authority: e.detail.authority.text
      })
      this.data.PersonalInfo.indate =   startDate + '-' + endDate
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
      if (validDate > date ) {
wx.setStorageSync('nation',  this.data.PersonalInfo)
        this.setData({
          Indate:true,
          NotIndate:false
        })
      }else{
         this.setData({
          Indate:false,
          NotIndate:true
        })
      }
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
   const info = wx.getStorageSync('Info')
   console.log(info)
   if(info!==''){
    this.data.PersonalInfo = info
    this.setData({
      input:true,
      content:false,
      footer:false,
      validity: info.indate,
      Authority: '',
      Indate:true,
      NotIndate:false
    })
   }else{
    this.data.PersonalInfo = wx.getStorageSync('text')
    this.setData({
      input:false,
      content:true,
      footer:true,
      Indate:false,
      NotIndate:false
    })
   }

  },
   //重新上传
   UploadAgain(e){
    this.data.PersonalInfo = wx.getStorageSync('text')
    wx.setStorageSync('Info','')
    this.setData({
      footer:true,
      content:true,
      input:false,
    })
  },
  // 下一步跳转到人脸识别
  next(e){
    wx.navigateTo({url:'../veriface/veriface'})
  },
  //退出系统
  exit(e){
    wx.exitMiniProgram()
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