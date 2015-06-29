$(document).ready(function(){
    Slide1.init({
        next:$("#next_btn"),
        pre:$("#pre_btn"),
        item:$("#slide_panel .item"),
        parent:$("#slide_panel")
        
    });
    Slide2.init();
    
    //demo3
    $('#droping-curtain').aviaSlider({
        blockSize: {
            height: 'full',
            width: 40
        },
        display: 'topleft',
        transition: 'bottomright',
        betweenBlockDelay: 80,
        animationSpeed: 800,
        switchMovement: true,
        slideControlls: 'items',
        appendControlls: '.aviaslider'
    })
})

var Slide1={
    parent:"",
    child_w:0,
    parent_w:0,
    next_btn:$("#next_btn"),
    pre_btn:$("#pre_btn"),
    c:0,//当前坐标
    all:0,//子元素数量
    num:0,//每一频子元素的数量
    margin:0,//间距
    item:$(".slide-panel .item"),
    clist:[],
    nextlist:[],
    init:function(def){
        Slide1.next_btn=def.next||$("#next_btn");
        Slide1.pre_btn=def.next||$("#pre_btn");
        Slide1.parent=def.parent||$("#slide_panel");
        Slide1.item=def.item||$("#slide_panel .item");
        Slide1.layout();  
        Slide1.initEvent();  
    },
    layout:function(){
        var parent_w= Slide1.parent.width();
        var child_w= Slide1.item.eq(0).width();
        Slide1.child_w=child_w;
        Slide1.parent_w=parent_w;
        Slide1.num=Math.floor(parent_w/child_w);
        Slide1.margin=(parent_w%child_w)/( Slide1.num+1)
        Slide1.all=$(".slide-panel .item").length
        Slide1.c=Slide1.num;
        $(".slide-panel .item").each(function(i){
            if(i<Slide1.num){
                $(this).css({
                    left:(child_w+Slide1.margin)*(i)+Slide1.margin
                }).addClass("current").show();
            }
        })
    },
    initEvent:function(){
        $(".pre-btn").on("click",function(){
            Slide1.pre();
        })
        $(".next-btn").on("click",function(){
            Slide1.next();
        })
    },
    pre:function(){
        var _this=Slide1;
        
        if(_this.c==_this.num||Slide1.lock==true){
            return;
        }
        Slide1.lock=true;
        var en=0;
        if(_this.c==_this.all){
        en=_this.c- (_this.c%_this.num);
        }
        else{
            en=_this.c-_this.num<=_this.num?_this.num:(_this.c-_this.num);
        }
//        console.log(_this.c+" "+en+" "+_this.all+" "+Slide1.lock)
        for(var i=(en-_this.num);i<en;i++){
            _this.item.eq(i).addClass("next");
        }
        $.when(_this._slideOut_right()).done(function() {
            $(".current").removeClass("current");
        });
        // 有延时 不采用 deferred 的处理
        $(".slide-panel .next").css({
            left:-(Slide1.child_w+300),
            "display":"block"
        })
        $(".slide-panel .next").each(function(i){
            $(this).stop().attr("tag",i).clearQueue().delay(1000+100*(4-i)).animate({
                left:i*(Slide1.child_w+Slide1.margin)+Slide1.margin
                
            },1000,'easeOutQuart',function(){
                $(this).removeClass("next").addClass("current").attr("tag","");
                var tag=$(".next").length;
                if(tag==0){//这个是逆序的 遍历顺序为 ...,3，2，1，0
                    Slide1.lock=false;
                    _this.c=en;
                }
            })
        })
    },
    next:function(){
        var _this=Slide1;
        var en=0;
        if(_this.c==_this.all||Slide1.lock==true){
            return;
        }
        en=_this.c+_this.num<=_this.all?_this.c+_this.num:_this.all;
        for(var i=Slide1.c;i<en;i++){
            _this.item.eq(i).addClass("next");
        }
        
        $.when(_this._slideOut_left()).done(function() {
            _this.c=en;
            $(".current").removeClass("current");
        });
        Slide1.lock=true;
        // 有延时 不采用 deferred 的处理
        var len=$(".slide-panel .next").length
        $(".slide-panel .next").each(function(i){
            $(this).css({
                left:960,
                "display":"block"
            }).stop().clearQueue().delay(1200+100*(i)).animate({
                left:i*(Slide1.child_w+Slide1.margin)+Slide1.margin
            },1000,'easeOutQuart',function(){
                $(this).removeClass("next").addClass("current");
                if(i==(len-1)){
                    Slide1.lock=false;
                }
            })
        })
       
    },
    _slideOut_left:function(){
        return $.Deferred(function(dfd) {
            $("#slide_panel .current").each(function(i) {
                $(this).stop().clearQueue().delay(0).animate({
                    left:-((Slide1.child_w+300)*(4-i))
                },1500,'easeInQuart',dfd.resolve)
            });
        }).promise();  
    },
    _slideOut_right:function(){
        return $.Deferred(function(dfd) {
            $("#slide_panel .current").each(function(i) {
                $(this).stop().clearQueue().delay(0).animate({
                    left:((Slide1.parent_w+300)*(i+1))
                },1500,'easeInQuart',dfd.resolve)
            });
        }).promise();   
    },
    _slidein_left:function(){
        
    },
    _slideIn_right:function(){
        $(".next").css({
            left:960,
            "display":"block"
        })
        $(".next").each(function(i){
            $(this).stop().clearQueue().delay(1500+100*(i)).animate({
                left:i*Slide1.child_w
            },1000,'easeOutQuart',function(){
              
                })
        })
    }
}

var Slide2={
    c:0,
    all:0,//所有子元素数量
    num:5,//每一频子元素的数量
    show_num:3,//显示数量
    nexttag:$("#s-next"),
    pretag:$("#s-pre"),
    item:$("#slide1 li"),
    parent:$("#slide1"),
    init:function(){
        Slide2.initEvent();
        Slide2.layout();
    },
    layout:function(){
        Slide2.all=Slide2.item.length;
        for(var i=0;i<Slide2.show_num;i++){
            Slide2.item.eq(i).show();
        }
    },
    initEvent:function(){
        var _this=Slide2;
        $(_this.nexttag).on("click",function(){
            _this.next();
        })
        $(_this.pretag).on("click",function(){
            _this.pre();
        })
    },
    pre:function(){
        var _this=Slide2;
        _this.parent.find("ul").css({
            "margin-left":"-250px"
        })
        _this.parent.find("li").eq(_this.all-1).remove().prependTo(_this.parent.find("ul")).fadeIn(1000);
        _this.parent.find("ul").delay(1000).animate({
            "margin-left":"0px"
        },5000,function(){
            _this.parent.find("li").eq(3).fadeOut(1000);
        })
    },
    next:function(){
        var _this=Slide2;
        $("#slide1 .item").eq(3).fadeIn(1000);
        _this.parent.find("ul").delay(1000).animate({
            "margin-left":"-250px"
        },5000,function(){
            $("#slide1 .item").eq(0).fadeOut(1000,function(){
                $(this).remove().appendTo(_this.parent.find("ul"));
                _this.parent.find("ul").css({
                    "margin-left":"0px"
                })
            })
        })
    }
}

var Slide3={
    
    
    
}


