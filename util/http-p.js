//进行wx.request的封装
//导入 config
import {config} from '../config.js'
// import { config as config1} from '/config.js' 重命名导入
// import { config , fun1 ,fun2} from '/config.js' 导入多个函数
//定义错误码
const tips = {
  1:'抱歉,出现了错误',//设置默认错误
  1005:'不正确的开发者key',
  3000:'期刊不存在'
}
class HTTP{
  //params改成其他参数   url代表request要接收的参数,data,method
  //用{}将参数围起来  成为一个对象
  request({url,data={},method='GET'}){
    return new Promise((resolve,reject)=>{
      //调用下面的私有异步代码
      this._request(url,resolve,reject,data,method)
    })
  }
  //私有request
  _request(url,resolve,reject,data={}, method='GET'){
    
    //url,data,method(默认为get)
    wx.request({
      url: config.api_base_url+url,
      method:method,
      data:data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
          const code = res.statusCode.toString();//将code的值转换为字符串
          if (code.startsWith('2')){
            resolve(res.data);//改写回调  用resolve来改变状态
          }else{
              reject()//错误
              const error_code = res.data.error_code;
              this._show_error(error_code)
          }
      },
      fail:(err)=>{//api调用失败
        reject();
        this._show_error(1);
      }

    })
  }
  //自定义私有方法 加下划线区分
  _show_error(error_code){
    if(!error_code){
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],//调用上面定义的错误信息
      icon:'none',
      duration:2000
    })
  }
}

//输出这个类
export{HTTP}