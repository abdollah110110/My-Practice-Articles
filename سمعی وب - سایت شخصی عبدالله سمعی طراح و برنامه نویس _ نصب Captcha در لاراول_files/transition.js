
$(document).ready(function () {
    var width = $(window).width();
    if(width >= 1365){
        $(window).scroll(function () {
            if ($(this).scrollTop() > 400) {
                $('.item').addClass('item-trans');
                $('.item-left').css({'padding-top':'9%'});
            }
        });
    }
    else if(width < 1365 && width > 970){
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.item').addClass('item-trans');
            }
//            else{
//                $('.item').removeClass('item-trans');
//            }
        });
    }
    else if(width <= 970 && width > 750){
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.item').addClass('item-trans');
            }
        });
    }
    else if(width <= 750 && width > 360){
        $(window).scroll(function () {
            if ($(this).scrollTop() > 600) {
                $('.item').addClass('item-trans');
            }
        });
    }
    else if(width <= 360){
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.item').addClass('item-trans');
            }
        });
    }
});