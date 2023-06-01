// pages/applyList/applyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:''
  },
searchData(e){
console.log(e.detail.value)
this.data.name = e.detail.value
},
xiezhu(){
  wx.navigateTo({url:'../helpList/helpList'})
},
liebiao(){
  wx.navigateTo({url:'../List/List'})
},
search() {
  const searchText = this.data.name;
  if (searchText.trim() === '') {
    wx.request({
      url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/getBankList',
      data:{
        is_help:0,
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
      is_help:0,
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
onPullDownRefresh: function () {
  const that = this
    wx.request({
      url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/getBankList',
      data:{
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const that = this
    wx.request({
      url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/getBankList',
      data:{
        is_help:0,
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