// pages/List/List.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signature:'',
    shifouyinhangka:false,
    shifoushoujika:false,
    gaozhiunConfirm:true,
    index:0,
    currentTab:0,
cardType:1,
name:'',
mchList:[
]
  },
  searchData(e){
    console.log(e.detail.value)
    this.data.name = e.detail.value
    },
    search() {
      const searchText = this.data.name;
      if (searchText.trim() === '') {
        wx.request({
          url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/getBankList',
          data:{
            is_help:1,
            type:wx.getStorageSync('type'),
            token:wx.getStorageSync('token')
          },
          method:'POST',
          success:(res)=>{
            console.log(res)
           for(let i =0 ;i<res.data.data.list.length;i++){
             if(res.data.data.list[i].sex == 1){
               res.data.data.list[i].sex = '女'
             } 
             if(res.data.data.list[i].sex == 2){
              res.data.data.list[i].sex = '男'
            } 
           }
            this.setData({
              list:res.data.data.list
            })
          }
        })
        return;
      }
      wx.request({
        url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/getBankList',
        data:{
          is_help:1,
          type:wx.getStorageSync('type'),
          token:wx.getStorageSync('token')
        },
        method:'POST',
        success:(res)=>{
          console.log(res)
         for(let i =0 ;i<res.data.data.list.length;i++){
           if(res.data.data.list[i].sex == 1){
             res.data.data.list[i].sex = '女'
           } 
           if(res.data.data.list[i].sex == 2){
            res.data.data.list[i].sex = '男'
          } 
         }
         const list = res.data.data.list.filter(item =>
          item.name.includes(searchText)
        );
        this.setData({ list });
        }
      })
    },
    toDetail(e){
      console.log(e.currentTarget.id)
      wx.setStorageSync('detail_id',e.currentTarget.id)
      wx.navigateTo({url:'../details/details'})
    },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad(options) {
       
      },
    
  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  cancel(){
    this.setData({
      unConfirm:true,
      typeShow:false,
    })
  },
  confirm(){
    wx.setStorageSync('cardType',this.data.cardType)
this.setData({
  gaozhi:true
})
  },
  bindPickerChange(e){
    console.log(e)
    e.detail.value=='0'? this.data.cardType=1 : this.data.cardType=2
    console.log(this.data.cardType)
    wx.setStorageSync('cardType',this.data.cardType)
    this.setData({
      unConfirm:false,
      index: e.detail.value,
    })
  },
  opeanCard(){
    this.setData({
      typeShow:true
    })
  },
  swichNav: function (e) {
    console.log(e);
    var that = this;
    if(e.target.dataset.current=="0"){
      wx.setStorageSync('showBind',0)
    }else if(e.target.dataset.current=="1"){
      wx.setStorageSync('showBind',1)
    }else{
      wx.setStorageSync('showBind',2)
    }
    if(e.target.dataset.current=="0"){
      this.data.cardType=1
    }else if(e.target.dataset.current=="1"){
      this.data.cardType=2
    }else{
      this.data.cardType=3
    }
    console.log(this.data.cardType)
    this.getList()
    if (this.data.currentTab === e.target.dataset.current) {
    return false;
    } else {
    that.setData({
    currentTab: e.target.dataset.current,  
    })
  }
    },
  getList(){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/getBankList',
      data:{
        apply_type:this.data.cardType,
        is_help:1,
        type:wx.getStorageSync('type'),
        token:wx.getStorageSync('token')
      },
      method:"POST",
      success:(res)=>{
        console.log(res)
       for(let i =0 ;i<res.data.data.list.length;i++){
         if(res.data.data.list[i].sex == 1){
           res.data.data.list[i].sex = '女'
         } 
         if(res.data.data.list[i].sex == 2){
          res.data.data.list[i].sex = '男'
        } 
       }
        this.setData({
          list:res.data.data.list
        })
        wx.hideLoading();
      }
    })
  },
  catchTouchMove() { return false; },
   toSignature(){
    wx.removeStorageSync('signature')
    wx.navigateTo({
      url: '../signature/signature',
    })
  },
  gaozhicancel(){
this.setData({
  gaozhi:false,
  gaozhiunConfirm:true
})
  },
  gaozhiconfirm(){
    wx.showModal({
      title: '联系方式',
      editable:true,
      placeholderText:'请输入联系方式',
      complete: (res) => {
        console.log(res)
        if (res.cancel) {
        }
        if (res.confirm) {
          let regex = /^1[3456789]\d{9}$/;
          if(regex.test(res.content)){
            wx.setStorageSync('Info','')
            wx.setStorageSync('phone',res.content)
            wx.setStorageSync('signature',this.data.signature)
            const token = wx.getStorageSync('token')
          wx.navigateTo({url:'../idEntity/idEntity?is_help=1&token=' + token}
          )
          }else{
            wx.showModal({
              title: '系统信息',
              content: '请输入正确的手机号!',
              complete: (res) => {
                if (res.cancel) {
                  
                }
            
                if (res.confirm) {
                  
                }
              }
            })
          }
        
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.getStorageSync('type')==1?this.setData({
      shifouyinhangka:true,
      showSwichNav:true,
        mchList: [
          {
            id:1,
            name:'身份核验'
          },
          {
            id:2,
            name:'办卡核验'
          },
          {
            id:3,
            name:'大额取现'
          }
        ]
    }):this.setData({
      shifoudianhuaka:true,
      mchList: [
        {
          id:1,
          name:'身份核验'
        },
        {
          id:2,
          name:'办卡核验'
        }
      ],
      shifoushoujika:true,
      showSwichNav:false
    })
    const that = this
    let pages = getCurrentPages();
    let currPage = pages[pages.length-1];
    console.log(currPage)
    that.setData({
      signature:currPage.data.signature
    })
    this.data.signature = currPage.data.signature
    if(currPage.data.canInto==1){
      this.setData({gaozhiunConfirm:false})
    }else{
      this.setData({gaozhiunConfirm:true})
    }
    wx.setStorageSync('showBind',1)
   this.getList()
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
  onShareAppMessage(e) {
console.log(e)
  }
})