Page({
  data:{
    //切换授权头像的变量
    authorized:false,
    userInfo:null
  },
  onload(options){

    this.userAuthorized()
  

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
  
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo:userInfo,
        authorized:true
      })
    }
    
  }


})