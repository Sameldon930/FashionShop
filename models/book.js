import{
  HTTP
} from '../util/http-p.js'
//获取精选数据
class BookModel extends HTTP{
  //获取列表数据
  getHostList(){
    return this.request({
      url:'book/hot_list'
    })
  }
  //获取书本数量
  getMyBookCount(){
    return this.request({
      url:'book/favor/count'
    })
  }
  //获取书籍的详细信息
  getDetail(bid){
    return this.request({
      url: 'book/' + bid +'/detail'
    })
  }
  // 获取当前图书籍的点赞状态
  getLikeStatus(bid){
    return this.request({
      url: 'book/' + bid +'/favor'
    })
  }
  //获取当前书本的点评
  getComments(bid){
    return this.request({
      url: 'book/' + bid +'/short_comment'
    })
  }
  //封装提交短评的方法  参数是 书籍的id号  还有短评内容 
  postComment(bid,comment){
    return this.request({
      url:'/book/add/short_comment',
      method:"POST",
      data:{
        book_id:bid,
        content:comment
      }
    })

  }
}
export {BookModel}