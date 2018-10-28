// components/classic/essay/index.js
//导入行为构建
import{classicBeh} from '../classic-beh.js'
Component({
  /**
   * 组件的属性列表
   */
  //继承classicBeh
  behaviors: [classicBeh],//如集成多个的话,就是在数据中逗号隔开
  properties: {
      //上面已经被继承,所以不用再添加下面两行
      // img:String,
      // content:String
      
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
