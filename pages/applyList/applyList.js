// pages/applyList/applyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    devId:'',
    status:'',
    device_id:''
  },
searchData(e){
console.log(e.detail.value)
this.data.name = e.detail.value
},
xiezhu(){
  if(this.data.status==1){
    wx.navigateTo({url:'../helpList/helpList'})
  }else{
    wx.showToast({
      title: '请先绑定设备',
      icon: 'error',
      mask:true,
      duration: 2000//持续的时间
    })
  }
 
},
liebiao(){
  if(this.data.status==1){
    wx.navigateTo({url:'../List/List'})
  }else{
    wx.showToast({
      title: '请先绑定设备',
      icon: 'error',
      mask:true,
      duration: 2000//持续的时间
    })
  }
 
},
search() {
  if(this.data.status==1){
    wx.showLoading({
      title: '加载中',
    });
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
          wx.hideLoading();
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
  }else{
    wx.showToast({
      title: '请先绑定设备',
      icon: 'error',
      mask:true,
      duration: 2000//持续的时间
    })
  }
 
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
bangdingshebei(e){
  this.data.devId=e.detail.value
console.log(e)
},
confirm(){
wx.request({
  url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/bindDevice',
  data:{
    token:wx.getStorageSync('token'),
    devce_id:this.data.devId,
  },
  success:res=>{
    console.log(res)
    if(res.data.code==200){
      wx.showToast({
        title: '添加成功',
        icon:'success',
        success:res=>{
          this.setData({
            show:false
          })
        }
      })
     
    }else{
      wx.showToast({
        title: res.data.message,
        icon:'error'
      })
    }
  }
})
},
bangding(e){
  this.setData({
    show:true
  })
},
toDetail(e){
  console.log(e)
  console.log(e.currentTarget.id)
  wx.setStorageSync('detail_id',e.currentTarget.id)
  wx.navigateTo({url:'../details/details'})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   if(wx.getStorageSync('is_first')==1){
    wx.showToast({
      title: '首次登陆，建议修改密码！',
      icon:'error',
      mask:true,
      duration:2000
    })
   }
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
    wx.setStorageSync('showBind',0)
    const that = this
    wx.request({
      url: 'https://lfzhnb.lfgw.net/api.TwoCardsPersonnel/checkBind',
      method:'POST',
      data:{
        token:wx.getStorageSync('token')
      },
      success:(res) =>{
        console.log(res)
        that.data.status = res.data.data.status
    if(res.data.data.status==1){
      wx.showLoading({
        title: '加载中',
      });
      wx.setStorageSync('device_Id', res.data.data.device_id)
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
            isShow:true,
            UNShow:false,
            list:res.data.data.list
          })
          wx.hideLoading();
        }
      })
    }else{
      this.setData({
        //UNShow:true,
        isShow:false,
      })
    }
      },
      fail:(res) =>{
        that.data.status = 0
      }
    })
   
  },
  cancel(){
    this.setData({
      show:false
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