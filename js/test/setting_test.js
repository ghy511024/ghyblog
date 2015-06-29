

//滚动参数全局配置

var speedrate = 0.1;
var startfrom = 1;
var f = {};
var pw=$("body").width();//
f.start  = 1;
f.welcome  = f.start ;
f.scroll_tip  = f.welcome + 300;
f.title  = f.welcome + 200;
f.welcome_end  = f.title + 600;


function get_setting() {
        settings = [
        {
            selector: '#item1',
            frame: [ f.start, f.welcome_end+400 ],
            style:{
                left:[0,300]
            }
        },
    ];
}