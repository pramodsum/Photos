$(document).ready(function(){

    if (!Modernizr.touch){ $('body').addClass('not-touch'); }

    function get_window_helpers(){

        window.wW = $(window).width(); // window width
        window.wH = $(window).height(); // window height
        window.wST = $(window).scrollTop(); // window scrolled

        window.bH = 321; // brand height

        if( wW >= 641 ){ bH = 321 } // alter bH based on width
        else { bH = $('#site-header').height(); }

    }

    // Reveal the site header after 1s
    setTimeout(function(){
        if( $('body').hasClass('inductee') ){
            initialize_site_header();
        }
    }, 50);

    function initialize_site_header() {

        get_window_helpers();

        $('.full-height').css('min-height',wH);

        if(window.location.hash) {
          $('html,body').animate({scrollTop:$(window.location.hash).offset().top}, 500, function(){
                $('#site-header').show();
                $('body').addClass('headered');
                window.scrollTo(0,wST + bH);
          });
        } else {
            if(wST == 0 ){
                window.scrollTo(0,bH);
            } else if( wST <= bH ) {

            }
        }

    }


    // Position the Menu
    function position_menu(){

        // ----- //
        var wW = $(window).width(); // window width
        var wH = $(window).height(); // window height
        var wST = $(window).scrollTop(); // window scrolled

        // Recalculate any full-height chapters
        $('.full-height').css('min-height',wH);

        var bH = 321; // brand height

        if( wW >= 641 ){ bH = 321 } // alter bH based on width
        else { bH = $('#site-header').height(); }
        // ----- //

        if( wST == bH ){
            $('.inductee-header').removeClass('visible').css('position','fixed').css('top','0px').css('top','-' + bH + 'px');
        } else if ( wST > bH ) {
            $('.inductee-header').removeClass('visible').css('position','fixed').css('top','0px').css('top','-' + bH + 'px');
        } else {
            $('.inductee-header').removeClass('animated').addClass('visible').css('position','absolute').css('top','0px');
        }

        if( wW > 768 ) {
            $('#inductee-nav').show();
        } else {
            if( $('#nav-toggle').hasClass('on') ) {
                $('#inductee-nav').show();
            } else {
                $('#inductee-nav').hide();
            }
        }
    }


    // Move the Menu
    $('#logo').click(function(e){

        get_window_helpers();

        if( $('.inductee-header').hasClass('visible') ){
            // do nothing
        } else {
            $('.inductee-header').css('position','fixed').addClass('animated').addClass('visible');
            $('.inductee-header').css('top','0px');
            e.preventDefault();
        }

    });

    if (!Modernizr.touch){

        $('.has-menu').hover(function(){
            $(this).toggleClass('show-menu');
        });

    } else {

        $('.has-menu > a').click(function(e){
            var foo = $(this).parent();
            if( foo.hasClass('show-menu') ) {
                foo.removeClass('show-menu');
            } else {
                foo.addClass('show-menu');
            }
        });

    }



    $(window).scroll(function(){

        position_menu();

    });

    $(window).smartresize(function(){

       position_menu();

    });

    // clicking the inductees name scrolls you to the top of the page
    $('.navbar h1 a').click(function(e){
      $(window).scrollTo('0px', 'slow');
      e.preventDefault();
    });

    $('#shortcuts').localScroll();

    $('#nav-toggle').click(function(e){
        if( $('#inductee-nav').is(':visible') ){
            $('#inductee-nav').hide();
            $(this).removeClass('on');
        } else {
            $('#inductee-nav').show();
            $(this).addClass('on');
        }
        e.preventDefault();
    });


    if (Modernizr.touch){
        $('.main-nav .menu').addClass('touchable');
        $('#jump-menu a').click(function(){
            $('.has-menu').removeClass('show-menu');
        });
    }

    if( $('body').hasClass('inductees-page') ){


        var $container = $('#griddo');

        var iWW = $(window).width();
        var iDivisor = 3;
        if (iWW <= 768) { iDivisor = 2; }
        else if (iWW <= 1024) { iDivisor = 3; }
        else if (iWW <= 1440) { iDivisor = 4; }
        else { iDivisor = 5; }

        var colWidth = Math.floor( $container.width() / iDivisor );
        $('.single-wide').width(colWidth);
        $('.double-wide').width(colWidth * 2);
        $('.triple-wide').width(colWidth * 3);
        $('.four-wide').width(colWidth * 4);
        $('.full-wide').width( $container.width() );

        // console.log(colWidth);

        // initialize Isotope
        $container.isotope({
            // options...
            hiddenClass: 'isotope-hidden',
            resizable: false, // disable normal resizing
            // set columnWidth to a percentage of container width
            masonry: { columnWidth: colWidth },
            getSortData : {
                sortName : function ( $elem ) {
                    return $elem.attr('data-sortname');
                },
                genre : function ( $elem ) {
                    return $elem.attr('data-genre');
                },
                // Status Legend
                // 1 - Newest published
                // 2 - Recently updated
                // 3 - Same as usual
                // 4 - Coming soon
                status : function ( $elem ) {
                    return $elem.attr('data-status');
                },
                year : function ( $elem ) {
                    return $elem.attr('data-year');
                }
            },
            filter: '.heading-cell, .inductee-cell',
            sortBy : 'year, original-order',
            sortAscending : true
        });

        // update columnWidth on window resize
        $(window).smartresize(function(){

            var iWW = $(window).width();
            var iDivisor = 3;
            if (iWW <= 768) { iDivisor = 2; }
            else if (iWW <= 1024) { iDivisor = 3; }
            else if (iWW <= 1440) { iDivisor = 4; }
            else { iDivisor = 5; }

            var colWidth = Math.floor( $container.width() / iDivisor );
            $('.single-wide').width(colWidth);
            $('.double-wide').width(colWidth * 2);
            $('.triple-wide').width(colWidth * 3);
            $('.four-wide').width(colWidth * 4);
            $('.full-wide').width( $container.width() );

            // console.log(colWidth);

            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: { columnWidth: colWidth }
            });
        });

        $('#sort-by-status').click(function(e){
            $($container).isotope({ sortBy : 'status', sortAscending : true, filter: '.inductee-cell' });
            $('#sort-by-genre,#sort-by-name,#sort-by-year').parent('li').removeClass('on');
            $(this).parent('li').addClass('on');
            e.preventDefault();
        });

        $('#sort-by-name').click(function(e){
            $($container).isotope({ sortBy : 'sortName', sortAscending : true, filter: '.inductee-cell' });
            $('#sort-by-genre,#sort-by-status,#sort-by-year').parent('li').removeClass('on');
            $(this).parent('li').addClass('on');
            e.preventDefault();
        });

        $('#sort-by-genre').click(function(e){
            $($container).isotope({ sortBy : 'genre', sortAscending : true, filter: '*' });
            $('#sort-by-name,#sort-by-status,#sort-by-year').parent('li').removeClass('on');
            $(this).parent('li').addClass('on');
            e.preventDefault();
        });

        $('#sort-by-year').click(function(e){
            $($container).isotope({
                sortBy : 'year, original-order',
                sortAscending: true,
                filter: '.heading-cell, .inductee-cell'
            });
            $('#sort-by-name,#sort-by-status,#sort-by-genre').parent('li').removeClass('on');
            $(this).parent('li').addClass('on');
            e.preventDefault();
        });


    }


    // Build the jump nav for chapters

    $('.the-story [data-title]').each(function(){
        var jm_html = '<li>';
            jm_html += '<a href="#' + $(this).prop('id') + '">';
            jm_html += $(this).data('title');
            jm_html += '</a>';
            jm_html += '</li>';
       $('#jump-menu').append(jm_html);
    });

    $('#current-jump-link').click(function(e){
        e.preventDefault();
    });

    $('#jump-nav a').click(function(){
        if( $('#nav-toggle').is(':visible') ) {
            $('#inductee-nav').hide();
            $('#nav-toggle').removeClass('on');
        }
    });

    $('#jump-menu').localScroll();

    // scrolling through chapters

    if( $('body').hasClass('inductee') ){

        setTimeout(function() {
            $('.chapter').each(function(i) {

                // this chapter's min
                var ch_pos = $(this).position();
                var ch_min = Math.floor(ch_pos.top);

                // this chapter's max

                // get the next chapter's min or the page's full height if no next chapter...
                var next_ch = $(this).next('.chapter'); // next chapter
                var next_ch_pos = (next_ch.length ? next_ch.position() : 0 );
                var ch_max = Math.floor( (next_ch_pos != 0 ? next_ch_pos.top : $('body').height() ) ) - 1;

                // this title
                var the_title = $(this).data('title');

                // console.log(position);
                console.log('min: ' + ch_min + ' / max: ' + ch_max);

                $(this).scrollspy({
                    min: ch_min,
                    max: ch_max,
                    onEnter: function(element, position) {
                        $("#current-jump-item").text(the_title);
                        $('#jump-menu li').removeClass('on');
                        $('#jump-menu').find('a[href="#' + element.id + '"]').parent().addClass('on');
                    },
                    onLeave: function(element, position) {

                    }
                });
            });
        }, 1000);


    }

    // Stax slider
    $('#staxslider').rcarousel({
      visible: 5,
      margin: 10,
      step: 1,
      width: 361,
      height: 361,
      auto: {enabled: true, direction: "next", interval: 3000}
    });

    $('.video-container').fitVids();

    // Switching between years in the inductee menu
    $('#year-tabs li').click(function(e){
      // get the target
      var target = $(this).data('target');
      target = "#" + target; // add the hash
      // give this year the active class
      $('#year-tabs li').removeClass('active');
      $(this).addClass('active');
      // show the target year and hide the others
      $('.inductees-year').hide();
      $(target).show();
    });

});