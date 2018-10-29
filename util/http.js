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
  request(params){
    if(!params.method){
        params.method = "GET"
    }
    //url,data,method(默认为get)
    wx.request({
      url: config.api_base_url+params.url,
      method:params.method,
      data:params.data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
          let code = res.statusCode.toString();//将code的值转换为字符串
          if (code.startsWith('2')){
            params.success && params.success(res.data);//调用回调函数,将res传递进来
          }else{
              //服务器异常
              //调用私有方法 
              let error_code =  res.data.error_code;
              this._show_error(error_code);
          }
      },
      fail:(err)=>{//api调用失败
        this._show_error(1);
      }

    })
  }
  //自定义私有方法 加下划线区分
  _show_error(error_code){
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],//调用上面定义的错误信息
      icon: 'none',
      duration: 2000
    })
  }
}

//输出这个类
export{HTTP}