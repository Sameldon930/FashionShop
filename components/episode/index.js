// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   * 外部数据
   */
  properties: {
      //期刊刊号
      index:{
          type:String,
          //不能在observer函数中去改变值,容易出现无限加载死循环!
          observer:function(newVal,oldVal,changedPath){
            let val = newVal < 10 ? '0'+newVal :newVal;//判断值如果是个位数前面补0 否则输出原来的值
            this.setData({//更新数据
              // index:val,//val赋值 但是会导致递归加载 内存耗尽,所以在data中改变值
              _index:val
            })
          }
      },
  },

  /**
   * 组件的初始数据
   * 内部数据
   */
  data: {
      months:[
        '一月', '二月', '三月', '四月', '五月','六月','七月','八月','九月','十月','十一月','十二月'
      ],
      year:0,//内部数据初始化不能为Number,Number是函数不是一个数字
      month:'',
      _index:'',//不能和上面的index相同,所以增加下划线区分开

  },
  //获取年月
  attached: function () {
      let date = new Date();//获取具体日期
      let year = date.getFullYear();//具体日期中的年
      let month = date.getMonth();//具体日期中的月
      this.setData({
        year,//year赋值---简化写法--属性简写
        month: this.data.months[month],//month赋值
      })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }

  
})
