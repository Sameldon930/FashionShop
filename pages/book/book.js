// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //纯粹的回调函数来处理异步数据
    //多个异步等待合并  不需要层层传递callback
    //async await es2017 处理异步的方案  小程序不支持


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //promise第一步 
    //异步代码 写在promise的函数中 
    const promise = new Promise((resolve,reject)=>{
      //promise三种状态  pending(进行中) fulfilled(执行成功) rejected(执行失败)
        wx.getSystemInfo({
          success:(res)=>{//回调函数  res是返回的信息   //成功
            resolve(res)
          },
          fail:(error)=>{//失败
            reject(error)
          }
        })
    })
    promise.then((res)=>{
      console.log(res);
    },(error)=>{
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})