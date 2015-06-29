var t1=+new Date();
$(document).ready(function(){
    jsLoad.checkconf();
    var imgarray=[
    "images/slidimg/1.jpg",
    "images/slidimg/2.jpg",
    "images/slidimg/3.jpg",
    "images/slidimg/4.jpg"
    ]
    var cssarry=[
    "css/main.css"
    ]
    var jsarry=[
    "js/lib/jquery-animate-css-rotate-scale.js",
    "js/lib/jquery.mousewheel.js",
    "js/lib/jquery.prettyPhoto.js"
    ]
    jsLoad.loadCss(cssarry,function(i){
        })
    jsLoad.loadJs(jsarry,function(i){
        })
    jsLoad.loadImg(imgarray,function(i){
    })
});

document.onreadystatechange=function(){
//    console.log("页面家在完成")
//        console.timeEnd("page")
    };
