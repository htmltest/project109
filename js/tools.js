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
            curTabs.find('.production-about-main-tabs-item:visible').fadeOut(320, function() {
                curTabs.find('.production-about-main-tabs-item').eq(curIndex).fadeIn(320);
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
            curSlider.find('.page-production-list-item').stop(true, true);
            curSlider.find('.page-production-list-item:visible').fadeOut(320, function() {
                curSlider.find('.page-production-list-item').eq(curIndex).css({'position' : 'relative', 'left' : 'auto', 'top' : 'auto'}).fadeIn(320);
            });
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
        nextArrow: '<button type="button" class="slick-next"></button>'
    });

    $('.about-partners').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 3,
        variableWidth: true,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
    });

    $('.author-catalogue-list-inner').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    $('.author-catalogue-prev').click(function(e) {
        $('.author-catalogue-list .slick-prev').trigger('click');
        e.preventDefault();
    });

    $('.author-catalogue-next').click(function(e) {
        $('.author-catalogue-list .slick-next').trigger('click');
        e.preventDefault();
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
            }
        ]
    });

    $('.filter-group-title a').click(function(e) {
        var curGroup = $(this).parent().parent().parent();
        curGroup.toggleClass('open');
        curGroup.find('.filter-group-sub').slideToggle();

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
            $('.catalogue-top-tab:visible').fadeOut(200, function() {
                $('.catalogue-top-tab').eq(curIndex).fadeIn(200);
            });
        }
        e.preventDefault();
    });

});

$(window).on('load resize', function() {
    $('.product-text-wrap').each(function() {
        $('.product-text-wrap').removeClass('open with-link');
        if ($('.product-text-inner').outerHeight() > $('.product-text-wrap').outerHeight()) {
            $('.product-text-wrap').addClass('with-link')
        }
    });
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

    $('.author-catalogue-list').each(function() {
        var curList = $(this);

        curList.find('.author-catalogue-item-title').css({'min-height': '0px'});

        var curHeight = 0;

        curList.find('.author-catalogue-item-title').each(function() {
            if ($(this).outerHeight() > curHeight) {
                curHeight = $(this).outerHeight();
            }
        });

        curList.find('.author-catalogue-item-title').css({'min-height': curHeight + 'px'});
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