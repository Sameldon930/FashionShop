


class KeywordModel{
    key = 'q' 
    //限制数组的长度
    maxLength = 10
    //获取历史搜索
    getHistory(){
        const words =  wx.getStorageSync(this.key)//是get  获取
        //判断缓存是否为空
        if(!words){
            //返回一个数组
            return[]
        }
        return words
    }
    //获取热门搜索
    getHot(){

    }
    //关键字写入到缓存中--为数组
    addToHistory(keyword){
        //判断缓存中是否存在数组 避免重复添加keyword
        let words = this.getHistory()
        const has = words.includes(keyword)
        //如果不存在
        if(!has){
            //如果长度为最大,则删除末尾的元素,把新的关键字插入到第一位
            const length = words.length
            if(length >= this.maxLength){
                //删除末尾的元素
                words.pop()
            }
            //就存放到数组中的第一位
            words.unshift(keyword)
            //写入到缓存中
            wx.setStorageSync(this.key,words)//set 写入

        }


    }
}
export{KeywordModel}