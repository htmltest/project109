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
        arrows: false,
        slidesToShow: 5,
        centerMode: true
    });

    $('.main-partners-prev').click(function(e) {
        $('.main-partners-list').slick('slickPrev');
        e.preventDefault();
    });

    $('.main-partners-next').click(function(e) {
        $('.main-partners-list').slick('slickNext');
        e.preventDefault();
    });

});