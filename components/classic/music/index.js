// components/classic/music/index.js
//导入行为构建classic-beh.js
import { 
  classicBeh
} from '../classic-beh.js'


//定义一个变量来存放背景音乐管理对象
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],//继承之后,properties的内容就不需要再填写
  properties: {
      
      src:String
      
  },

  /**
   * 组件的初始数据
   * 播放音乐 使用API
   */
  data: {
    playing:false,
    pauseSrc:"images/player@pause.png",
    playSrc:"images/player@play.png",

  },
  //播放音乐时候,进行切换,如果切换的页面不是这个音乐的页面,那么按钮是播放的按钮,
  //如果切换的页面是播放音乐对应的页面,按钮是显示暂停的按钮
  //该方法也只能通过wx:if去触发 hidden不行
  attached(event){//方法的简写
      this._recoverStatus();//调用私有方法--恢复状态
      this._monitorSwitch();//调用私有方法--同步状态
  },




  //wx:if才能执行detached
  detached:function(event){
    // mMgr.stop();//重复生命周期------切换期刊的时候 音乐会停止
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      // 播放按钮的切换
      //如果音乐是未播放的状态 那么就播放音乐
      if(!this.data.playing){
        this.setData({
          playing: true,
        })
        mMgr.src = this.properties.src
      }else{//如果是播放状态 点击就暂停
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },
    //私有方法--切换音乐期刊的私有方法
    _recoverStatus:function(){
      //当所有的页面都没有音乐播放的时候,
      if(mMgr.paused){
        this.setData({
          playing:false,  //都处于没有播放的状态
        })
        return  //停止
      }
      //如果当前播放的音乐和当前页面相对应
      //当前播放的音乐地址   mMgr.src  等于当前页面播放的音乐
      if(mMgr.src== this.properties.src){
        this.setData({
          playing: true, //那就是处于播放的状态
        })
      }
    },
    //私有方法--外部播放开关状态和组件播放状态同步
    _monitorSwitch:function(){
      //点击播放 触发
      mMgr.onPlay((res)=>{
        this._recoverStatus()
      })
      //点击暂停 触发
      mMgr.onPause((res) => {
        this._recoverStatus()
      })
      //关掉外部开关的打叉  触发
      mMgr.onStop((res)=>{
        this._recoverStatus()
      })
      //音乐播放完成后 状态改变  
      mMgr.onEnded((res)=>{
        this._recoverStatus()  
      })
    }
  }

})
