$(document).ready(function() {

    $('.side-menu-link').click(function(e) {
        $('html').toggleClass('side-open');
        $(window).trigger('resize');
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
                $('.side-menu').removeClass('side-menu-sub-open');
                $('.side-menu-sub').removeClass('visible');
                $(window).trigger('resize');
            } else {
                $('.side-menu-main li.open').removeClass('open');
                curLi.addClass('open');
                $('.side-menu').addClass('side-menu-sub-open');
                $('.side-menu-sub').html('<div class="side-menu-sub-parent">' + $(this).html() + '</div><ul>' + curLi.find('ul').html() + '</ul>').addClass('visible');
                $(window).trigger('resize');
            }
            e.preventDefault();
        }
    });

    $(window).on('load resize', function() {
        $('.side-menu').css({'min-height': $('.side-content').outerHeight() - $('.side-contacts').outerHeight()});
    });

    $('body').on('click', '.side-menu-sub-parent', function() {
        $('.side-menu-main li.open').removeClass('open');
        $('.side-menu-sub').removeClass('visible');
        $('.side-menu').removeClass('side-menu-sub-open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.side').length == 0) {
            $('html').removeClass('side-open');
        }
    });

    $('.slider-list').slick({
        dots: true,
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        cssEase: 'linear',
        fade: true
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
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1259,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                }
            }
        ]
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
            curTabs.find('.production-about-main-tabs-item:visible').fadeOut(320, function() {
                curTabs.find('.production-about-main-tabs-item').eq(curIndex).fadeIn(320);
            });
            if (curTabs.find('.production-about-main-tabs-menu ul').hasClass('slick-slider')) {
                curTabs.find('.production-about-main-tabs-menu ul').slick('slickGoTo', curIndex);
            }
        }
        e.preventDefault();
    });

    $('.page-production-list-slider').each(function() {
        var curSlider = $(this);
        if (curSlider.find('.page-production-list-item').length > 1) {
            var curPager = '<ul>';
            curSlider.find('.page-production-list-item').each(function() {
                curPager += '<li><button></button></li>';
            });
            curPager += '</ul>';
            curSlider.find('.page-production-list-slider-menu').html(curPager);
            curSlider.find('.page-production-list-slider-menu li').eq(0).addClass('active');
        } else {
            curSlider.find('.page-production-list-slider-menu').remove();
        }
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
            curSlider.find('.page-production-list-item').stop(true, true);
            curSlider.find('.page-production-list-item:visible').fadeOut(320, function() {
                curSlider.find('.page-production-list-item').eq(curIndex).css({'position' : 'relative', 'left' : 'auto', 'top' : 'auto'}).fadeIn(320);
            });
        }
    });

    $('.page-slider').each(function() {
        var curSlider = $(this);
        if (curSlider.find('.page-slider-item').length > 1) {
            curSlider.find('.page-slider-current').html('1');
            curSlider.find('.page-slider-count').html(curSlider.find('.page-slider-item').length);
            var curLinks = '';
            curSlider.find('.page-slider-item').each(function() {
                curLinks += '<span>' + $(this).data('title') + '</span>';
            });
            curSlider.find('.page-slider-links').html(curLinks);
            curSlider.find('.page-slider-links span').eq(0).addClass('active');
        } else {
            curSlider.find('.page-slider-pager, .page-slider-links').remove();
        }
    });

    $('.page-slider-list').slick({
        dots: false,
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 1259,
                settings: 'unslick'
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var curSlider = $(this).parents().filter('.page-slider');
        curSlider.find('.page-slider-current').html(nextSlide + 1);
        curSlider.find('.page-slider-links span').removeClass('active');
        curSlider.find('.page-slider-links span').eq(nextSlide).addClass('active');
    }).on('setPosition', function(event, slick) {
        $(window).trigger('scroll');
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
        var curBlock = $(curItem);
        if (curBlock.length > 0) {
            $.scrollTo(curBlock, 500);
            if (curBlock.hasClass('slick-slide')) {
                var curSlider = curBlock.parents().filter('.slick-slider');
                var curIndex = curSlider.find('.slick-slide').index(curBlock);
                curSlider.slick('goTo', curIndex);
                $(window).trigger('scroll');
            }
        }
        e.preventDefault();
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.about-authors').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 3,
        variableWidth: true,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('.about-partners').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 3,
        variableWidth: true,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1259,
                settings: {
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    centerMode: true,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.page-menu-category a').click(function(e) {
        $(this).toggleClass('closed');
        $('.page-menu-category-menu').slideToggle();
        e.preventDefault();
    });

    $('.catalogue-item a').mouseover(function() {
        var curLink = $(this);
        curLink.find('.catalogue-item-bg').css({'margin-bottom': -(curLink.find('.catalogue-item-detail').height() + 25)});
        $('.product-others .slick-dots').css({'z-index': -1});
    });

    $('.catalogue-item a').mouseout(function() {
        $('.product-others .slick-dots').css({'z-index': 2});
    });

    $('.product-text-open a').click(function(e) {
        $('.product-text-wrap').toggleClass('open')
        $(window).trigger('scroll');
        e.preventDefault();
    });

    $('.product-photos-preview a').click(function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.product-photos-preview a.active').removeClass('active');
            curLink.addClass('active');
            var curIndex = $('.product-photos-preview a').index(curLink);
            $('.product-photos-big li.active').removeClass('active');
            $('.product-photos-big li').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-zoom').click(function(e) {
        var curIndex = $('.product-photos-preview a').index($('.product-photos-preview a.active'));
        $('.product-photos-big a').eq(curIndex).trigger('click');
        e.preventDefault();
    });

    $('.product-photos-big a, .product-sert').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE   : 'Закрыть',
            }
        },
        baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-stage"></div>' +
                "</div>" +
            "</div>",
        btnTpl: {
            close:
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px"><path fill-rule="evenodd"  fill="rgb(3, 151, 158)" d="M29.142,27.728 L27.728,29.142 L15.000,16.414 L2.272,29.142 L0.858,27.728 L13.586,15.000 L0.858,2.272 L2.272,0.858 L15.000,13.586 L27.728,0.858 L29.142,2.272 L16.414,15.000 L29.142,27.728 Z"/></svg></button>',
        },
        thumbs: {
            autoStart: true,
            hideOnClose: true,
            axis: 'y'
        }
    });

    $('.product-params-header a').click(function(e) {
        $(this).toggleClass('closed');
        $('.product-params-content').slideToggle(function() {
            $(window).trigger('scroll');
        });
        e.preventDefault();
    });

    if ($('.product-others-menu ul li').length == 1) {
        $('.product-others-menu').addClass('one');
    }

    $('.product-others-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.product-others-menu ul li').index(curLi);
            $('.product-others-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-others-tab.active').removeClass('active');
            $('.product-others-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-others-tab-list-inner').slick({
        dots: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1259,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('.filter-group-title a').click(function(e) {
        var curGroup = $(this).parent().parent().parent();
        if (!curGroup.hasClass('filter-group-one')) {
            curGroup.toggleClass('open');
            curGroup.find('.filter-group-sub').slideToggle();
        } else {
            curGroup.find('.filter-group-title label').trigger('click');
        }

        e.preventDefault();
    });

    $('.filter-group-title input').change(function() {
        var curInput = $(this);
        var curGroup = curInput.parents().filter('.filter-group');
        if (curInput.prop('checked')) {
            curGroup.addClass('checked');
            curGroup.find('.filter-group-sub input').prop('checked', true);
        } else {
            curGroup.find('.filter-group-sub input').prop('checked', false);
            curGroup.removeClass('checked');
        }
    });

    $('.filter-group-sub input').change(function() {
        var curInput = $(this);
        var curGroup = curInput.parents().filter('.filter-group');
        if (!curInput.prop('checked')) {
            curGroup.find('.filter-group-title input').prop('checked', false);
            curGroup.removeClass('checked');
        } else {
            if (curGroup.find('.filter-group-sub input:checked').length == curGroup.find('.filter-group-sub input').length) {
                curGroup.find('.filter-group-title input').prop('checked', true);
                curGroup.addClass('checked');
            }
        }
    });

    $('.catalogue-top-menu-item').click(function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.catalogue-top-menu-item.active').removeClass('active');
            curLink.addClass('active');
            var curIndex = $('.catalogue-top-menu-item').index(curLink);
            $('.catalogue-top-tab').stop(true, true);
            if ($('.catalogue-top-tab:visible').length > 0) {
                $('.catalogue-top-tab:visible').fadeOut(200, function() {
                    $('.catalogue-top-tab').eq(curIndex).fadeIn(200);
                });
            } else {
                $('.catalogue-top-tab').eq(curIndex).fadeIn(200);
            }
        }
        e.preventDefault();
    });

    $('.page-menu-scroll').jScrollPane({autoReinitialise: true});

    $('.main-welcome-section-title').click(function() {
        $(this).parents().filter('.main-welcome-section').toggleClass('open');
    });

    $('.main-produce-title').click(function() {
        $(this).parents().filter('.main-produce').toggleClass('open');
    });

    $('.main-catalogue-group-title a').click(function(e) {
        if ($(window).width() < 1260) {
            $(this).parents().filter('.main-catalogue-group').toggleClass('open');
            e.preventDefault();
        }
    });

    $('.catalogue-up-link a').click(function(e) {
        $.scrollTo(0, 500);
        e.preventDefault();
    });

    $('.header-mobile-menu-link').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
        $(window).trigger('resize');
        e.preventDefault();
    })

    $('.catalogue-filter-mobile-link').click(function(e) {
        $('html').toggleClass('catalogue-filter-mobile-open');
        $('.page-menu').css({'top': $('.catalogue-ctrl').offset().top});
        e.preventDefault();
    })

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.bx_filter').length == 0 && !$(e.target).hasClass('catalogue-filter-mobile-link')) {
            $('html').removeClass('catalogue-filter-mobile-open');
        }
    });

    $('.catalogue-sort-mobile-current').click(function(e) {
        $('html').toggleClass('catalogue-sort-mobile-open');
        e.preventDefault();
    })

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-sort').length == 0 && $(e.target).parents().filter('.catalogue-sort-mobile').length == 0) {
            $('html').removeClass('catalogue-sort-mobile-open');
        }
    });

    $('.catalogue-sort-bg').click(function(e) {
        $('html').removeClass('catalogue-sort-mobile-open');
    });

    $('body').on('click', '.bx_filter_parameters_box_title', function(e) {
        $(this).parents().filter('.bx_filter_parameters_box').toggleClass('open');
    });

    $('.product-descr h2').click(function() {
        $('.product-descr').toggleClass('open');
    });

    $('.product-photos-mobile').slick({
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false
    });

    $('.production-about-main-title').click(function(e) {
        $(this).parents().filter('.page-slider-item').toggleClass('open');
        $(this).parents().filter('.page-production-list').toggleClass('open');
        $(this).parents().filter('.production-about-main').eq(0).toggleClass('open');
        $(this).parents().filter('.studio-bref').toggleClass('open');
        $(this).parents().filter('.about-cooperation').toggleClass('open');
        if ($(window).width() < 1260) {
            e.preventDefault();
        }
    });

    $('body').on('click', '.filter-full-link', function(e) {
        var curLink = $(this);
        var curBlock = $(this).parent();
        curBlock.find('.filter-full').stop(true, true).slideToggle(200);
        curLink.toggleClass('open');
        e.preventDefault();
    });

    reloadFilter();

    $('.sitemap-title a').click(function(e) {
        $('.sitemap-title').toggleClass('open');
        $('.sitemap').slideToggle();
        e.preventDefault();
    });

    $('.shops-filter-values-link span').click(function() {
        $('.shops-filter-values-link').toggleClass('open');
        $('.shops-filter-cities').stop(true, true).slideToggle();
    });

    $('.shops-filter-cities-list ul li span').each(function() {
        $('.shops-filter-values-inner').append('<div class="shops-filter-values-item">' + $(this).html() + '</div>');
    });

    $('.shops-filter-cities-list ul li span').click(function() {
        $(this).toggleClass('active');
        var selectedCities = [];
        $('.shops-filter-cities-list ul li span.active').each(function() {
            selectedCities.push($(this).html());
        });
        var curItem = $(this);
        $('.shops-filter-values-item').each(function() {
            if ($(this).html() == curItem.html()) {
                if (curItem.hasClass('active')) {
                    $(this).stop(true, true).fadeIn();
                } else {
                    $(this).stop(true, true).fadeOut();
                }
            }
        });
        if (selectedCities.length > 0) {
            $('.shop:not(.shop-online)').each(function() {
                var curShop = $(this);
                var curResult = false;
                for (var i = 0; i < selectedCities.length; i++) {
                    curShop.find('.shop-detail-cities-list li').each(function() {
                        if ($(this).html() == selectedCities[i]) {
                            curResult = true;
                        }
                    });
                }
                if (curResult) {
                    curShop.stop(true, true).fadeIn();
                } else {
                    curShop.stop(true, true).fadeOut();
                }
            });
        } else {
            $('.shop').stop(true, true).fadeIn();
        }
        $('.shops-filter-values-link').removeClass('open');
        $('.shops-filter-cities').stop(true, true).slideUp();
    });

    $('body').on('click', '.shops-filter-values-item', function(e) {
        var curItem = $(this);
        $('.shops-filter-cities-list ul li span').each(function() {
            if ($(this).html() == curItem.html()) {
                $(this).click();
            }
        });
    });

    $('.shop-logo').click(function() {
        var curPadding = $('.wrapper').width();
        $('html').addClass('shop-detail-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});
        $(this).parent().find('.shop-detail').addClass('open');
        shopDetailPosition();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            shopDetailClose();
        }
    });

    $('body').on('click', '.shop-detail-close', function(e) {
        shopDetailClose();
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('shop-detail')) {
            shopDetailClose();
        }
    });

    $(window).resize(function() {
        shopDetailPosition();
    });

});

function shopDetailPosition() {
    $('.shop-detail.open').each(function() {
        $(this).find('.shop-detail-inner').css({'top': '50%', 'margin-top': -$(this).find('.shop-detail-inner').height() / 2, 'padding-bottom': 0});
        if ($(this).find('.shop-detail-inner').height() > $(this).height() - 60) {
            $(this).find('.shop-detail-inner').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    })
}

function shopDetailClose() {
    $('.shop-detail.open').each(function() {
        $('html').removeClass('shop-detail-open');
        $(this).removeClass('open');
        $('body').css({'margin-right': 0});
    });
}

function reloadFilter() {
    $('.bx_filter_parameters_box_container').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.filter-group').length > 5) {
            curBlock.find('.filter-group:gt(4)').wrapAll('<div class="filter-full" />');
            curBlock.find('.filter-full').after('<div class="filter-full-link"><a href="#"><span class="filter-full-link-text-1">Все</span><span class="filter-full-link-text-2">Свернуть</span></a></div>');
        }
        if (curBlock.find('.bx_filter_param_label').length > 5) {
            curBlock.find('.bx_filter_param_label:gt(4)').wrapAll('<div class="filter-full" />');
            curBlock.find('.filter-full').after('<div class="filter-full-link"><a href="#"><span class="filter-full-link-text-1">Все</span><span class="filter-full-link-text-2">Свернуть</span></a></div>');
        }
    });
}

$(window).on('load resize', function() {
    $('.product-text-wrap').each(function() {
        $('.product-text-wrap').removeClass('open with-link');
        if ($('.product-text-inner').outerHeight() > $('.product-text-wrap').outerHeight()) {
            $('.product-text-wrap').addClass('with-link')
        }
    });

    $('.production-about-main-tabs-menu').each(function() {
        var curMenu = $(this);
        if ($(window).width() < 1260) {
            if (!curMenu.find('ul').hasClass('slick-slider')) {
                curMenu.find('ul').slick({
                    infinite: false,
                    arrows: false,
                    dots: false,
                    centerMode: true,
                    variableWidth: true
                });
            }
        } else {
            if (curMenu.find('ul').hasClass('slick-slider')) {
                curMenu.find('ul').slick('unslick');
            }
        }
    });
});

$(window).on('load resize scroll', function() {
    var curScroll = $(window).scrollTop();
    var curHeight = $(window).height();
    if ($(window).width() > 1259) {
        if ($('.page-menu-sections').length > 0) {
            $('.page-menu-sections ul li a').each(function() {
                var curLink = $(this);
                var curBlock = $(curLink.attr('href'));
                if (curBlock.length > 0) {
                    if (curScroll + curHeight * 2 / 3 > curBlock.offset().top) {
                        if (curBlock.hasClass('page-slider-item')) {
                            if (curBlock.hasClass('slick-active')) {
                                $('.page-menu-sections ul li.active').removeClass('active');
                                curLink.parent().addClass('active');
                            }
                        } else {
                            $('.page-menu-sections ul li.active').removeClass('active');
                            curLink.parent().addClass('active');
                        }
                    }
                }
            });
            var curActive = $('.page-menu-sections ul li.active');
            if (curActive.length > 0) {
                $('.page-menu-sections-active').css({'height': curActive.height() + 12, 'top': curActive.offset().top - $('.page-menu-sections').offset().top - 6});
            }
        }
        if (curScroll + curHeight > $('footer').offset().top) {
            $('.page-menu').css({'top': -(curScroll + curHeight - $('footer').offset().top)});
        } else {
            $('.page-menu').css({'top': 0});
        }
    } else {
        if ($('.catalogue-ctrl').length > 0) {
            $('.page-menu').css({'top': $('.catalogue-ctrl').offset().top});
        }
    }

    if ($(window).scrollTop() > $(window).height()) {
        $('.catalogue-up-link').addClass('visible');
    } else {
        $('.catalogue-up-link').removeClass('visible');
    }
});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');


    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent().parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        }
    });
}

function checkErrors() {
    $('.form-checkbox, .form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

$(window).on('load resize', function() {
    $('.news').each(function() {
        var curList = $(this);

        curList.find('.news-item').css({'min-height': '0px'});

        curList.find('.news-item').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.news-item').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

    });

    $('.catalogue').each(function() {
        var curList = $(this);

        curList.find('.catalogue-item-title').css({'min-height': '0px'});

        curList.find('.catalogue-item-title').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-title').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.catalogue-item a').css({'min-height': '0px'});

        curList.find('.catalogue-item a').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item a').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

    $('.product-others-tab-list').each(function() {
        var curList = $(this);

        curList.find('.catalogue-item a').css({'min-height': '0px'});

        var curHeight = 0;

        curList.find('.catalogue-item a').each(function() {
            if ($(this).outerHeight() > curHeight) {
                curHeight = $(this).outerHeight();
            }
        });

        curList.find('.catalogue-item a').css({'min-height': curHeight + 'px'});
    });

});