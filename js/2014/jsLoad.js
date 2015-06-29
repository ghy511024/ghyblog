/* 
 * @version 1.0.6
 * @author ghy
 * @date 2014-05-05
 */
(function(w){
    var Load={
        loadImg:function(param,callback){
            var par=[];
            if(param.constructor==Array){
                par=param;
            }
            else if(param.constructor==String){
                par=param.split(",");
            }
            for(var i in par){
                var urls=par[i];
                var storefile = JSON.parse(store.get(urls)) || {}
                var imgdata=storefile.imgdata;
                if(imgdata==null){
                    load(urls,i);
                    function load(urls,i){
                        var tmpimg=document.createElement("img");
                        tmpimg.src=urls;
                        $(tmpimg).load(function(){
                           
                            var tmpdata={}
                            var base64data=getbase64(tmpimg);
                            if(  (base64data.length<1024*250)&&(base64data.length>100)){//对存储图片进行限制。ie8最大为38kb
                                tmpdata.imgdata=base64data
                                tmpdata.imgsrc=urls;
                                try {//存储
                                    store.set(urls, JSON.stringify(tmpdata));
                                }
                                catch (e) {
                                    $("img[_src='"+urls+"']").attr("src",urls);
                                    console.log("Storage img:" +urls+"  filed:  "+ e);
                                }
                            }
                            else{//走正常逻辑
                                $("img[_src='"+urls+"']").attr("src",urls);
                            }
                            if(i==(par.length-1)){
                                callback(i);  
                            }
                        })
                        $(tmpimg).error(function(){
                            $("img[_src='"+urls+"']").attr("src",urls);
                        })
                    }
                }
                else{//本地存在就从本地取出来
                    $("img[_src='"+urls+"']").attr("src",imgdata);
                    if(i==(par.length-1)){
                        callback(i);  
                    }
                }
            }
            function   getbase64(img){
                var imgCanvas = document.createElement("canvas"),
                imgContext = imgCanvas.getContext("2d");
                // 确保canvas元素的大小和图片尺寸一致
                imgCanvas.width = img.width;
                imgCanvas.height = img.height;
                // 渲染图片到canvas中
                imgContext.drawImage(img, 0, 0, img.width, img.height);
                // 用data url的形式取出
                var imgAsDataURL = imgCanvas.toDataURL("image/png");
                return imgAsDataURL;
            }
        },
        loadCss:function(param,callback){
            var par=[];
            if(param.constructor==Array){
                par=param;
            }
            else if(param.constructor==String){
                par=param.split(",");
            } 
            for(var i in par){
                Load.loadfile(par[i],"css",callback); 
            }
        },
        loadJs:function(param,callback){
            var par=[];
            if(param.constructor==Array){
                par=param;
            }
            else if(param.constructor==String){
                par=param.split(",");
            } 
            for(var i in par){
                Load.loadfile(par[i],"js",callback); 
            }
        },
        //加载js 或者 css 文件
        loadfile:function(src,type,callback){
            var head=document.getElementsByTagName("head")[0],
            param=src.split("?"),
            domain=Load.getdomain(src),
            localdomain=Load.getdomain(),
            load=false,
            node,
            storefile,
            filedata,//本地拿出来的数据
            data,//返回数据
            savefileitem;//存储格式的数据
            if(domain!=localdomain){//跨域请求 不存储
                if(type=="js"){
                    node=Util.createJsNode()
                    node.src=src;
                }
                else if(type=="css"){
                    node=document.createElement("link");
                    node.href=src;
                    node.type="text/css";
                    node.rel="stylesheet"
                }
                head.appendChild(node);
                return;
            }
            storefile = JSON.parse(store.get(param[0])) || {}
            filedata=storefile.jsdata;
            //本地不存在或者参数已经更新去请求更新
            if(filedata==null||storefile["param"]!=param[1]){
                load=true;
            }
            if(load){
                loads(src);
                function loads(src){
                    var xmlhttp;
                    if (window.XMLHttpRequest)
                    {// code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp=new XMLHttpRequest();
                    }
                    else
                    {// code for IE6, IE5
                        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xmlhttp.onreadystatechange=function()
                    {
                        if (xmlhttp.readyState==4  )
                        {
                            if(xmlhttp.status==200){
                                var data = xmlhttp.responseText;
                                if(type=="js"){
                                    node=Util.createJsNode()
                                }
                                else  if(type=="css"){
                                    node=Util.createCssNode()
                                }
                                node.innerHTML=data ;
                                head.appendChild(node);
                                savefileitem={
                                    src:param[0],
                                    param:param[1],
                                    jsdata:data
                                }
                                store.set(param[0],JSON.stringify(savefileitem));//存储
                                Load.sysrecord(param[0]);
                            }
                            else{
                                console.log("err state: "+xmlhttp.status)
                            }
                        }
                    }
                    try {
                        xmlhttp.open("GET",src,true);
                        xmlhttp.send();
                    }
                    catch (e) {
                    }
                    
                }
                
                
                
            }
            else{
                if(type=="js"){
                    node=Util.createJsNode()
                }
                else  if(type=="css"){
                    node=Util.createCssNode()
                }
                node.innerHTML=filedata ;
                head.appendChild(node);
            }
        },
        //检查存储有没有过期
        checkconf:function(){
            var system=JSON.parse(store.get("loadConf"))||{};
            var date=+new Date();
            for(var key in system){
                if( date>=system[key]){
                    store.remove(key);
                }
            }
        },
        //系统记录 超过存储时间，就去更新
        sysrecord:function(src,time){
            var date=+new Date()+(Number(time)||(1*24*60*60*1000))
            var system=JSON.parse(store.get("loadConf"))||{};
            system[src]=date;
            store.set("loadConf",JSON.stringify(system));
        },
        //获取当前域
        getdomain:function(urls){
            var reg=/https?:\/\//gi
            if(!reg.test(urls)){
                return document.domain;
            }
            var reg=/(https?:\/\/)?.*?\.([^\/|:])*/gi; 
            return reg.exec(urls)[0].replace(/https?:\/\//,"");
        },
        //js 加载监听
        onScriptLoad:function(evt){
            var  isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
            var  readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?/^complete$/ : /^(complete|loaded)$/;
            if (evt.type === 'load' ||
                (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                //Reset interactive script so a script node is not held onto for
                //to long.
                interactiveScript = null;

            }
        }
    }
    w.jsLoad=Load;
    var Util={
        getScripts:function(){
            return document.getElementsByTagName('script');
        },
        //创建一个空白js节点
        createJsNode:function(type){
            var node =document.createElement('script');
            node.type = type || 'text/javascript';
            node.charset = 'utf-8';
            node.async = true;
            return node;
        },
        //创建一个空白css节点
        createCssNode:function(type){
            var node =document.createElement('style');
            node.type = type || 'text/css';
            node.async = true;
            return node;
        }
    }
    var store = (function () {
        var api               = {},
        win               = window,
        doc               = win.document,
        localStorageName  = 'localStorage',
        globalStorageName = 'globalStorage',
        storage;

        api.set    = function (key, value) {};
        api.get    = function (key)        {};
        api.remove = function (key)        {};
        api.clear  = function ()           {};

        if (localStorageName in win && win[localStorageName]) {
            storage    = win[localStorageName];
            api.set    = function (key, val) {
                storage.setItem(key, val)
            };
            api.get    = function (key)      {
                return storage.getItem(key)
            };
            api.remove = function (key)      {
                storage.removeItem(key)
            };
            api.clear  = function ()         {
                storage.clear()
            };

        } else if (globalStorageName in win && win[globalStorageName]) {
            storage    = win[globalStorageName][win.location.hostname];
            api.set    = function (key, val) {
                storage[key] = val
            };
            api.get    = function (key)      {
                return storage[key] && storage[key].value
            };
            api.remove = function (key)      {
                delete storage[key]
            };
            api.clear  = function ()         {
                for (var key in storage ) {
                    delete storage[key]
                }
            };

        } else if (doc.documentElement.addBehavior) {
            function getStorage() {
                if (storage) {
                    return storage
                }
                storage = doc.body.appendChild(doc.createElement('div'));
                storage.style.display = 'none';
                storage.addBehavior('#default#userData');
                storage.load(localStorageName);
                return storage;
            }
            api.set = function (key, val) {
                var storage = getStorage();
                storage.setAttribute(key, val);
                storage.save(localStorageName);
            };
            api.get = function (key) {
                var storage = getStorage();
                return storage.getAttribute(key);
            };
            api.remove = function (key) {
                var storage = getStorage();
                storage.removeAttribute(key);
                storage.save(localStorageName);
            }
            api.clear = function () {
                var storage = getStorage();
                var attributes = storage.XMLDocument.documentElement.attributes;
                ;
                storage.load(localStorageName);
                for (var i=0, attr; attr = attributes[i]; i++) {
                    storage.removeAttribute(attr.name);
                }
                storage.save(localStorageName);
            }
        }
        return api;
    })();
})(window)