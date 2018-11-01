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
    likeCount:0,//点赞数量 
    posting:false//没有打开短评的输入框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //展示加载
    wx.showLoading()
    //page接收外部传过来的id  从而进入Id对应的详情页
    const bid = options.bid;//从组件那边接到bid 
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);
    //并行请求  -- detail comments  likeStatus
    Promise.all([detail,comments,likeStatus]).then((res)=>{
      // console.log(res);
      this.setData({
        //将下面三个请求 并行到一起
        book:res[0],
        comments:res[1].comments,
        likeStatus:res[2].like_status,
        likeStatus:res[2].fav_nums
      })
      wx.hideLoading()
    })

    // detail.then((res)=>{
    //   this.setData({
    //     book:res
    //   })
    // })
    // comments.then((res)=>{
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then((res)=>{
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })

    

  },
  //短评旁边的点赞
  onLike(event) {
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel,this.data.book.id,400)
    // 400代表书籍的类型
  },
  //点击输入短评，出现遮罩层
  onFakePost(event){
    this.setData({
      posting:true//点击的时候，就会打开输入框
    })

  },
  //点击取消，面板隐藏
  onCancel(event){
    this.setData({
      posting:false
    })
  },
  //短评提交--v-tag和input  
  onPost(event){
    const comment = event.detail.text || event.detail.value;
    if(!comment){
      return
    }
    if(comment.length>12){
      wx.showToast({
        title:'短评最多12个字',
        icon:'none'
      })
      return
      
    }
    //调用book.js的方法---调用之后就可以实现功能 tag+1
    bookModel.postComment(this.data.book.id,comment).then(res=>{
      // 成功提示
      wx.showToast({
        title:'+1',
        icon:'none'
      })
      //新+1的tag会添加到数组的第一个元素
      //unshift可以使新增的元素 增加到首位
      this.data.comments.unshift({
        content:comment,
        nums:1
      })  
      this.setData({//更新数据
        comments:this.data.comments,
        posting:false//数据更新后  短评关掉
      })
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