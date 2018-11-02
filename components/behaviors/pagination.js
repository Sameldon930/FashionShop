import {
  HTTP
} from '../../util/http.js'

let paginationBev = Behavior({
  properties: {
   
  },
  data: {
    // start: 0,
    // count: 20,
    dataArray: [],//一个页面要呈现出来的数据
    total:null,
    // empty:false,
    // ending:false,
    //搜索空内容的变量
    noneResult:false
    
  },

  methods: {
    //接收用来分页的数据 是数组
    setMoreData(dataArray) {
      // if (dataArray==false) {
        // this.data.ending = true
        // if(this.data.dataArray==false){
          // this.setData({
            // empty:true
      //     })
      //   }
      // }
      const tempArray =this.data.dataArray.concat(dataArray)
      // this.data.start += this.data.count
      this.setData({
        dataArray: tempArray
      })
      // return true
    },
    

    getCurrentStart(){
      // return this.data.start
      return this.data.dataArray.length
    },
    setTotal(total){
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult:true
        })
      }
    },

    //判断加载是否有更多数据
    hasMore(){
      // return !this.data.ending
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else{
        return true
      }
       
    },
    //点击打叉的时候 清空请求的数据状态
    initialize(){ 
      this.setData({
        dataArray:[],
        noneResult:false
      })
      // this.data.dataArray = []
      this.data.total = null
    },




    initPagination:function(){
      this.data.ending = false
      this.data.start = 0
      this.data.dataArray = []
      this.setData({
        dataArray:[]
      })
    },
    
  }
})


export {
  paginationBev
}