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
        $('.page-menu-sections-active').css({'height': curActive.height() + 12, 'top': curActive.offset().top - $('.page-menu-sections').offset().top - 6});
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

});