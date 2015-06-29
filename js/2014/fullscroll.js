
(function($){
    var ns="Scroll";
    window[ns]=function(){
        this.window       = $(window);
        this.document     = $(document);
        this.html         = $('html');
        this.body         = this.html.find('body');
        this.root         = this.body.find('#inner-wrapper');
        this.scroller = ( window.opera ) ? ( document.compatMode == "CSS1Compat" ? $('html') : $('body') ) : $('html, body');
        this.scrollspeed  = 20;
    }
    window[ns].prototype={
        setup:function(){
            this.init();
            this.observe();
        //            this.test();
        },
        
        init:function(){
            get_setting();
            this.frame=startfrom;
            this.pframe=-1;
            this.animator = new Animator();
           
        },
        //绑定事件
        observe:function(){
            this.scroller.mousewheel( $.proxy( this.wheel, this ) );
        },
        //滚动执行函数
        wheel:function(event,data,dataX,dataY){
            if( this.showroom && this.showroom.active ) return;
            this.pframe = this.frame;
            this.frame -= dataY * this.scrollspeed;
            if( this.frame < 0 ) this.frame = 0;
            if( this.frame > f.allEnd ) this.frame = f.allEnd;
            if( this.frame > f.limit ) this.frame = f.limit;
             if(this.frame>f.artcard&&!Card.an){
                Card.init();
            }
            if(this.frame<f.artcard&&Card.an){
                Card.anout();
            }
            this.debug();
        } ,
        
        test:function(){
            requestAnimFrame( $.proxy( this.test, this ) );
        },
        //调试
        debug:function(){
            $.each( this.animator.animators, function(i, animator){
                var root = animator.root;
            //                var label='<label>left:'+root.css("left")+' top: '+root.css("top")+' width:'+root.css("width")+' height: '+root.css("height")+'</label>'
            //                $("#debug").empty().append(label);
            });
        }
    }
    
    // 3d card
    var w, container, carousel, item, radius, itemLength, rY, ticker, fps; 
    var mouseX = 0;
    var mouseY = 0;
    var mouseZ = 0;
    var addX = 1;
    var titem,tblock
    var interval;
    window.Card={
        an:false,
        init:function(){
            this.an=true;
            w = $(window);
            container = $( '#card-panel' );
            carousel = $( '#card-inner' );
            item = $( '.card-item' );
            itemLength = $( '.card-item' ).length;
            rY = 360 / itemLength;
            //      radius = Math.round( (250) / Math.tan( Math.PI / itemLength ) );
            radius = 900;
            // set container 3d props
            TweenMax.set(container, {
                perspective:600
            })
            TweenMax.set(carousel, {
                z:-(radius)
            })
            for ( var i = 0; i < itemLength; i++ )
            {
                var $item = item.eq(i);
                var $block = $item.find('.item-inner');
                TweenMax.set($item, {
                    rotationY:rY * i, 
                    z:radius, 
                    autoAlpha:1, 
                    transformOrigin:"50% 50% " + -radius + "px"
                });
                this.animateIn( $item, $block )						
            }
            //                 set mouse x and y props and looper ticker
            window.addEventListener( "mousemove", onMouseMove, false );
//            interval = setInterval( this.looper, 1000/60 );//放置到了动画接口中回调
        },
        looper:function(){
            addX += mouseX
            TweenMax.to( carousel, 1, {
                rotationY:addX, 
                rotationX:mouseY, 
                ease:Quint.easeOut
            } )
            TweenMax.set( carousel, {
                z:mouseZ
            } )
        },
        //动画开始
        //动画结束接口
        anout:function(){
            item = $( '.card-item' );
            itemLength = $( '.card-item' ).length;
            clearInterval(interval);
            for ( var i = 0; i < itemLength; i++ )
            {
                var $item = item.eq(i);
                var $block = $item.find('.item-inner');
                this.animateOut( $item, $block )	
            }
            this.an=false;
        },
        animateIn:function( $item, $block){
            var $nrX = 360 * getRandomInt(2);
            var $nrY = 360 * getRandomInt(2);
				
            var $nx = -(2000) + getRandomInt( 4000 )
            var $ny = -(2000) + getRandomInt( 4000 )
            var $nz = -4000 +  getRandomInt( 4000 )
				
            var $s = 1.5 + (getRandomInt( 10 ) * .1)
            var $d = 1 - (getRandomInt( 8 ) * .1)
			
            mouseX = -(-(window.innerWidth * .5) +0) * .0025;
            mouseY = -(-(window.innerHeight * .5) + 0.5*window.innerHeight ) * .01;
            mouseZ = -(radius) - (Math.abs(-(window.innerHeight * .5) + 0) - 200);
                        
            TweenMax.set( $block, {
                z:$nz, 
                rotationY:$nrY, 
                rotationX:$nrX, 
                x:$nx, 
                y:$ny, 
                autoAlpha:0
            } )
            TweenMax.to( $block, $s, {
                delay:$d, 
                rotationY:0, 
                rotationX:0, 
                z:0,  
                ease:Expo.easeInOut
            } )
            TweenMax.to( $block, $s-.5, {
                delay:$d, 
                x:0, 
                y:0, 
                autoAlpha:1, 
                ease:Expo.easeInOut
            } )
            TweenMax.to( carousel, 1, {
                rotationY:3, 
                rotationX:mouseY, 
                ease:Quint.easeOut
            } )
            
            TweenMax.set( carousel, {
                z:mouseZ
            } )
        },
        
        animateOut:function( $item, $block){
            var $nrX = 360 * getRandomInt(2);
            var $nrY = 360 * getRandomInt(2);
				
            var $nx = -(2000) + getRandomInt( 4000 )
            var $ny = -(2000) + getRandomInt( 4000 )
            var $nz = -4000 +  getRandomInt( 4000 )
				
            var $s = 1.5 + (getRandomInt( 10 ) * .1)
            var $d = 1 - (getRandomInt( 8 ) * .1)
			
            TweenMax.set( $item, {
                autoAlpha:0, 
                delay:$d
            } )
            TweenMax.set( $block, {
                delay:$d, 
                x:0, 
                y:0, 
                autoAlpha:1, 
                ease:Expo.easeInOut
            } )
            TweenMax.to( $block, $s, {
                delay:$d, 
                rotationY:0, 
                rotationX:0, 
                z:0,  
                ease:Expo.easeInOut
            } )
            TweenMax.to( $block, $s-.5, {
                z:$nz, 
                rotationY:$nrY, 
                rotationX:$nrX, 
                x:$nx, 
                y:$ny, 
                autoAlpha:0
            } )
        }
    }
    
    function onMouseMove(event)
    {
        mouseX = -(-(window.innerWidth * .5) + event.pageX) * .0025;
        mouseY = -(-(window.innerHeight * .5) + event.pageY ) * .01;
        mouseZ = -(radius) - (Math.abs(-(window.innerHeight * .5) + event.pageY ) - 200);
    }
    function getRandomInt( $n )
    {
        return Math.floor((Math.random()*$n)+1);	
    }
  
})(jQuery)
$(document).ready(function(){
    window.scroll=new Scroll();
    scroll.setup();
//    Card.init();
//    Card3d.play();
})