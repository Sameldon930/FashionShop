import{
  ClassicModel
}from '../../models/classic.js'
import{
  BookModel
}from '../../models/book.js'
const classicModel  =  new ClassicModel()
const bookModel = new BookModel()
Page({
  data:{
    //切换授权头像的变量
    authorized:false,
    userInfo:null,
    bookCount:0,
    classic:null
  },
  onload(options){

    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()

  },
  //从models中的js 调用方法  来获取我喜欢的书籍列表
  getMyFavor(){
    classicModel.getMyFavor(res=>{
      this.setData({
        classics:res
      })
    })
  },
  //判断用户是否已经授权过
  userAuthorized(){
    wx.getSetting({
      success:data=>{
        //用户授权过
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:data=>{
              this.setData({
                authorized:true,//代表已经授权
                userInfo:data.userInfo

              })
            }
          })
        }else{
          console.log('err')
        }

      }
    })
  },
  //获取喜欢的书籍数量
  getMyBookCount(){
    bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount:res.count
      })
    })
  },
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    if(userInfo){//如果有值的话
      this.setData({
        userInfo:userInfo,
        authorized:true
      })
    }
    
  },
  onJumpToAbout(event){
    wx.navigateTo({
      url:"/pages/about/about"
    })
  },
  onStudy(event){
    wx.navigateTo({
      url:"/pages/course/course"
    })
  }


})