/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


(function($){
    var ns = "Site";

    window[ns] = function() {
        this.window       = $(window);
        this.document     = $(document);
        this.html         = $('html');
        this.body         = this.html.find('body');
        this.root         = this.body.find('#inner-wrapper');
        //  this.debugger     = this.body.find('#debug');
        this.team         = this.body.find('#team');
        this.project      = this.body.find('#project');
        this.contact_iw   = this.body.find('#contact-innerwrapper');
        this.member_info  = this.team.find('.member-info');
        this.project_info = this.project.find('.project-info');
        this.scrolldown   = this.body.find('#scrolldown-wrapper')

        this.scroller     = ( window.opera ) ? ( document.compatMode == "CSS1Compat" ? $('html') : $('body') ) : $('html, body');
        this.scrollspeed  = 20;

        this.unmap        = true;
        this.map_canvas   = this.body.find('#map_canvas');
    };

    window[ns].prototype = {
        setup: function() {
            this.wheel();
            this.prepare();
            this.init();
            this.observe();
            this.resize();
        },
  
        prepare: function() {
            this.imgrefill();
            this.externalize();
            this.set_project_width();
            this.set_member_height()
            this.verticalize();

            get_setting();
            this.animator = new Animator();
            this.nav      = new Nav();
            this.showroom = new Showroom();

            this.prevent_blink();
        },

        slow: function() {
            this.imgrefill();
            this.externalize();
            this.html.addClass('no-js slow-browser');
            this.map_init();
        },

        init: function() {
            this.frame  = startfrom;
            this.pframe = -1;
            this.body.disableSelection();
        },

        imgrefill: function() {
            var img, src, retina, svg;
            $('img').each(function() {
                img    = $(this);
                src    = img.attr('src');
                retina = img.attr('data-retina');
                svg    = img.attr('data-svg');
      
                if( is_retina ) img.attr('src', retina);
                if( site.html.hasClass('svg') ) img.attr('src', svg);
            })
        },

        verticalize: function() {
            var target, characters, width, tempDiv;
            tempDiv = $('<div id="temp-div" />').appendTo('body');

            this.project_info.addClass('vertical2').find('h3, .project-client, .project-desc').lettering('words').children('span').each(function(){
                target = $(this);
                characters = target.text();
                width;

                if( characters.charCodeAt(0) < 128 ) {
                    width = $('<span />').text(characters).appendTo( tempDiv ).width();
                    target.addClass('char-eng').css('margin-bottom', width-10 );
                }
            });
            tempDiv.remove();
        },

        prevent_blink: function() {
            $.each( this.animator.animators, function( i, animator ){
                animator.root.addClass('blink');
            });
        },

        externalize: function() {
            var a, rel;
            $('a').each( function( event ) {
                a        = $(this);
                rel      = a.attr('rel');
                if( rel != "external" ) return;
                a.attr('target', "_blank");
            })
        },

        set_project_width: function() {
            var years, projects, padding;
    
            years    = this.project.find('.year').length;
            projects = this.project.find('.projects').length;
            padding  = 50;

            this.project_width = ( 250 + padding * 2 )  * ( projects + years );
            this.project.find('#project-innerwrapper').width( this.project_width );
            this.contact_iw.css('left', this.project_width + 2879);
        },

        set_member_height: function() {
            var target;
    
            this.member_info.each( function(){
                target = $(this);
                target.css('padding-top', (208 - target.height() ) /2 );
            });
        },

        observe: function() {
            this.scroller.mousewheel( $.proxy( this.wheel, this ) );
            this.document.keydown( $.proxy( this.click, this ));

            this.project_info.draggable({
                rotate: 10
            });
            this.member_info.draggable({
                rotate: 10
            });

            this.window.resize( $.proxy( this.resize, this ) );

            this.scrolldown.click( $.proxy( this.pressdown, this ));
        },

        pressdown: function() {
            this.nav.goto(1);
        },

        click: function( event ) {
            var key = event.which;
            switch( key ) {
                case KEY_UP:
                case KEY_LEFT:
                    event.preventDefault();
                    break;

                case KEY_DOWN:
                case KEY_RIGHT:
                    event.preventDefault();
                    break;

                case KEY_SPACE:
                case KEY_P_UP:
                case KEY_P_DOWN:
                case KEY_P_LEFT:
                case KEY_P_RIGHT:
                    event.preventDefault();
                    break;

                case KEY_DEBUG:
                    this.debugger.toggle();
                    break;
            }
        },


        map_init: function() {
            this.unmap = false;
            var location, options, map, image, marker;
    
            location = new google.maps.LatLng( 25.043965, 121.522037 );
            options  = {
                zoom: 16,
                center: location,
                disableDefaultUI: true,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    
            map    = new google.maps.Map( document.getElementById("map_canvas"), options );
            image  = 'templates/css/images/map-icon.png';    
            marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: image
            });
    
            map.setOptions({ 
                styles: map_style
            });
        },

        remove_map: function() {
            this.unmap = true;
            this.map_canvas.html('');
        },

        wheel: function( event, delta, deltaX, deltaY ) {
            if( this.showroom && this.showroom.active ) return;
            this.pframe = this.frame;
            this.frame -= deltaY * this.scrollspeed;
            if( this.frame < 0 ) this.frame = 0;
            if( this.frame > f.limit ) this.frame = f.limit;
            console.log(this.frame);
            
            this.debug();
        },

        debug: function() {
            if( !this.animator ) return;
            this.debugger.html( this.frame );

        // $.each( this.animator.animators, function(i, animator){
        //   var root = animator.root;
        //   if( !animator.debugger ) {
        //     animator.debugger = $('<div class="parameters" />').appendTo( root );
        //   }
        //   else{
        //     animator.debugger.html(
        //       '<p>left: ' + 
        //         root.css('left') + 
        //         '<br />top: ' + root.css('top') + 
        //         '<br />width: ' + root.css('width') + 
        //         '<br />height: ' + root.css('height') + 
        //       '</p>');
        //   }
        // });
        },

        save_dimension: function() {
            this.width  = this.window.width();
            this.height = this.window.height();
        },

        resize: function() {
            this.save_dimension();
            if( this.height < 830 ) {
                this.root.css( 'margin-top', (this.height - 830)/2  );
            }
        },
    };

})(jQuery);