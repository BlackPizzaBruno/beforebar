/** 
 * Before Bar Script File
 * @author Alexandre Pereira / Twitter alxndr_pereira
 */

console.log('BeforeBar');

var b4_bar = {};

/**
 * Pre-Dom Ready Init
 */
b4_bar.predom_init = function(){
    b4_bar.resize_predom();
    b4_bar.sliders = [];
};

/**
 * Init Function (triggered after the dom ready)
 */
b4_bar.init = function(){
    b4_bar.init_fullpage();
    b4_bar.init_sliders();
    b4_bar.resize_postdom();
    b4_bar.insta.init();
    b4_bar.init_arrows();
    b4_bar.map.init();
    b4_bar.init_listeners();
    
    setTimeout(function(){
        $('#mask').fadeOut(1500);
        
        setTimeout(function(){
            $('#present .o-0').removeClass('o-0');
        }, 2000);
    }, 2200);
};

/**
 *  Init the FullPage Script
 */
b4_bar.init_fullpage = function(){
    $('#full_container').fullpage({
        'verticalCentered': false,
        'css3': true,
        'responsiveWidth': 600,
        'scrollOverflow': true,
        'anchors' : ['presentation', 'forfaits', 'soins', 'privatisation', 'pro', 'presse', 'actualite', 'touch', 'stores', 'contact'],
        'afterLoad': function(anchorLink, index){
            //console.log('anchorlink : '+ anchorLink);
            //console.log('index : '+ index);
            
            if(anchorLink === 'touch' && b4_bar.insta.handler === null){
                b4_bar.insta.randomize();
            }else{
                // clear interval
            }
            
            if(b4_bar.utils.is_mobile()){
                if(!b4_bar.utils.is_odd(index) && anchorLink !== 'forfaits'){
                    $('header .bar').addClass('bar-black'); 
                    $('header a.rdv-top').addClass('rdv-top-black'); 
                }else{
                    $('header .bar').removeClass('bar-black'); 
                    $('header a.rdv-top').removeClass('rdv-top-black'); 
                    $('#offerspop').addClass('active').fadeIn();
                }
            }            
        },
        'onLeave': function(index, nextIndex, direction){
            //console.log('index : '+ index);
            //console.log('direction : ' + direction);
            
            if(index === 1 && direction === 'down'){
                if(!b4_bar.utils.is_mobile()){
                    $.when($('header').fadeOut(100)).done(function(){
                        $('header').addClass('stick hide');
                        setTimeout(function(){ 
                             $('header').show();
                            setTimeout(function(){ $('header').removeClass('hide') }, 100);
                        }, 100);
                    });
                }else if(b4_bar.utils.is_tablet()){
                    $('header img').fadeOut();
                }
            }
            if(index === 2 && direction === 'up'){
                if(!b4_bar.utils.is_mobile()){
                    $.when($('header').fadeOut(200)).done(function(){
                        $('header').removeClass('stick');
                        setTimeout(function(){ 
                             $('header').fadeIn(200);
                        }, 200);
                    });           
                }else if(b4_bar.utils.is_tablet()){
                    $('header img').fadeIn();
                }
            }
            
            b4_bar.pop.press.hide();
            
            if(!b4_bar.utils.is_mobile() && !b4_bar.utils.is_tablet()){
                b4_bar.pop.hide(); 
            }
        }
    });
}

b4_bar.choose_select = function(ser){
    var _dest = 'Events';
    switch(ser){
        case 1 : 
            _dest = 'Events';
            break;
        case 2 : 
            _dest = 'Pro';
            break;
        case 3 : 
            _dest = 'Franchises';
            break;
        case 4 : 
            _dest = 'Domicile';
            break;
        case 5 : 
            _dest = 'Soins';
            break;
        case 6 : 
            _dest = 'Wedding';
            break;
        default : 
            break;
    }
    
    b4_bar.pop.hide(); 
    location.href = "#contact";
    $('.contact-bottom select').val(_dest);
}

/**
 * Init the Sliders
 */
b4_bar.init_sliders = function(){
    var swiper = new Swiper('.sc17', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        pagination: '.scp17',
        slidesPerView: 'auto',
        paginationClickable: true
    });
    
    var swiper = new Swiper('.sc16', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        pagination: '.scp16',
        slidesPerView: 'auto',
        paginationClickable: true
    });
    
    /** old version
    $(".rslides").responsiveSlides({
        speed: 2000    
    });
    
    b4_bar.sliders['slide_cover'] = $('#present .rslides');
    b4_bar.sliders['slide_pros'] = $('#slider_pros .rslides');
    */
}

b4_bar.resize_postdom = function(){
    // Resize the centering of the huge txts
    $('.huge_txt').each(function(i, elem){
        $(elem).css('margin-top', '-' + $(elem).height()/2 + 'px');
    });
}

/**
 * Init the DOM listeners
 */
b4_bar.init_listeners = function(){
    /*
    $('#nav_gifts').click(function(){
        b4_bar.pop.stores.show(b4_bar.links.gifts);
    });
    */

    $('#productpop').click(function(){
        b4_bar.pop.stores.show(b4_bar.links.products);
    });

    $('#giftspop').click(function(){
        b4_bar.pop.stores.show(b4_bar.links.gifts);
    });

   
    
    // offers click
    $('#offers .offers_bubbles a').click(function(){
        var _id = $(this).parent().attr('class').split(' ')[0];
        console.log(_id);
        b4_bar.pop.show('offerspop', function(){ 
            $('#offerspop, #offers').addClass(_id);
            
            b4_bar.pop.offer.apply(_id);
            b4_bar.pop.last_class = _id;
        });
    });
    
    // cares click
    $('#cares li').click(function(){
        var _id = $(this).attr('class').split(' ')[0];
        console.log(_id);
        b4_bar.pop.show('carespop', function(){ 
            $('#carespop, #cares').addClass(_id); 
            
            b4_bar.pop.cares.apply(_id);
            b4_bar.pop.last_class = _id;
        });
        
        if(b4_bar.utils.is_mobile()){
            $('.rdv-top').fadeOut();
        }
    });
    
    // popins navigation
    $('#carespop .popnext').click(b4_bar.pop.cares.next);
    $('#offerspop .popnext').click(b4_bar.pop.offer.next);
    $('#carespop .popprev').click(b4_bar.pop.cares.prev);
    $('#offerspop .popprev').click(b4_bar.pop.offer.prev);
    $('.reader .popnext').click(b4_bar.pop.press.next);
    $('.reader .popprev').click(b4_bar.pop.press.prev);
    
    
    // press click
    $('.reader a').click(b4_bar.pop.press.show);
    
    // footer click
    $('#footer a.light').click(function(){
        b4_bar.pop.light.show($(this));
    });
    
    // lightbox click
    $('#lightpop a.light-close, #lightpop a.close').click(function(){
        b4_bar.pop.light.hide();
    });
    
    // rdv button click
    $('.rdv').click(function(){
        if(!b4_bar.utils.is_mobile()){
            $(this).addClass('hide');
            $(this).parent().find('.rdv-detail').addClass('show');
            
            setTimeout(function(){
                $(this).removeClass('hide');
                $(this).parent().find('.rdv-detail').removeClass('show');
            }.bind(this), 6000);
        } else if($(this).parents('.pop').attr('id') == 'offerspop'){
            b4_bar.pop.actionpop.show();
        } else if($(this).parents('.section').attr('id') == 'events' || $(this).parents('.section').attr('id') == 'cares'){
            $($('#mobactpop a')[0]).attr('href', $($(this).parent().find('.rdv-detail a')[0]).attr('href'));
            $($('#mobactpop a')[1]).attr('href', $($(this).parent().find('.rdv-detail a')[1]).attr('href'));
            $($('#mobactpop a')[0]).text($($(this).parent().find('.rdv-detail a')[0]).text());
            $($('#mobactpop a')[1]).text($($(this).parent().find('.rdv-detail a')[1]).text());
            
            b4_bar.pop.actionpop.show();
        } else {
            b4_bar.pop.stores.show();
        }
    });
    
    // common popin controller click
    $('.popctrl .popclose').click(function(){
        b4_bar.pop.hide(); 
        
        if($(this).parents('.reader').length > 0){
            b4_bar.pop.press.hide();
        }
        
        if(b4_bar.utils.is_mobile()){
            $('.rdv-top').fadeIn();
        }
    });
    
    // location buttons
    $('.loc-btn').click(function(){
        $('.loc-btn').removeClass('active');
        $(this).addClass('active');
        var _nlist = $('.shops-top:not(.active)');
        $('.shops-top.active').removeClass('active');
        _nlist.addClass('active');
        
        b4_bar.map.active = b4_bar.map.active == 0 ? 1 : 0;
        var _newstore = b4_bar.map.stores[b4_bar.map.active];
        
        if(!$('#shops-map').hasClass('act-map')){
            $.when(
                $($('.swiper-container')[$('.loc-btn.active').hasClass('shop-17') ? 0 : 1]).fadeIn(),
                $($('.swiper-pagination')[$('.loc-btn.active').hasClass('shop-17') ? 0 : 1]).fadeIn()
            ).done(function(){
                 $($('.swiper-container')[$('.loc-btn.active').hasClass('shop-17') ? 1 : 0]).fadeOut();
                 $($('.swiper-pagination')[$('.loc-btn.active').hasClass('shop-17') ? 1 : 0]).fadeOut();   
            });
        }
        
        b4_bar.map.map.panTo(new google.maps.LatLng(_newstore.lat, _newstore.lng));
    });
    
    $('.btn-toggle-shops').click(function(){
        var _nt = $(this).attr('data-b4-alt'),
            _ot = $(this).text();
        
        if(!b4_bar.utils.is_mobile() || b4_bar.utils.is_tablet()){        
            if($('#shops-map').hasClass('act-map')){
                $('.swiper-container').fadeOut();
                $('.swiper-pagination').fadeOut();
                $($('.swiper-container')[$('.loc-btn.active').hasClass('shop-17') ? 0 : 1]).fadeIn();            
                $($('.swiper-pagination')[$('.loc-btn.active').hasClass('shop-17') ? 0 : 1]).fadeIn();            
            } else {
                $('.swiper-container').fadeOut();
            }

            $(this).attr('data-b4-alt', _ot);
            $(this).text(_nt);
            
            $('#shops-map').toggleClass('act-map');
        }
    });
    
    $('.bar-container').click(function(){
        if($('header').hasClass('expanded')){
            $('header nav').fadeOut();
        }else{
            $('header nav').fadeIn();
        }
        
        $('header').toggleClass('expanded');
    });
    
    $('nav ul li a').click(function(){
        if(b4_bar.utils.is_mobile() && $('header').hasClass('expanded')){
            $('header').toggleClass('expanded');
            $('header nav').fadeOut();
        }
    });
    
    $('#events h2').click(function(){
        if(b4_bar.utils.is_mobile()){
            var _newdiv = $('#events .event-inner>:not(.default-active)');
            $('#events .event-inner>.default-active').removeClass('default-active');
            _newdiv.addClass('default-active');
        }
    });
    
    $('.reader .pop .press-art:first-child').addClass('active');
    
    $('.contact-bottom form .btn').click(function(ev) {
        // Prevent the form from actually submitting
        ev.preventDefault();
        
        $('#formemail').val($('#formemailsrc').val());

        // Get the post data
        var data = $('.contact-bottom form').serialize();
        console.log(data);
        
        var _has_err = false;
        
        $('input.check, textarea.check').each(function(i){
            if($(this).val().length <= 0){
                $(this).addClass('error');
                $('.mailerror').fadeIn();
                _has_err = true;
                
                $(this).keyup(function(i){
                    $(this).removeClass('error');

                    if($('.input.error').length <= 0){
                        $('.mailerror').fadeOut();
                    }
                });
            }
        });

        if(_has_err){
            return;
        }
        
        // Send it to the server
        $.post(location.pathname, data, function(response) {
            if (response.success) {
                $('.contact-bottom form, .contact-bottom .norm').fadeOut();
                $('input.empt, textarea.empt').val('');
                $('.mailerror').fadeOut();
                $('.mailsuccess').fadeIn();
            }
        });
    });
    
    $('.rdv-top').click(b4_bar.pop.stores.show);
    $('#storespop, #storespop .close').click(b4_bar.pop.stores.hide);
    $('#mobactpop, #mobactpop .close').click(b4_bar.pop.actionpop.hide);
    
    $('#lightpop').click(function(ev){
        if(ev.target.id == 'lightpop'){
            b4_bar.pop.light.hide();
        }
    });
    
    // Cover Apply
    $('#slider_cover').css('background-image', 'url('+ b4_bar.covers.top +')');
    $('#slider_pros').css('background-image', 'url('+ b4_bar.covers.pro +')');
    
    // Preload images
    b4_bar.utils.preload_img([
        'assets/img/pop/cares_hair_1.jpg',
        'assets/img/pop/cares_hair_2.jpg',
        'assets/img/pop/cares_make_1.jpg',
        'assets/img/pop/cares_make_2.jpg',
        'assets/img/pop/cares_nails_1.jpg',
        'assets/img/pop/cares_nails_2.jpg',
        'assets/img/pop/cares_spa_1.jpg',
        'assets/img/pop/cares_spa_2.jpg',
        'assets/img/pop/offers_1.jpg',
        'assets/img/pop/offers_2.jpg',
        'assets/img/pop/offers_3.jpg',
        'assets/img/pop/offers_4.jpg'       
    ]);
    
    // resizers 
    $(window).bind("resize", function(){
        b4_bar.resize_predom();
        b4_bar.resize_postdom();
    });
    $(window).bind("orientationchange", function(){
        b4_bar.resize_predom();
        b4_bar.resize_postdom();
    });
    
    if(b4_bar.utils.is_mobile() || b4_bar.utils.is_tablet()){
        b4_bar.init_mobile();    
    }
    
    b4_bar.utils.windowW = $(window).width();
    
    if(b4_bar.utils.is_mobile()){
        $('#offerspop').swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                switch(direction){
                    case 'right':
                        b4_bar.pop.offer.next();
                        break;
                    case 'left':
                        b4_bar.pop.offer.prev();
                        break;
                    default:
                        break;
                }
            },
            preventDefaultEvents: false,
            allowPageScroll: 'vertical'
        });
        
        $('#press').swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                switch(direction){
                    case 'right':
                        $('#press .active .popnext').click();
                        break;
                    case 'left':
                        $('#press .active .popprev').click();
                        break;
                    default:
                        break;
                }
            },
            preventDefaultEvents: false,
            allowPageScroll: 'vertical'
        });
        
        $('#actus').swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                switch(direction){
                    case 'right':
                        $('#actus .active .popnext').click();
                        break;
                    case 'left':
                        $('#actus .active .popprev').click();
                        break;
                    default:
                        break;
                }
            },
            preventDefaultEvents: false,
            allowPageScroll: 'vertical'
        });
    }
}

/**
 * Resize elements before the DOM Ready
 */
b4_bar.resize_predom = function(){    
    // Cover Slider
    document.getElementById('slider_cover').style.height = (document.documentElement.clientHeight + 1) + 'px';
    document.getElementById('slider_cover').style.width = document.documentElement.clientWidth + 'px';
    document.getElementById('slider_pros').style.height = (document.documentElement.clientHeight + 1) + 'px';
    document.getElementById('slider_pros').style.width = document.documentElement.clientWidth + 'px';
    
    if ($(window).width() != b4_bar.utils.windowW) {
        b4_bar.utils.windowW = $(window).width();

        for(var i=0; i < document.getElementsByClassName('slide_inner').length; i++){
            document.getElementsByClassName('slide_inner')[i].style.height = (document.documentElement.clientHeight + 1) + 'px';
            document.getElementsByClassName('slide_inner')[i].style.width = document.documentElement.clientWidth + 'px';
        }
    }
}

/**
 * Init the arrows onClick event
 */
b4_bar.init_arrows = function(){
    $('.arrow').click(function(e){
        $.fn.fullpage.moveSectionDown();
    });
}

/**
 * Instagram features object
 */
b4_bar.insta = {
    /**
     * Instagram Developer Token (Before Bar account)
     */
    token : '1552030403.1677ed0.905bf447896741fab46cdd431c111442',
    
    /**
     * Random Picture Change Interval handler
     */
    handler : null,
    
    /**
     * Last Object Received from insta
     */
    last_data : null,
    
    /**
     * Initialization method, populating the instagram images
     */
    init : function(){
        $.getJSON('https://api.instagram.com/v1/users/1552030403/media/recent?access_token=' + b4_bar.insta.token + '&callback=?', function(data){
            b4_bar.insta.last_data = data;
            console.log(data);
            var _imgs = data.data,
                _max_img = 9;

            for(var i=0; i<=_max_img; i++){
                var _destid = i<=4 ? 0 : 1;   
                $($('.insta-line')[_destid]).append(
                    [
                        '<div class="insta">',
                            '<img src="'+ _imgs[i].images.low_resolution.url +'" />',
                            '<div class="insta-desc">',
                                '<div class="align-v-mid">',
                                    '<p>'+ _imgs[i].caption.text.substring(0, 120) +'...</p>',
                                    '<span>'+ _imgs[i].likes.count +'</span>',
                                    '<span>'+ _imgs[i].comments.count +'</span>',
                                '</div>',
                            '</div>',
                        '</div>'
                    ].join('')
                );
            }
        });
    },
    
    randoms : [],
    
    generate_randoms : function(){
        var _r = Math.floor(Math.random() * 19) + 0;
        if(this.randoms.indexOf(_r) !== -1)
            _r = this.generate_randoms();
        
        this.randoms.push(_r);
        return _r;
    },
    
    /**
     * Init the randomizer
     */
    randomize : function(){
        var _data = this.last_data,
            _me = this;
        
        $.getJSON(_data.pagination.next_url + '&callback=?', function(data){
            b4_bar.insta.last_data = data;
            b4_bar.insta.handler = setInterval(function(){
                var _rand = Math.floor(Math.random() * 9) + 0,
                    _img = data.data[_me.generate_randoms()],
                    $_insta = $($('.insta-line .insta')[_rand]);

                $_insta.find('img').fadeOut(500, function() {
                    $_insta.find('img').attr("src", _img.images.low_resolution.url);
                    $_insta.find('.insta-desc p').html(_img.caption.text.substring(0, 120) + '...');
                    $_insta.find('.insta-desc span:first-child').html(_img.likes.count);
                    $_insta.find('.insta-desc span:last-child').html(_img.comments.count);
                    $_insta.find('img').fadeIn(500);
                });
            }, 5000);
        });
    }
}

/**
 * Popin management
 */
b4_bar.pop = {
    last_class : null,
    
    show : function(popid, callback){
        $('#'+popid).show();
        $('header').addClass('hide');
        setTimeout(function(){
            if(typeof callback !== 'undefined'){
                callback();
            }
            $('#'+popid).addClass('active');
        }, b4_bar.utils.is_mobile() ? 0 : 500);
    },
    
    hide : function(){
        var _pop = $('.pop.active');
        _pop.removeClass('active');
        $('header').removeClass('hide');
        
        setTimeout(function(){
            if(!_pop.hasClass('pop-lock')){
                _pop.hide();
            }
            
            if(b4_bar.pop.last_class !== null){
                setTimeout(function(){ _pop.removeClass(b4_bar.pop.last_class); }, 500);
            }
        }, 500);
    },
    
    stores : {
        show : function(links){
            if(typeof links !== undefined){
                $($('#storespop a')[0]).attr('href',(links[0]));
                $($('#storespop a')[1]).attr('href',(links[1]));
            }
            
            $('#storespop').fadeIn();
        },
        
        hide : function(){
            $('#storespop').fadeOut();
        }
    },
    
    actionpop : {
        show : function(){
            $('#mobactpop').fadeIn();
        },
        
        hide : function(){
            $('#mobactpop').fadeOut();
        }
    },
    
    cares : {
        nav : ['hair', 'nails', 'make', 'spa'],
        
        next : function(){
            var _class = b4_bar.pop.last_class,
                _nav = b4_bar.pop.cares.nav,
                _pos = _nav.indexOf(_class),
                _nextpos = null;
            
            if((_pos + 1) <= _nav.length -1){
                _nextpos = _pos + 1;
            }else{
                _nextpos = 0;
            }
            
            $('.pop.active, #cares')
                .addClass(_nav[_nextpos])
                .removeClass(_class);
            
            b4_bar.pop.cares.apply(_nav[_nextpos]);
            b4_bar.pop.last_class = _nav[_nextpos];
        },
        
        prev : function(){
            var _class = b4_bar.pop.last_class,
                _nav = b4_bar.pop.cares.nav,
                _pos = _nav.indexOf(_class),
                _nextpos = null;
            
            if((_pos - 1) >= 0){
                _nextpos = _pos - 1;
            }else{
                _nextpos = _nav.length -1;
            }
            
            $('.pop.active, #cares')
                .addClass(_nav[_nextpos])
                .removeClass(_class);
            
            b4_bar.pop.cares.apply(_nav[_nextpos]);
            b4_bar.pop.last_class = _nav[_nextpos];
        },
        
        apply : function(id){
            var _$dest = $('#carespop .cares-r-t'),
                _$src = $('#cares ul li.'+ id);
            
            _$dest.find('span.cares-c-ttl').html(_$src.find('h3.title').text());
            _$dest.find('p').html(_$src.find('.contentpop').text());
            
            $($('#carespop .rdv-detail a')[0]).attr('href', b4_bar.links.linksCares[0][id]);
            $($('#carespop .rdv-detail a')[1]).attr('href', b4_bar.links.linksCares[1][id]);
        }
    },
    
    offer : {
        nav : ['events', 'dating', 'wedding', 'beach'],
        
        next : function(){
            var _class = b4_bar.pop.last_class,
                _nav = b4_bar.pop.offer.nav,
                _pos = _nav.indexOf(_class),
                _nextpos = null;
            
            if((_pos + 1) <= _nav.length -1){
                _nextpos = _pos + 1;
            }else{
                _nextpos = 0;
            }
            
            $('.pop.active, #offers')
                .addClass(_nav[_nextpos])
                .removeClass(_class);
            
            b4_bar.pop.offer.apply(_nav[_nextpos]);
            b4_bar.pop.last_class = _nav[_nextpos];
        },
        
        prev : function(){
            var _class = b4_bar.pop.last_class,
                _nav = b4_bar.pop.offer.nav,
                _pos = _nav.indexOf(_class),
                _nextpos = null;
            
            if((_pos - 1) >= 0){
                _nextpos = _pos - 1;
            }else{
                _nextpos = _nav.length -1;
            }
            
            $('.pop.active, #offers')
                .addClass(_nav[_nextpos])
                .removeClass(_class);
            
            b4_bar.pop.offer.apply(_nav[_nextpos]);
            b4_bar.pop.last_class = _nav[_nextpos];
        },
        
        apply : function(id){
            var _$dest = $('#offerspop .left'),
                _$src = $('#offers ul li.'+ id);
            
            _$dest.find('.offerspop-ttl').html(_$src.find('h3').text());
            _$dest.find('.offerspop-desc').html(_$src.find('.offer-desc').html());
            _$dest.find('.offerspop-price').html(_$src.find('.offer-price').text());
            
            $($('#offerspop .rdv-detail a')[0]).attr('href', b4_bar.links.linksOffers[0][id]);
            $($('#offerspop .rdv-detail a')[1]).attr('href', b4_bar.links.linksOffers[1][id]);
            $($('#mobactpop a')[0]).attr('href', b4_bar.links.linksOffers[0][id]);
            $($('#mobactpop a')[1]).attr('href', b4_bar.links.linksOffers[1][id]);
            
            $($('#offerspop .rdv-detail a')[0]).text(b4_bar.links.textOffers[id][1]);
            $($('#offerspop .rdv-detail a')[1]).text(b4_bar.links.textOffers[id][2]);
            $($('#mobactpop a')[0]).text(b4_bar.links.textOffers[id][1]);
            $($('#mobactpop a')[1]).text(b4_bar.links.textOffers[id][2]);
            
            $('#offerspop a.rdv').text(b4_bar.links.textOffers[id][0]);
        }
    },
    
    press : {
        last : 0,
        
        show : function(){
            var _current_reader = $(this).parents('.reader');
            
            if(!_current_reader.find('.pop').hasClass('active')){
                _current_reader.find('.reader-content').fadeOut();
                _current_reader.find('.arrow').fadeOut();
                _current_reader.find('.pop').addClass('active');
            }
        },
        
        hide : function(){
            $('.reader .section-inner .reader-content').fadeIn();
            $('.reader .arrow').fadeIn();
        },
        
        next : function(){
            var _current_reader = $(this).parents('.reader'),
                _last = parseInt(_current_reader.data('bf-active'));
            
            console.log(_last);
            
            if(_last < _current_reader.find('.press-art').length -1){
                _last++;
            }else{
                _last = 0;
            }
            
            _current_reader.data('bf-active', _last);
            
            _current_reader.find('.press-art').removeClass('active');
            $(_current_reader.find('.press-art')[_last]).addClass('active');
        },
        
        prev : function(){
            var _current_reader = $(this).parents('.reader'),
                _last = parseInt(_current_reader.data('bf-active'));
            
            console.log(_last);
            
            if(_last > 0){
                _last--;
            }else{
                _last = _current_reader.find('.press-art').length -1;
            }
            
            _current_reader.data('bf-active', _last);
            
            _current_reader.find('.press-art').removeClass('active');
            $(_current_reader.find('.press-art')[_last]).addClass('active');
        }
    },
    
    light : {
        show : function($el){
             var _ttl = $el.text(),
                _desc = $el.parent().find('span.light-content').html();
            
            $('#lightpop').addClass('active');
            
            $('#lightpop .light-right .light-ttl').html(_ttl);
            
            if(_ttl.toLowerCase() !== 'franchise'){
                $('#lightpop .inner-light .left').hide();
                $('.contact-bottom select').val('Events'); 
            }else{
                $('#lightpop .inner-light .left').show();
                $('.contact-bottom select').val('Franchises');
            }
            
            $('#lightpop .light-right p').html(_desc);
            
            if(!b4_bar.utils.is_mobile()){
                $(window).bind( 'touchmove', b4_bar.utils.touch_scroll );
            }
        },
        
        hide : function(){
            $('#lightpop').removeClass('active');
            if(!b4_bar.utils.is_mobile()){
                $(window).unbind( 'touchmove', b4_bar.utils.touch_scroll );
            }
        }
    }
}

/**
 * Google Maps features object
 */
b4_bar.map = {
    /**
     * map handler
     */
    map : null,
    
    /**
     * Init the Contact map
     */
    init : function(){
        this.map = new google.maps.Map(document.getElementById('shops-map'), {
            zoom: 15,
            styles: b4_bar.map.style,
            disableDefaultUI: true,
            scrollwheel: false,
            panControl: !b4_bar.utils.is_mobile(),
            center: {
                lat: b4_bar.map.stores[0].lat, lng: b4_bar.map.stores[0].lng
            }
        });
        
        var image_on = 'assets/img/map_marker_on.png';
        var image_off = 'assets/img/map_marker_off.png';
        var myLatLng = new google.maps.LatLng(b4_bar.map.stores[0].lat, b4_bar.map.stores[0].lng);
        
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            icon: image_on
        });
        
        var marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(b4_bar.map.stores[1].lat, b4_bar.map.stores[1].lng),
            map: this.map,
            icon: image_on
        });
    },
    
    /**
     * Stores data
     */
    stores : [
        {
            id : 'villiers',
            address : '97 Rue Jouffroy d\'Abbans',
            zip : '75017', 
            city : 'Paris', 
            lat : 48.882128,
            lng : 2.30205
        },
        {
            id : 'victorhugo',
            address : '74 rue Saint-Didier',
            zip : '75016', 
            city : 'Paris', 
            lat : 48.8677807,
            lng : 2.2817583
        }
    ],
    
    active : 0,
    
    /**
     * Gmap custom style
     */
    style : [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":      [{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
}

/**
 * init on mobile
 */
b4_bar.init_mobile = function(){
    b4_bar.pop.show('offerspop', function(){ 
        $('#offerspop, #offers').addClass('events'); 
        b4_bar.pop.offer.apply('events');
        b4_bar.pop.last_class = 'events';
        
        $('#actus .reader-content-inner h2').prependTo('#actus .right');
    });
}

/**
 * Utilities 
 */
b4_bar.utils = {
    /**
     * is_mobile bool, detects if we are in a mobile size
     * return {boolean} true if mobile/tablet 
     */
    is_mobile : function(){
        return window.innerWidth <= 1024 ? true : false;
    },
    
    /**
     * is_tablet bool, detects if we are in a tablet size
     * return {boolean} true if tablet 
     */
    is_tablet : function(){
        return window.innerWidth <= 1024 && window.innerWidth > 600 ? true : false;
    },
    
    /**
     * show if a number is odd or even
     * return {boolean} true if odd
     */
    is_odd : function(num) { 
        return num % 2;
    },
    
    /**
     * Avoid the scroll event
     * @param e - event
     */
    touch_scroll : function(e){
        e.preventDefault();
    },
    
    /**
     * Preload images
     * @param array - images urls
     */
    preload_img : function(array) {
        var list = [];
        for (var i = 0; i < array.length; i++) {
            var img = new Image();
            img.onload = function() {
                var index = list.indexOf(this);
                if (index !== -1) {
                    // remove image from the array once it's loaded
                    // for memory consumption reasons
                    list.splice(index, 1);
                }
            }
            list.push(img);
            img.src = array[i];
        }
    }
}

$(function(){ b4_bar.init() });


/**
 * Submenu SHOP 
 */

