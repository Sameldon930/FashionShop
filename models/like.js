import{HTTP} from '../util/http.js'//导入
class LikeModel extends HTTP{
    //like方法调用request进行数据的提交
  like(behavior,artID,category) {
    //传参 behavior 还有文档中的参数 art_id和category(type) 不用type是因为关键字
        let url =  behavior =='like'?'like':'like/cancel';
        this.request({
          url:url,//URL赋值
          method:'POST',
          data:{
            art_id:artID,//参数赋值
            type:category
          }
        })
  }
  // getClassicLikeStatus(artID,category,sCallback){
  //     this.request({
  //       url:'classic/'+ category +'/'+ artID +'/favor' ,
  //       success:sCallback
  //     })
  // }
}
export{LikeModel}