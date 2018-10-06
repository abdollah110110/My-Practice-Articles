
$(document).ready(function(){

    $(".navbar .navbar-form input").focus(function(){
        $(this).css("background", "#eef");
        $(".navbar .btn-default").css("color", "#00dfff");
        $(this).css("border-left", "1px #00dfff solid");
    });
    $(".navbar .navbar-form input").blur(function(){
        $(this).css("background", "#fff");
        $(".navbar .btn-default").css("color", "#00afff");
        $(this).css("border-left", "1px #00afff solid");
    });

    $('#sidebar .sidbar-main .sidebar-content .list-group .list-group-item a').click(function(){
        $(this).next().slideToggle(500);
    });

    // captcha refresh
    $('#refresh').on('click', function () {
        var time = new Date().getTime();
        var oldCaptchaPath = $('img[alt=captcha]').attr('src');
        // مسیر سورس کپچا را از جایی که علامت سوال دارد
        // به دو قسمت میشکند و قسمت اول را برمیدارد
        // و یک علامت سوال و زمان جاری را به آن می افزاید
        var newCaptchaPath = oldCaptchaPath.split('?', 1) + '?' + time;
        $('img[alt=captcha]').attr('src', newCaptchaPath);
    });

    // scrol fade
    $(window).scroll(function(){
        if($(this).scrollTop() > 200){
            $('.scrollup').fadeIn();
        }
        else{
            $('.scrollup').fadeOut();
        }
    });

    // scrol to top
    $('.scrollup').click(function(){
        $('html, body').animate({scrollTop:0}, 700);
        return false;
    });

    // Add title to post's images
    $('.thumbnail img').attr('title', 'کلیک کنید برای مشاهده تصویر در اندازه واقعی');

    // Add data-toggle
    $('[title]').attr('data-toggle','tooltip');

    // tooltip
    $('[data-toggle="tooltip"]').tooltip();

});


