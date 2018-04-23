$(document).ready(function() {

    $('.side-menu-link').click(function(e) {
        $('html').toggleClass('side-open');
        e.preventDefault();
    });

    $('.side-menu-main ul li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.addClass('with-submenu');
        }
    });

    $('.side-menu-main a').click(function(e) {
        var curLi = $(this).parent();
        if (curLi.hasClass('with-submenu')) {
            if (curLi.hasClass('open')) {
                curLi.removeClass('open');
                $('.side-menu-sub').removeClass('visible');
            } else {
                $('.side-menu-main li.open').removeClass('open');
                curLi.addClass('open');
                $('.side-menu-sub').html('<ul>' + curLi.find('ul').html() + '</ul>').addClass('visible');
            }
            e.preventDefault();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.side').length == 0) {
            $('html').removeClass('side-open');
        }
    });

    $('.slider-list').slick({
        dots: false,
        infinite: true,
        arrows: false,
        slidesToShow: 1
    });

    $('.slider-prev').click(function(e) {
        $('.slider-list').slick('slickPrev');
        e.preventDefault();
    });

    $('.slider-next').click(function(e) {
        $('.slider-list').slick('slickNext');
        e.preventDefault();
    });

    $('.main-partners-list').slick({
        dots: false,
        infinite: true,
        variableWidth: true,
        slidesToShow: 5,
        slidesToScroll: 3
    });

    $('.main-partners-prev').click(function(e) {
        $('.main-partners-list .slick-prev').trigger('click');
        e.preventDefault();
    });

    $('.main-partners-next').click(function(e) {
        $('.main-partners-list .slick-next').trigger('click');
        e.preventDefault();
    });

    $('.production-about-main-tabs').each(function() {
        var curTabs = $(this);
        curTabs.find('.production-about-main-tabs-menu li').eq(0).addClass('active');
        curTabs.find('.production-about-main-tabs-item').eq(0).addClass('active');
    });

    $('.production-about-main-tabs-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curTabs = curLi.parents().filter('.production-about-main-tabs');
            curTabs.find('.production-about-main-tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = curTabs.find('.production-about-main-tabs-menu li').index(curLi);
            curTabs.find('.production-about-main-tabs-item').stop(true, true);
            curTabs.find('.production-about-main-tabs-item:visible').fadeOut(function() {
                curTabs.find('.production-about-main-tabs-item').eq(curIndex).fadeIn();
            });
        }
        e.preventDefault();
    });

    $('.page-production-list-slider').each(function() {
        var curSlider = $(this);
        var curPager = '<ul>';
        curSlider.find('.page-production-list-item').each(function() {
            curPager += '<li><button></button></li>';
        });
        curPager += '</ul>';
        curSlider.find('.page-production-list-slider-menu').html(curPager);
        curSlider.find('.page-production-list-slider-menu li').eq(0).addClass('active');
        curSlider.find('.page-production-list-item').eq(0).addClass('active');
    });

    $(window).on('load resize', function() {
        $('.page-production-list-slider').each(function() {
            var curSlider = $(this);
            var curHeight = 0;
            curSlider.find('.page-production-list-item').css({'min-height': 0});
            curSlider.find('.page-production-list-item').each(function() {
                var newHeight = curSlider.find('.page-production-list-item').height();
                if (newHeight > curHeight) {
                    curHeight = newHeight;
                }
            });
            curSlider.find('.page-production-list-item').css({'min-height': curHeight});
        });
    });

    $('body').on('click', '.page-production-list-slider-menu li button', function() {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curSlider = curLi.parents().filter('.page-production-list-slider');
            curSlider.find('.page-production-list-slider-menu li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = curSlider.find('.page-production-list-slider-menu li').index(curLi);
            curSlider.find('.page-production-list-item.active').removeClass('active');
            curSlider.find('.page-production-list-item').eq(curIndex).addClass('active');
        }
    });

    $('.page-slider').each(function() {
        var curSlider = $(this);
        curSlider.find('.page-slider-current').html('1');
        curSlider.find('.page-slider-count').html(curSlider.find('.page-slider-item').length);
        var curLinks = '';
        curSlider.find('.page-slider-item').each(function() {
            curLinks += '<span>' + $(this).data('title') + '</span>';
        });
        curSlider.find('.page-slider-links').html(curLinks);
        curSlider.find('.page-slider-links span').eq(0).addClass('active');
    });

    $('.page-slider-list').slick({
        dots: false,
        infinite: false,
        arrows: false,
        slidesToShow: 1
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var curSlider = $(this).parents().filter('.page-slider');
        curSlider.find('.page-slider-current').html(nextSlide + 1);
        curSlider.find('.page-slider-links span').removeClass('active');
        curSlider.find('.page-slider-links span').eq(nextSlide).addClass('active');
    });

    $('.page-slider-prev').click(function(e) {
        var curSlider = $(this).parents().filter('.page-slider');
        curSlider.find('.page-slider-list').slick('slickPrev');
        e.preventDefault();
    });

    $('.page-slider-next').click(function(e) {
        var curSlider = $(this).parents().filter('.page-slider');
        curSlider.find('.page-slider-list').slick('slickNext');
        e.preventDefault();
    });

    $('body').on('click', '.page-slider-links span', function() {
        var curSpan = $(this);
        if (!curSpan.hasClass('active')) {
            var curSlider = curSpan.parents().filter('.page-slider');
            var curIndex = curSlider.find('.page-slider-links span').index(curSpan);
            curSlider.find('.page-slider-list').slick('slickGoTo', curIndex);
        }
    });

    $('.video-play').click(function(e) {
        var curVideo = $(this).parents().filter('.video');
        curVideo.addClass('play');
        e.preventDefault();
    });

    $('.page-menu-sections ul li a').click(function(e) {
        var curItem = $(this).attr('href');
        if ($(curItem).length > 0) {
            $.scrollTo($(curItem), 500);
        }
        e.preventDefault();
    });

    $(window).on('load resize scroll', function() {
        var curScroll = $(window).scrollTop();
        var curHeight = $(window).height();
        if ($('.page-menu-sections').length > 0) {
            $('.page-menu-sections ul li a').each(function() {
                var curLink = $(this);
                var curBlock = $(curLink.attr('href'));
                if (curBlock.length > 0) {
                    if (curScroll + curHeight * 2 / 3 > curBlock.offset().top) {
                        $('.page-menu-sections ul li.active').removeClass('active');
                        curLink.parent().addClass('active');
                    }
                }
            });
        }
        if (curScroll + curHeight > $('footer').offset().top) {
            $('.page-menu').css({'top': -(curScroll + curHeight - $('footer').offset().top)});
        } else {
            $('.page-menu').css({'top': 0});
        }
    });

});