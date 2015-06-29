
/* 
 * console.log 插件
 * varsion:1.0.0
 * 参考官网：https://developers.google.com/chrome-developer-tools/docs/console-api?hl=zh-CN#consolelogobject_object
 * ----宇
 */

(function(window){
    var Log={
        log:function(info,style){
            var tmp=""
            for(var key in style){
                tmp=tmp+key+":"+style[key]+";"
            }
            console && console.log && console.log("%c"+info,tmp)
        },
        log2:function(info,style){
            var stylelist=[];
            var infos=""
            //内容填充
            for(var i=0;i<info.length;i++){
                var item=info[i];
                infos=infos+"%c"+item;
            }
            stylelist.push(infos);
            //样式填充
            for(var i=0;i<style.length;i++){
                var item=style[i];
                var tmp=""
                for(var key in item){
                    tmp=tmp+key+":"+item[key]+";"
                }
                stylelist.push(tmp);
            }
            //如果内容数组大于样式数组，样式数组自动填充
            if(info.length>style.length){
                for(var i=style.length;i<info.length;i++){
                    stylelist.push(null);
                }
            }
            function mylog(){
                console && console.log && console.log.apply(console,arguments)
            }
            mylog.apply(null,stylelist);
        },
        logimg:function(src,width,height){
            var box=Log._getBox(width,height);
            console.log("%c" + box.string, box.style + "background: url('"+src+"') center no-repeat; background-size: "+width+"px "+height+"px; color: transparent;");
        },
        _getBox:function(width, height) {
            return {
                string: "",
                style: "font-size: 0px; padding: " + Math.floor(height/2) + "px " + Math.floor(width/2) + "px; line-height: " + height + "px;"
            }
        }
    }
    window.Log=function(){
        if(Object.prototype.toString.call(arguments[0]) === '[object Array]' ){
            return Log.log2.apply(this,arguments);
        }
        else if(Object.prototype.toString.call(arguments[0]) === '[object String]'
            &&Object.prototype.toString.call(arguments[1]) === '[object Object]'){
            Log.log(arguments[0],arguments[1]);
        }  
        else if(arguments[0]=="img"){
            return Log.logimg.apply(this,Array.prototype.slice.call(arguments,1));
        }  
        else{
            return Log.log.apply(this,arguments);
        }  
    };
})(window)
$(document).ready(function(){
    var style={
        color:"#130BD6",
        "font-size":"84px",
        "font-family":"Vtks Beautiful Dreams"
    }
    Log(["我是小宇","welcome to my blog"],[{
        "font-size":"32px",
        "color":"#FF7979"
    },style]);
    Log("我最喜欢的运动是乒乓球，你呢？",{
        "color":"#90979B",
        "font-size":"24px"
    });
    Log("img","http://t2.gstatic.com/images?q=tbn:ANd9GcQXo09LIroo2AOedCQbxUGi1a77azqJ_MvETiPaBfHYF1NhphJkjw",300,200);
})

