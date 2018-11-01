// components/search/index.js
// 导入model
import{
  KeywordModel
}from '../../models/keyword.js'
//实例化
const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {

    //历史搜索关键字
    historyWords:[]
  },

  //attached是初始化组件的方法
  attached(){
    const historyWords =  keywordModel.getHistory()
    //数据绑定
    this.setData({
      //获取到的数据 存放到tag组件中  所以需要在组件中引入组件   在json文件中进行配置
      historyWords:historyWords
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
      this.triggerEvent('cancel',{},{})
    },
    onConfirm(event){
      const word = event.detail.value;
      console.log(word)
      keywordModel.addToHistory(word)
    }
  }
})
