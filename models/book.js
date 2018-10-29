import{
  HTTP
} from '../util/http-p.js'
//获取精选数据
class BookModel extends HTTP{
  getHostList(){
    
      return this.request({
        url:'classic/hot_list',
        data:{

        },
        method:'POST'
      })
    
      
    
  }
}