import {
  HTTP
} from '../util/http.js'//导入
//继承类
//本文件编写方法进行请求数据,之后方法名拿到页面的js进行调用
//如方法:getLatest,getPrevious
class ClassicModel extends HTTP{
  //请求内容
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getkey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  //请求前一篇内容和请求后一篇内容(合并在一起)
  //额外参数index(文档中获取),定义回调函数作为参数
  getClassic(index,nextOrPrevious,sCallback){
      //缓存中寻找 找不到就发送请求然后写入到缓存中 找得到 就不用发送请求
      //确定key
      //如果是next就+1 否则就-1
      let key = nextOrPrevious == 'next' ? 
        this._getkey(index+1) : this._getkey(index-1)
      let classic = wx.getStorageSync(key)
      //判断classic是否存在key
      if(!classic){
        this.request({
          url: `classic/${index}/${nextOrPrevious}`,//
          success: (res) => {
            wx.setStorageSync(this._getkey(res.index),res);//写入缓存
            sCallback(res);
          }
        })
      }else{
        sCallback(classic)
      }
      
  }
  
  //判断是否最早一期
  isFirst(index){
    return index == 1 ? true:false 
  }
  //判断是否最新一期
  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex ==index?true:false
  }
  //设定私有方法将classic的index放到缓存中
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)//同步写入缓存
    //异步写入是去掉Sync
  }
  //读取缓存中的index
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')//同步读取缓存
    return index
  }
  //私有方法产生key 读缓存时候获取key值
  _getkey(index){
      let key = 'classic-'+index;
      return key
  }

}
export { ClassicModel}