// pages/idEntity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 设置身份证号，姓名变量
    identity:{
      code:'',
      identity:'',
      name:'',
      sex:'',
      birthday:'',
      apply_phone:'',
      address:'', 
      photo:'',
      identity_front:'',
      identity_back:'',
      nation:'',
      indate:''
    }
  },
  wxfileTobase64(url, ishead = false) {
    return new Promise((reslove, reject) => {
        wx.getFileSystemManager().readFile({
            filePath: url, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
                reslove((ishead ? 'data:image/jpeg;base64,' : '') + res.data)
            },
            fail: err => {
                reject(err)
            }
        })
    })
},
  //orc识别成功后
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
      that.data.identity.identity_front = ress.data
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      e.detail.gender.text=='男'?e.detail.gender.text=2:e.detail.gender.text=1
      that.data.identity.nation= e.detail.nationality.text
      that.data.identity.birthday= e.detail.birth.text
      that.data.identity.sex= e.detail.gender.text
    that.data.identity.address= e.detail.address.text
     that.data.identity.identity= e.detail.id.text
     that.data.identity.name = e.detail.name.text
      that.setData({
        content:false,
        input:true,
        idNumber:e.detail.id.text,
        Name:e.detail.name.text,
        Gender:e.detail.gender.text=='1'?e.detail.gender.text='女':e.detail.gender.text='男',
        Nationality:e.detail.nationality.text,
        Address:e.detail.address.text,
        birthday:e.detail.birth.text
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    },
    fail:(res)=>{
      console.log(res)
    }
  })
},
fail(e){
  console.log(e)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      console.log(options)
    if(options.is_help){
        wx.setStorageSync('token', options.token)
      wx.setStorageSync('is_help', options.is_help)
    }else{
      wx.setStorageSync('is_help', 0)
    }
    console.log(wx.getStorageSync('is_help'))
    this.data.identity.apply_phone = wx.getStorageSync('phone')
   const info = wx.getStorageSync('Info')
   if (info!==''){
this.setData({
  content:false,
  input:true,
  idNumber:info.identity,
  Name:info.name,
  Gender:info.sex=='1'?info.sex='女':info.sex='男',
  Nationality:info.nation,
  Address:info.address,
  birthday:info.birthday,
})
   }else{
    this.setData({
      content:true,
      input:false,
      disabledInput:true,
      disabledInputI:true,
      disabledInputS:true,
      disabledInputN:true,
      disabledInputB:true,
      disabledInputA:true,
    })
   }
    
  },
  // input 可否输入
  canInputI(){
    this.setData({
      disabledInputI:false,
      focusI:true,
    })
  },
  canInputS(){
    this.setData({
      disabledInputS:false,
      focusS:true,
    })
  },
  canInputN(){
    this.setData({
      disabledInputN:false,
      focusN:true,
    })
  },
  canInputB(){
    this.setData({
      disabledInputB:false,
      focusB:true,
    })
  },
  canInputA(){
    this.setData({
      disabledInputA:false,
      focusA:true,
    })
  },
  canInput(e){
    console.log(e)
    this.setData({
      disabledInput:false,
      focus:true
    })
  },
  cantInputB(e){
    console.log(e)
    this.data.identity.birthday = e.detail.value
    this.setData({
      disabledInputB:true,
    })
  },
  // 修改的名字和身份证号
  cantInput(e){
    this.data.identity.nation = e.detail.value
    this.setData({
      disabledInputN:true,
    })
  },
  cantInputS(e){
    e.detail.value=='女'?e.detail.value=1: e.detail.value=2
    this.data.identity.sex =e.detail.value
    this.setData({
      disabledInputS:true,
    })
  },
  cantInputI(e){
    this.data.identity.identity = e.detail.value
    this.setData({
      disabledInputI:true,
    })
  },
  cantInputN(e){
    this.data.identity.name = e.detail.value
    this.setData({
      disabledInput:true,
    })
  },
  cantInputA(e){
    this.data.identity.address = e.detail.value
    this.setData({
      disabledInputA:true,
    })
  },
  //下一步到国徽面
  next(e){
    //设置缓存到人脸识别引用
    wx.setStorageSync('text',this.data.identity)
    wx.navigateTo({url:'../nationalEmblem/nationalEmblem'})
  },
  //重新上传
  UploadAgain(e){
    wx.setStorageSync('Info','')
    this.setData({
      content:true,
        input:false,
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
