// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //数据装成对象
    book:Object,
    showLike:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:String,
    author:String,
    img:String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      const bid = this.properties.book.id;
      wx.navigateTo({//跳转id对应的详情页
        // url: '/pages/book-detail/book-detail?bid=' + this.properties.book.id
        url: '../../pages/book-detail/book-detail?bid='+this.properties.book.id,
      })
    }
  }
})
