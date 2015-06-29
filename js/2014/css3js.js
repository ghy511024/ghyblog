(function(window){
    var div=document.createElement("ghy"),
    m_style=div.style;
    window.suport={
        //检测浏览器css 样式前缀
        getperfix:function(){
            var property = {
                transformProperty : '',
                MozTransform : '-moz-',
                WebkitTransform : '-webkit-',
                OTransform : '-o-',
                msTransform : '-ms-'
            };
            for (var p in property) {
                if (typeof m_style[p] != 'undefined') {
                    return property[p];
                }
            }
            return null;
        },
        //获取动画名 keyform 动画之心结束
        getanname:function(){
            var animEndEventNames = {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            }
            return animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
        },
        //检测3d 支持
        supportCssTransforms3d:function(){
            if (typeof(window.Modernizr) !== 'undefined') {
                return Modernizr.csstransforms3d;
            }
            var props = [ 'perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective' ],
            prefixes = ' -o- -moz- -ms- -webkit- -khtml- '.split(' '),
            ret = false;
            for ( var i in props ) {
                if ( m_style[ props[i] ] !== undefined  ) {
                    ret = true;
                }
            }
            if (ret) {
                var st = document.createElement('style'),
                div = document.createElement('div');
                st.textContent = '@media ('+prefixes.join('transform-3d),(')+'modernizr){#modernizr{height:3px}}';
                document.getElementsByTagName('head')[0].appendChild(st);
                div.id = 'modernizr';
                docElement.appendChild(div);
                ret = div.offsetHeight === 3;
                st.parentNode.removeChild(st);
                div.parentNode.removeChild(div);
            }
            return ret 
        },
        /**
       *@elems jquery数组或者 一个jquery对象
       *@len:长度
       *@callback：回调函数
       **/
        onAnimationEnd:function(elems,len,callback){
            var finished = 0,
            onEndFn = function() {
                this.removeEventListener( "transitionend", onEndFn );
                ++finished;
                if( finished === len ) {
                    callback.call();
                }
            };
            elems.each( function( i,el ) {
                el.addEventListener( "transitionend", onEndFn );
            } );
        }
    }
})(window);

$.fn.an=function(style,dur,ease){
    var _this=this;
    if(Modernizr.csstransitions){
        dur=dur||"400";
        dur=dur+"ms"
        ease=ease||"ease"
        var perfix=suport.getperfix();
        var key=perfix+"transition";
        var value="all "+dur+" "+ease;
        $(_this).css(key,value);
        $(_this).css("left",0);
        setTimeout(function(){
            $(_this).css(style);
        },25)
    }
    else{
        ease!="linear"&&(ease="swing");
        _this.animate(style,dur,ease);
    }
};
$.fn.an3d=function(left,top,dur,ease){
    var _this=this;
    dur=dur||"400";
    if($("html").hasClass("csstransforms3d")){
        ease=ease||"ease";
        dur=dur+"ms";
        var perfix=suport.getperfix();
        left==null&&(left=0);
        top==null&&(top=0);
        $(_this).parent().css(+perfix+"transform-style","preserve-3d");
        $(_this).css(perfix+"transition",perfix+"transform "+dur+" "+ease);
        $(_this).css(perfix+"transform","translate3d("+left+"px, "+top+"px, 0)");
    }
    else{
        var style={}
        left!=null&&(style["left"]=left);
        top!=null&&(style["top"]=top);
        ease!="linear"&&(ease="swing");
        _this.animate(style,dur,ease);
    }
};
