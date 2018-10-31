// pages/book-detail/book-detail.js
import{
  BookModel
}from'../../models/book.js'
const bookModel = new BookModel();
import {
  LikeModel
} from '../../models/like.js'
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //c初始化
    comments:[],
    book:null,
    likeStatus:false,//点赞状态
    likeCount:0//点赞数量 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //page接收外部传过来的id  从而进入Id对应的详情页
    const bid = options.bid;//从组件那边接到bid 
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    detail.then((res)=>{
      console.log(res)
      this.setData({
        book:res
      })
    })

    comments.then((res)=>{
      console.log(res)
      this.setData({
        comments: res.comments
      })
    })

    likeStatus.then((res)=>{
      console.log(res)
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })

    

  },
  onLike(event) {
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel,this.data.book.id,400)
    // 400代表书籍的类型
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