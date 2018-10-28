// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
      like:{
        type:Boolean,
        
      },
      count:{
        type:Number
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      // like:true,定义玩属性会初始化,之后就可以删掉
      // count: 99, 定义玩属性会初始化,之后就可以删掉
      yesSrc:'images/like.png',
      noSrc:'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // onlike方法,切换喜欢和不喜欢 引进自定义参数 event
      onlike:function(event){
        //自定义事件
        let like = this.properties.like;
        let count = this.properties.count;
        count = like?count-1:count+1;//like为false数量-1,为true数量+1
        this.setData({
          count: count,//上面的count赋值给这个count
          like:!like
        })
        //激活事件
        let behavior = this.properties.like ? 'like' :'cancel';
        this.triggerEvent('like',{//like为自定义事件名
          behavior: behavior,//behavior赋值
        },{})
      }

  }
})
