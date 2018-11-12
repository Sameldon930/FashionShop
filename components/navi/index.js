// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:String,
      first:Boolean,//是否为第一期(最早一期)
      latest:Boolean,//是否为最后一期(最新一期)
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:'images/triangle.dis@left.png',
    leftSrc:'images/triangle@left.png',
    disRightSrc:'images/triangle.dis@right.png',
    rightSrc:'images/triangle@right.png'

  },

  /**
   * 组件的方法列表
   */
  methods: {
      
      
      onLeft:function(event){
        //如果不是最新一期的 就可以触发事件
        if (!this.properties.latest) {
          this.triggerEvent('left', {}, {});
        };
          
      },
      onRight: function (event){
        //如果不是最早一期的 就可以触发事件
        if (!this.properties.first){
          this.triggerEvent('right', {}, {});
        };
            
      }
  }
})
