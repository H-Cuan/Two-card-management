// pages/saveSignature/saveSignature.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.handleCapture()
  },
  handleCapture() {
    const query = wx.createSelectorQuery();
    query.selectViewport().boundingClientRect();
    query.selectAll('.content').fields({
      dataset: true,
      size: true,
      rect: true,
      scrollOffset: true,
    });
    query.exec((res) => {
      console.log(res)
      const canvas = wx.createCanvasContext('canvas', this);
      const viewport = res[0];
      const elements = res[1][0];

      // 设置 Canvas 的宽高为页面的宽高
      const canvasWidth = viewport.width;
      const canvasHeight = viewport.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      console.log(elements)
      // 绘制页面元素到 Canvas 上
      for (const key in elements) {
        console.log(elements[key]) 
        const { dataset, size, rect, scrollOffset, left, top, width, height,scrollLeft, scrollTop } = elements
           // 计算元素在 Canvas 上的位置
           const canvasLeft = left - scrollLeft;
           const canvasTop = top - scrollTop;
   
           // 绘制图片元素
           if (dataset && dataset.img) {
             canvas.drawImage(dataset.img, canvasLeft, canvasTop, width, height);
           }
      }
      // elements.forEach((element) => { 
      //   const { dataset, size, rect, scrollOffset } = element;
      //   const { left, top, width, height } = rect;
      //   const { scrollLeft, scrollTop } = scrollOffset;

      //   // 计算元素在 Canvas 上的位置
      //   const canvasLeft = left - scrollLeft;
      //   const canvasTop = top - scrollTop;

      //   // 绘制图片元素
      //   if (dataset && dataset.img) {
      //     canvas.drawImage(dataset.img, canvasLeft, canvasTop, width, height);
      //   }
      //   // 绘制其他元素，如文本、形状等
      //   // ...

      //   // 绘制背景色，如果需要
      //   // canvas.setFillStyle('#ffffff');
      //   // canvas.fillRect(canvasLeft, canvasTop, width, height);
      // });

      canvas.draw(false, () => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
          destWidth: canvasWidth * 2,
          destHeight: canvasHeight * 2,
          canvasId: 'canvas',
          success(res) {
            const tempFilePath = res.tempFilePath;
            // 在这里可以将图片路径进行处理，如保存到相册或进行其他操作
            console.log('转换成功，临时文件路径：', tempFilePath);
          },
          fail(res) {
            console.log('转换失败：', res);
          },
        }, this);
      });
    });
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
wx.getStorageSync('type')==1?this.setData({show:false,isShow:true}):this.setData({show:true,isShow:false})
this.setData({
  QIANMING:wx.getStorageSync('qianming')
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