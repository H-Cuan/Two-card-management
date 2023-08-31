// app.js
App({
  onLaunch:(options)=> {
    console.log(options)
     // options.query 包含从小程序码中解析出来的参数
     const deviceId = options.query.id;
     wx.setStorageSync('deviceId',deviceId)
    wx.setStorageSync('scene',options.scene)
    console.log("[onLaunch] 本次场景值:", options.scene)
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onShow:(e)=>{
    wx.removeStorageSync('deviceId')
    wx.removeStorageSync('scene')
      console.log(e)
      const deviceId = e.query.id;
      wx.setStorageSync('deviceId',deviceId)
      wx.setStorageSync('scene',e.scene)
  },
  globalData: {
    userInfo: null
  }
})
