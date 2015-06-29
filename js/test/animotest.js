$(document).ready(function(){
    
    animo.init();
    
});
(function(){
   
    var Antest={
        init:function(){
            _this.all();
            _this.test1();
            _this.test2();
            _this.test3();
            _this.test4();
        },
        all:function(){
            $("#all").on("click",function(){
                $("#test1_btn,#test2_btn,#test3_btn,#test4_btn").click();
            })
            $("#all_ret").on("click",function(){
                $("#test1_btn2,#test2_btn2,#test3_btn2,#test4_btn2").click();
            })
        },
        //jquery 原生
        test1:function(){
            $("#test1_btn").on("click",function(){
                $("#test1").animate({
                    "left":500
                },1000)
            })
            $("#test1_btn2").on("click",function(){
                $("#test1").animate({
                    "left":0
                })
            })
        },
        //jquery 原生
        test2:function(){
            $("#test2_btn").on("click",function(){
                $("#test2").css({
                    "left":500
                },1000)
            })
            $("#test2_btn2").on("click",function(){
                $("#test2").css({
                    "left":0
                })
            })
        },
        //css translate
        test3:function(){
            $("#test3_btn").on("click",function(){
                $("#test3").css({
                    "-webkit-transform":"translateX(500px)"
                },1000)
            })
            $("#test3_btn2").on("click",function(){
                $("#test3").css({
                    "-webkit-transform":"translateX(0px)"
                },1000)
            })
        },
        
        test4:function(){
            $("#test4_btn").on("click",function(){
                $("#test4").css({
                    "-webkit-transform":"translate3d(500px, 0px, 0)"
                },1000)
            })
            $("#test4_btn2").on("click",function(){
                $("#test4").css({
                    "-webkit-transform":"translate3d(0, 0px, 0)"
                },1000)
            })
        }
    }
    var _this=Antest;
    window.animo=Antest;
})()