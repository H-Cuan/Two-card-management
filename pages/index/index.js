// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    id:'',
    type:'',
    bankName:'',
    location:'',
    phoneNumber:'',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    
  },
  
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
    
  },
  // 获取手机号
  getPhoneNumber (e) {
    let detail = e.detail;
    console.log(detail);
    const that = this
    if (detail.errMsg === "getPhoneNumber:ok") {
        console.log('用户同意授权');
        let code = detail.code; // 动态令牌
        console.log(code);
        
        wx.request({
            url: 'https://lfzhnb.lfgw.net/admin.TwoCardsWx/getPhoneNumber',
            data: {
                code:code
            },
           success :(res)=>  {
             console.log(res)
              if(res.data.code==200){
                this.setData({
                  phoneNumber:res.data.phone,
                  unInput:true,
                  closeShow:false
                })
              that.data.phoneNumber = res.data.phone
              console.log(that.data.phoneNumber)
              // 后端返回解析出的手机号，或者直接返回登录成功的信息
              } else {
                wx.showToast({
                  title: '获取失败,请输入手机号',
                  icon: 'error',
                  duration: 2000//持续的时间
                })
              }
          
            },
            fail:res=>{
              wx.showToast({
                title: '获取失败,请输入手机号',
                icon: 'error',
                duration: 2000//持续的时间
              })
            }
        })
    } else {
        console.log('用户拒绝授权');
    }
},
into(){
  this.setData({
    closeDialog:false,
    closeModalS:false,
    closeModalS:false,
    position:'relative',
    show:true
  })
},
  rescan(e){
    this.setData({
      closeModalS:false
    })
  this.exit()
  },
  closeM(e){
    this.setData({
      closeModalS:false,
      position:'relative',
    })
  },
  //扫码识别银行
  Ewm(e){
    wx.scanCode({
      success:(res)=>{
        console.log(res)
        console.log(res.result)
      }
    })
  },
  checkboxChange(e) {
    let checked =e.detail.value.length;
    console.log(checked);
    if (checked == 1) {
      this.setData({disabled:false})
    }else{
      this.setData({disabled:true})
    }
   
    
  },
  inputphone(e){
    if(e.detail.value.length == 11){
      if (!(/^1[3456789]\d{9}$/.test(e.detail.value))){
        wx.showToast({
          title: '请输入正确的手机号',
          icon: "error",
          duration: 2000
         })
        this.setData({
            closeShow:true
        })
      }else{ 
        this.data.phoneNumber = e.detail.value
        console.log(this.data.phoneNumber)
        this.setData({
          closeShow:false
        })
      }
    }else{ 
      this.setData({
        closeShow:true
      })
    }
  },
  // 实名认证
  Certification(e){
    console.log(this.data.phoneNumber)
      wx.setStorageSync('phone',this.data.phoneNumber)
      const that = this
      wx.login({
        success :(res) =>{
        console.log(res.code)
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://lfzhnb.lfgw.net/api.index/checkOpenid',
              data:{
                code : res.code,
                type : that.data.type
              },
              method:'POST',
              success :(res)=>{
                  console.log(res)
                  if(res.data.code=='200'){
                    wx.setStorageSync('Info',res.data.data)
                    wx.navigateTo({url: '../veriface/veriface'})
                  }else{
                    wx.setStorageSync('Info','')
                    wx.navigateTo({url:'../idEntity/idEntity'})
                  }
              },
              fail:(res)=>{
                wx.setStorageSync('Info','')
                wx.navigateTo({url:'../idEntity/idEntity'})
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
  },
  // 解析二维码中的参数
parseParams(path) {
  // 使用正则表达式匹配参数
  const regex = /id=(\d+)/;
  const match = path.match(regex);

  if (match) {
    // 获取匹配到的参数值
    const id = match[1];
    this.data.id = id
    wx.setStorageSync('device_Id', this.data.id)
    console.log("id:", id);
  } else {
    console.log("未找到参数");
  }
},
  exit(){
    let that = this
    wx.scanCode({
      onlyFromCamera: true,   //值为 false  既可以使用相机也可以使用相册，  值为true 只能使用相机
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'], //分别对应 一维码  二维码  DataMatrix码  PDF417条码  
      success:(res) => { //扫码成功后
           console.log(res)
          //res.result		所扫码的内容
          //res.scanType		所扫码的类型
          //res.charSet		所扫码的字符集
          //res.path			当所扫的码为当前小程序二维码时，会返回此字段，内容为二维码携带的 path
          //res.rawData		原始数据，base64编码
          that.parseParams(res.path);
          wx.showLoading({
            title: '加载中',
            mask:true
          });
          wx.getLocation({
            isHighAccuracy:'true',
            highAccuracyExpireTime:'4000ms',
            type: 'wgs84', // 比较精确
            success: (res) => {
             console.log(res);
             const location = res.longitude+','+res.latitude
             that.data.location = location
             wx.request({
              url: 'https://lfzhnb.lfgw.net/api.index/getCompany',
              data:{
                device_id:this.data.id,
                location:location
              },
              method:"POST",
              success:res=>{
                if(res.data.code==200){
                  this.setData({
                exit:false,
                disabled:true,
                yinhangka:true,
                closeDialog:true,
                closeModal:false,
                closeModalS:true,
                show:false,
                position:'fixed',
                })
                console.log(res)
                  that.data.type = res.data.data.type
                  wx.setStorageSync('type', res.data.data.type)
                  if(res.data.data.type==1){
                    that.setData({
                      bankName: res.data.data.name ,
                      yinhangka:true,
                      shoujika:false
                    })
                    wx.hideLoading();
                  }else{
                    that.setData({
                      bankName: res.data.data.name ,
                      yinhangka:false,
                      shoujika:true
                    })
                    wx.hideLoading();
                  }
                }else{
                  wx.showToast({
                    title: res.data.message,
                    icon: 'error',
                    duration: 1500
                })
                }
              }
            })
            },
            fail:res=>{
              wx.showToast({
                title: '获取地址失败,请打开定位',
                icon: 'error',
                duration: 1500
            })
            }
          })
      },
      fail: (res) => {//扫码失败后
          wx.showToast({
              title: '扫码失败',
              icon: 'error',
              duration: 1500
          })
      },
  })
  },
  onLoad:function (options) {
    const that = this
    const scene = wx.getStorageSync('scene')
    console.log(scene)
    this.setData({
      closeShow:true
    })
    if(scene!==1011){
    this.setData({
        exit:true
    })
} else{
  wx.showLoading({
    title: '加载中',
    mask:true
  });
  this.setData({
    disabled:true,
yinhangka:true,
closeDialog:true,
closeModal:false,
closeModalS:true,
show:false,
position:'fixed',
})
wx.getLocation({
  isHighAccuracy:'true',
  highAccuracyExpireTime:'4000ms',
  type: 'wgs84', // 比较精确
  success: (res) => {
   console.log(res);
   const deviceId = wx.getStorageSync('deviceId')
   wx.setStorageSync('device_Id', deviceId)
   const location = res.longitude+','+res.latitude
   that.data.location = location
   wx.request({
    url: 'https://lfzhnb.lfgw.net/api.index/getCompany',
    data:{
      device_id:deviceId,
      location:location
    },
    method:"POST",
    success:res=>{
      if(res.data.code==200){
        that.data.type = res.data.data.type
        wx.setStorageSync('type', res.data.data.type)
        if(res.data.data.type==1){
          that.setData({
            bankName: res.data.data.name ,
            yinhangka:true,
            shoujika:false
          })
          wx.hideLoading();
        }else{
          that.setData({
            bankName: res.data.data.name ,
            yinhangka:false,
            shoujika:true
          })
          wx.hideLoading();
        }
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'error',
          duration: 1500
      })
      }
     
    },
    fail:res=>{
      wx.showToast({
        title: '识别地点失败',
        icon: 'error',
        duration: 1500
    })
    }
  })
  },
  fail:res=>{
    wx.showToast({
      title: '获取地址失败',
      icon: 'error',
      duration: 1500
  })
  }
})
}
    if (wx.getUserProfile) {
    
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
