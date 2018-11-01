// pages/book/book.js
import{
  BookModel
}from '../../models/book.js'
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //纯粹的回调函数来处理异步数据
    //多个异步等待合并  不需要层层传递callback
    //async await es2017 处理异步的方案  小程序不支持
    books:[],//进行循环遍历
    searching:false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const getHostList = bookModel.getHostList();
    Promise.all([getHostList]).then((res)=>{
      this.setData({
        books:res[0]
      })
      wx.hideLoading()
    })
    // //调用方法
    // bookModel.getHostList()
    // //多次调用API
    //   .then((res)=>{//api1
    //   //从上面获取数据
    //   this.setData({
    //     books:res
    //   })
    // })
    
    
  },
  //点击搜索出现搜索页面
  onSearch(event){
    this.setData({
      searching:true
    })
  },
  //点击取消 关闭搜索页面
  onCancel(event){
    this.setData({
      searching:false
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