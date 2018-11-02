Page({
  data:{

  },
  onload(options){
    //旧版
    wx.getUserInfo({
        success:data=>{
            console.log(data)
        }
    })  
    //弹窗询问是否授权

  },
  getUserInfo(event){
    console.log(event);
  }

})