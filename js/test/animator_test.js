(function($){
    var ns = "Animator";

    window[ns] = function() {
        this.init();
        this.animloop();
    };

    window[ns].prototype = {
        init: function() {
            
            scroll.html.addClass('animator-active')
            scroll.scroller.css('overflow', 'hidden');
            var animators = [], root, style, key, value;
            $.each( settings, function( i, data ) {
                root   = $(data.selector);//$("#xxx")
                styles = 0;
                //将width height这些转换为 style{widht:12,height:23}
                if( ! data.style ) {
                    for( key in data ) {
                        if( key != 'selector' && key != 'frame') {
                            data.style = {};
                            data.style[key] = data[key];
                        }
                    }
                    if( ! data.style ) data.style = false;
                }
                //数组中放入两个css 属性 一个是原来的属性，一个是变化的。
                if( typeof data.style == 'object') {
                    for( key in data.style ) {
                        value = data.style[key];
                        if( typeof value == 'number' ) value = data.style[key] = [value]; // 转换为数组
                        if( value.length == 1) { // only one to change
                            switch( key ) {
                                case 'height':
                                case 'width':
                                    value.splice( 0, 0, root[key]());
                                    break;
                                case 'left':
                                case 'right':
                                case 'top':
                                case 'bottom':
                                    value.splice( 0, 0, root.css(key).replace('px','')*1 );
                                    break;

                                default:
                                    value.splice( 0, 0, root.css(key));
                                    break;
                            }          
                        } else {
                            for( var i = 0 ; i < value.length ; i ++ ) {
                                if( typeof value[i] == 'string' && key != 'transform') {
                                    data.style[key][i] = data.style[key][i-1] + eval(data.style[key][i]); 
                                }
                            }
                        }
                        styles++;
                    }
                }
                if( !data.frame ) data.frame = root.position().top;
                var frame = data.frame;
                if( typeof frame == 'number' ) frame = data.frame = [frame]; // trans num to array
                // frame 只有一个值时，对应的是宽和高的变化 {selector:"#xxx",frame: f.video,height: [160, 490]}
                if( frame.length == 1 ) {
                    for( key in data.style ) {
                        frame.push( frame[0] + (data.style[key][1] - data.style[key][0])) ;
                    }
                }
                animators.push({
                    root   : $(data.selector),
                    style  : data.style,
                    frame  : frame
                })
            });
            //初始化 样式
            this.animators = animators;
            $.each( animators, function( i , animator ) {
                for( var key in animator.style ) {
                    animator.root.css( key, animator.style[key][0] );
                }
            });
        },
        
        animloop: function() {
            requestAnimFrame( $.proxy( this.animloop, this ) );
            this.render();
        //            if(Card.an){
        //              Card.looper();
        //            }
        },
        render: function() {
            $.each( this.animators, function( i, animator ) {
                var root    = animator.root,
                style   = animator.style,
                frame   = animator.frame,
                sframe  = scroll.frame,//终点
                spframe = scroll.pframe;//起点
                var is_unactive = sframe < frame[0],//终点小于 执行过动画的元素
                is_actived  = sframe > frame[ frame.length - 1 ];//终点 大于动画的 尾坐标标记为动画正在执行
                
                var keyframe    = is_unactive ? 0 : frame.length - 1;//动画执行的关键坐标 -1后恰好为整数
                var selector = root.selector.replace('#','').replace('.', '').replace(' ', '-');
                var i,    key,
                from, to,
                current, limit, movement, diff,
                is_deg , is_alpha, range,is_3drotate
                is_unmap  = selector == 'contact-innerwrapper' && scroll.unmap;
                //                console.log(is_unactive+" "+is_unactive);
                // FREEZE ------------------------------------------------------------------------------------------
                if( is_unactive || is_actived ) {
                    modifyClass( root, is_unactive ? 'unactive' : 'actived' , selector);
                    if( is_unmap ) is_unactive ? scroll.remove_map(): scroll.map_init();
                    if( !style ) return;
                    for ( key in style) {
                        var tmpkey=key;
                        is_deg   = key == 'rotate';//旋转
                        is_alpha = key == 'opacity';//透明度
                        is_3drotate=  key=="rotateX"||key=="rotateY"||key=="rotaetZ"//3d 旋转
                      
                        is_px    = !( is_deg || is_alpha ||is_3drotate);
                        range    = is_px ? 1 : 0.1;
                        limit    = style[key][keyframe];
                        
                        current  = is_deg ? root.rotate().replace('deg', '')*1
                        : root.css(key).replace('px', '')*1;
                       
                       
                       diff     = limit - current;
                        if( diff == 0 ) continue;
          
                        if( Math.abs( diff ) <= range ) movement = diff;
                        else {
                            movement = diff * speedrate;
                            movement = Math.abs( movement ) < range ? range * ( movement > 0 ? 1 : -1 ) : movement;  
                        }

                        is_deg ? root.rotate( current + movement + 'deg' ) : root.css( key, current + movement );
                    }
                    return;
                }

                // if( selector == 'member-sliiice') xx(  "limit: " + limit + ", current: " + current + ', movement: ' + movement );

                // ACTIVE ------------------------------------------------------------------------------------------
                for ( i = 0 ; i < frame.length - 1 ; i ++) {
                    // 正在动画区间 执行动画 sframe=201 frame=[200,300]
                    if( sframe > frame[i]  && sframe < frame[i + 1] ) {
                        modifyClass( root, 'active', selector);
                        if( is_unmap ) scroll.map_init();
                        if( !style ) return;
                        for( key in style ) {
                            is_deg   = key == 'rotate';
                            is_alpha = key == 'opacity';
                            is_px    = key == 'width' || key == 'height';

                            range    = is_px ? 1 : 0.01;

                            from  = style[key][i];
                            to    = style[key][i+1];
                            limit = Math.map( sframe , frame[i], frame[i+1], from, to );

                            current = is_deg ? root.rotate().replace('deg', '')*1
                            : root.css(key).replace('px', '')*1;
                            diff    = limit - current;
                            if( diff == 0 ) continue;
            
                            if( Math.abs( diff ) <= range ) movement = diff;
                            else {
                                movement = diff * speedrate;
                                movement = Math.abs( movement ) < range ? range * ( movement > 0 ? 1 : -1 ) : movement;
                            }

                            is_deg ? root.rotate( current + movement + 'deg' ) : root.css( key, current + movement );
                        }
                        return;
                    }
                };
            });
            function modifyClass( root, theStatus, selector ) {
                var selector = selector + '-';
                var status = ['unactive', 'active', 'actived'];
                $.each( status, function( i, s ) {
                    if( s != theStatus ) {
                        if( root.hasClass( s )  ) root.removeClass( s );
                        if( scroll.body.hasClass( selector + s )  ) scroll.body.removeClass( selector + s );
                    }
                })
                if( ! root.hasClass( theStatus ) ) root.addClass( theStatus );
                if( ! scroll.body.hasClass( selector + theStatus ) ) scroll.body.addClass( selector + theStatus );
            }
        }
    };
})(jQuery);


