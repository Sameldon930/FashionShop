/**
 * 导入HTTP
 */
// import{HTTP} from '../../util/http.js'
// let http = new HTTP()//实例化HTTP
/**
 * 导入ClassicModel
 */
import{ClassicModel} from '../../models/classic.js'
let classicModel = new ClassicModel()//实例化
/**
 * 导入LikeModel
 */
import{LikeModel} from '../../models/like.js'
let likeModel = new LikeModel();//实例化
Page({
  /**
   * 页面的初始数据
   */
  data: {
      //定义的三个初始化的值拿到setData中调用
      classic:null,
      latest:true,//最新一期初始化
      first:false,//最早一期初始化
      // likeCount:0,
      // likeStatus:false
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用classicModel中的js方法getLatest
    //使用storage的缓存功能保存  将classic的index写入到缓存中--->models的ｃｌａｓｓｉｃ．ｊｓ
    
    classicModel.getLatest((res) => {
      
      this.setData({//数据绑定和数据更新
         classic: res,//要在data中标识下----前端渲染数据值为 classic.字段名
          
        //...res,//前端渲染的数据值为字段名
        // likeCount:res.fav_nums,
        // likeStatus:res.likeStatus

      })
      
    })
  },
  onLike:function(event){
    // console.log(event);
    let behavior = event.detail.behavior;//获取打印出来的behavior值
    likeModel.like(behavior,
                    this.data.classic.id,
                    this.data.classic.type
                  )//第二个参数和第三个参数可以从上面的classic中获得
  },
  //左键--调用classicModel中的js方法getNext
  onNext: function (event){
    this._updateClassic('next')
  },
  //右键--调用classicModel中的js方法getPrevious
  onPrevious: function (event) {
    this._updateClassic('previous')

  },
  //左右键能否点击调用私有方法--models下的classic.js的getClassic方法
  _updateClassic: function (nextOrPrevious){
    //获取index  index 存在与data中的classic
    const index = this.data.classic.index;//const代替let let代替var
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      // console.log(res);
      // this._getLikeStatus(res.id,res.type)
      //更新数据
      this.setData({
        classic: res,
        //动态改变左右键的值
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)

      })
    })
  },
  //调用models中的like.js的方法getClassicLikeStatus
  // _getLikeStatus:function(artID,category){
  //   likeModel.getClassicLikeStatus(artID,category,(res)=>{
  //     this.setData({
  //         likeCount:res.fav_nums,
  //         likeStatus:res.likeStatus
  //     })
  //   })
  // },
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