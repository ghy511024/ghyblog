/*
 * Version: 1.0.0
 */
//对外接口
window.Tools={
    //获取浏览器参数
    getparam:function(key){},
    //1397458710395 转换成 2014-04-14 14:58:30
    timeToStr:function(time){},
    //  2014-04-14 14:58:30 转换成   1397458710395 
    strToTime:function(str){},
    //    时间 时分秒插件
    timepicker:function(el, formate){},
    //  日期 年月日插件
    datepicker:function(el, formate){},
    //创建一个空白的iframe
    createFrame:function(src,param){},
    /*
     **map 排序 var map={test1:1test2:9,test3:3}
     *          sortMap(map)={test2:9test3:3,test1:1}
     **/
    sortMap:function(map,sort){}
};
(function($){
    window.Tools={
        getparam:function(key){
            return URLtool.getparam(key)
        },
        timeToStr:function(time){
            return  Dates.timeToStr(time)
        },
        strToTime:function(str){
            return  Dates.strToTime(str)
        },
        timepicker:function(el, formate){
            Dates.timepicker(el, formate)
        },
        datepicker:function(el, formate){
            Dates.datepicker(el, formate)
        },
        createFrame:function(src,param){
            return iFrame.createFrame(src,param)
        },
        sortMap:function(map,sort){
            var list=[];
            var ret={};
            for(var key in map){
                var  tmp={
                    key:key,
                    value:map[key]
                }
                list.push(tmp);
            }
            list.sort(function(a,b){
                if(sort<0){
                    return   a.value-b.value;
                }
                else{
                    return   b.value-a.value;
                }
            })
   
            for(var i in list){
                ret[list[i]["key"]]=list[i]["value"]
            }
            return ret;
        },
    }
    //时间插件 
    var Dates={
        //1397458710395 转换成 2014-04-14 14:58:30
        timeToStr:function(time){
           
            var date=new Date();
            if(time!=null){
                date.setTime(time);
            }
            var ymd=date.toLocaleDateString().replace("年","-").replace("月","-").replace("日","");
            var hsm=date.toTimeString().substr(0,8);
            return ymd+" "+hsm;
        },
        //  2014-04-14 14:58:30 转换成   1397458710395 
        strToTime:function(str){
            var date=null
            if(str!=null){
                date=new Date(str);
            }
            else{
                date=new Date();
            }
            return date.getTime();
        },
        //    时间 时分秒插件
        timepicker:function(el,formate){
            if(this.load==true){
                setTimeout(function(){
                    Dates._picker(el, formate, "time")
                },5000)
            }
            else{
                this._picker(el, formate, "time")
            }
        },
        //    日期 年月日插件
        datepicker:function(el,formate){
            if(this.load==true){
                setTimeout(function(){
                    Dates._picker(el, formate, "date")
                },3000)
            }
            else{
                this._picker(el, formate, "date")
            }
        },
        //加载依赖关系
        _picker:function(el,formate,type){
            if(jQuery.timepicker){
                if(type=="time"){
                    if(formate==null){
                        formate="hh:mm";
                    }
                    $(el).timepicker({
                        dateFormat:formate
                    })
                }
                else if(type=="date"){
                    if(formate==null){
                        formate="yy-mm-dd";
                    }
                    $(el).datepicker({
                        dateFormat:formate
                    })
                }
            }
            else{
                this.load=true;
                LoadTool.loadScript("http://static.ws.kukuplay.com/common/scripts/jquery-ui.min.js", function(){
                    this.load=false;
                    if(type=="time"){
                        $(el).timepicker({
                            dateFormat:formate
                        })
                    }
                    else if(type=="date"){
                        if(formate==null){
                            formate="yy-mm-dd";
                        }
                        $(el).datepicker({
                            dateFormat:formate
                        })
                    }
                })
            }
            //载入css 文件
            $("link").each(function(){
                var href=$(this).attr("href");
                if(!this.cssdep){
                    if(href.indexOf("jquery-ui.css")>=0){
                        return;
                    }
                    else{
                        var href='http://static.fengyunzhibo.com/common/styles/jquery-ui.css'
                        LoadTool.loadCss(href); 
                        return;
                    }
                }
            });
        }
    }
    //加js css 或者其他文件 工具类
    LoadTool={
        //加载js 文件
        loadScript:function(url,callback){
            var script = document.createElement("script");
            script.type = "text/javascript"; 
            if (script.readyState){ //IE 
                script.onreadystatechange = function(){ 
                    if (script.readyState == "loaded" || 
                        script.readyState == "complete"){ 
                        script.onreadystatechange = null; 
                        callback&& callback(); 
                    } 
                }; 
            } else { //Others: Firefox, Safari, Chrome, and Opera 
                script.onload = function(){ 
                    callback&& callback(); 
                }; 
            } 
            script.src = url; 
            document.body.appendChild(script);   
        },
        //加载css 文件
        loadCss:function(href,callback){
       
            var style = document.createElement("link");
            style.type = "text/css"; 
            style.rel = "stylesheet"; 
            if (style.readyState){ //IE 
                style.onreadystatechange = function(){ 
                    if (script.readyState == "loaded" || 
                        script.readyState == "complete"){ 
                        script.onreadystatechange = null; 
                        callback&& callback(); 
                    } 
                }; 
            } else { //Others: Firefox, Safari, Chrome, and Opera 
                style.onload = function(){ 
                    callback&& callback(); 
                }; 
            } 
            style.href = href; 
            document.head.appendChild(style);   
        }
    }
    //iframe 工具类
    var iFrame={
        createFrame:function(src,param){
            var iframe=document.createElement("iframe");
            var def={
                allowtransparency:"true",// 是否透明
                frameborder:"none",// iframe 的边框
                width:"400",//宽
                height:"300",//高
                scrolling:"no",//auto 自动出现滚动条 yes，显示滚动条
                id:"myiframe",//设置iframe id
                onLoad:"iFrame.autoheight('myiframe')"//自动调节iframe 高度
            }
            var p=$.extend({},def,param);
            $(iframe).attr(p);
            $(iframe).css({
                "background-color":"transparent"
            })
            iframe.src=src;
            return iframe;
        },
        autoheight:function(iFrameId){
            var ifm= document.getElementById(iFrameId); 
            var subWeb = document.frames ? document.frames[iFrameId].document : ifm.contentDocument; 
            var subWebBody = subWeb.body;
            if(ifm != null && subWeb != null){ 
                ifm.height = subWeb.body.clientHeight; 
            } 
        }
    }
})(jQuery)
//浏览器参数工具类
var URLtool={
    getparam:function(key){
        var search=window.location.search;
        var param={}
        search.replace("?","").split("&").forEach(function(item){
            param[item.split("=")[0]]=item.split("=")[1]
        });
        if(key!=null){
            return param[key];
        }
        else{
            return param;
        }
    }
}

