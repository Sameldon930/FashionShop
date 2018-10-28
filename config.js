/**
 * 封装配置
 */
//定义config const用来定义固定不变的常量 
//加入export就可以被外部访问

/**
 * 也可以不在每个函数前面加上export
 * 直接在结尾写上
 * export{config,fun1}
 */
const config = {
  api_base_url:'http://bl.7yue.pro/v1/',
  appkey:"6nMYwmgbMcBkvQL0"
}

export {config}