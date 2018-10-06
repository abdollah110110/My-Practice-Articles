$(document).ready(function(){

    $('.navbar-toggler').click(function() {
        if($('.fixed-top').hasClass('scroll-y')){
            $('.fixed-top').removeClass('scroll-y');
        }
        else{
            $('.fixed-top').addClass('scroll-y');
        }
    });

    $('.dropdown-toggle').click(function() {
        $(this).next('.dropdown-menu').slideToggle(500);
    });

    $(window).on('scroll', function(){
        navbar_animate();
        scroll_top_animate();
    });

    $('.scroll-top').on('click', function(){
        $('html, body').animate({scrollTop:0}, 750);
    });

});

function scroll_top_animate(){
    if($(window).scrollTop() > 100){
        $('.scroll-top').fadeIn(500);
    }
    else if($(window).scrollTop() <= 50){
        $('.scroll-top').fadeOut(500);
    }
}

function navbar_animate(){
    if($(window).scrollTop() > 0){
        $('.navbar-animate').css({
            'background-color':'#8e44ad'
        });
        $('.navbar').css({
            'padding':'0',
        });
        if($(window).width() <= 991){
            $('.dropdown-menu').css({
                'background-color':'#8e44ad'
            });
        }
        else{
            $('.dropdown-menu').css({
                'top':'2.36rem',
                'background-color':'#8e44ad',
                'transition': 'all .5s ease'
            });
            setTimeout(function(){
                $('.dropdown-menu').css({
                    'transition': 'none'
                });
            }, 510);
        }
    }
    else{
        $('.navbar-animate').css({
            'background-color':'#8e44ad66'
        });
        $('.navbar').css({
            'padding':'1.5rem 0',
        });
        if($(window).width() <= 991){
            $('.dropdown-menu').css({
                'background-color':'transparent'
            });
        }
        else{
            $('.dropdown-menu').css({
                'top':'3.86rem',
                'background-color':'#8e44ad66',
            });
        }
    }
}