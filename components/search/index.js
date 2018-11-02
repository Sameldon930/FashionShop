// components/search/index.js
// 导入model
import{
  KeywordModel
}from '../../models/keyword.js'
import{
  BookModel
}from '../../models/book.js'
import{
  paginationBev
}from  '../behaviors/pagination.js'
//实例化
const keywordModel = new KeywordModel()
  
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  //使用上面导入的行为
  behaviors:[paginationBev],//组件使用行为
  properties: {
    more:{
      type:String,
      //监听函数
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    //历史搜索关键字
    historyWords:[],
    //热门搜索关键字
    hotWords:[],
    searching:false,
    //点击标签进行搜索时候,输入框显示的内容
    q:'',
    //锁--限制请求次数 防止数据重复 
    loading:false,
    loadingCenter:false
  },

  //attached是初始化组件的方法
  attached(){
    //数据绑定
    this.setData({
      //获取到的数据 存放到tag组件中  所以需要在组件中引入组件   在json文件中进行配置
      historyWords:keywordModel.getHistory()
    })
    keywordModel.getHot().then((res)=>{
      this.setData({
        hotWords:res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //加载更多私有方法
    loadMore(){
      if(!this.data.q){
        return
      }
      //解决重复请求导致有重复数据
      //必须等一次请求完成后,才能接下去再次请求
      //锁
      //表示正在发送请求
      if(this._isLocked){
        return 
      }
      // const length = this.data.dataArray.length
      //锁住
      if(this.hasMore()){
        this._locked()//加锁
        bookModel.search(this.getCurrentStart(),this.data.q).then((res)=>{
          this.setMoreData(res.books)
          this._unLocked()//解锁
        },()=>{//请求失败也要解锁---不会导致死锁
          this._unLocked()
        })
      }
      
    },
    //表示锁状态的私有方法
    _isLocked(){
      return this.data.loading?true:false
    },
    //加锁
    _locked(){
      this.setData({
        loading : true
      })
    },
    //解锁
    _unLocked(){
      this.setData({
        loading : false
      })
    },
    onCancel(event){
      this.triggerEvent('cancel',{},{})
      this.initialize()

    },
    //点击打叉号
    ondelete(event){ 
      this._closeResult()//搜索页显示
      this.initialize()


    },
    onConfirm(event){
      //调用
      this._showResult()
      this._showLoadingCenter()
      //获取输入的关键字  左边是输入框输入的内容  右边是点击标签获取的关键字
      const q = event.detail.value || event.detail.text
      this.setData({
        //dataArray:res.books,//这个是在输入框输入内容的时候,在输入框的显示内容
        q:q//这是点击标签的时候  将标签的内容 赋值到输入框中
      })
      //点击标签的时候  把标签的值赋值给q就能提交搜索
      bookModel.search(0,q).then((res)=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        
        //返回结果之后  再添加到历史搜索中去
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    //显示正在加载的动画  私有方法
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    //显示正在加载的动画  私有方法
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    //确认之后,搜索的变量消失  搜索结果出来
    _showResult(){
      this.setData({
        searching:true
      })
    },
    //点击叉号 关闭结果  清空输入框内容
    _closeResult(){
      this.setData({
        searching:false,
        q:''
      })
    }
  }
})
