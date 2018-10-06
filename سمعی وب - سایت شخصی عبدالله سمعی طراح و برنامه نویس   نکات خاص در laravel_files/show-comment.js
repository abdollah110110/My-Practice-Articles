function formLoad(postId, commentId){
    $('.answer'+commentId).hide();
    $('.form-box').hide();
    $('.form-box .alert-success').hide();
    $("#success-error").empty();
    $('#username').removeClass('has-error');
    $('#url').removeClass('has-error');
    $('#email').removeClass('has-error');
    $('#body').removeClass('has-error');
    $(".fa-close").show();
    $('.comment'+commentId).append($('.form-box'));
    $('.form-box').fadeIn(1500);
//    $('#post_id').attr('value', postId);
    $('#parent_id').attr('value', commentId);
 }

 $(document).ready(function (){
    $("#success-error").hide();
    $(".fa-close").hide();

    $('.fa-close').click(function(){
        $(this).hide();
        $('.form-box').hide();
        $("#success-error").empty();
        $('#username').removeClass('has-error');
        $('#url').removeClass('has-error');
        $('#email').removeClass('has-error');
        $('#captcha').removeClass('has-error');
        $('#body').removeClass('has-error');
        $('.answer').show();
        $('#comments').after($('.form-box'));
        $('.form-box').fadeIn(1000);
//        $('#post_id').attr('value', 0);
        $('#parent_id').attr('value', 0);
    });

    $("#create-comment").submit(function(event){
        event.preventDefault();

        $("#success-error").hide(); // درصورتی که از قبل نمایش داده شده مخفی میشود
        $('#username').removeClass('has-error');
        $('#url').removeClass('has-error');
        $('#email').removeClass('has-error');
        $('#captcha').removeClass('has-error');
        $('#body').removeClass('has-error');

        var $this = $(this);
        var url = $this.attr('action');// get url

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: $this.serialize(),
            success: function(data) {
                var message = '<div class="alert alert-success text-right">' + data.message + '</div><br />';
                $("#success-error").html(message);
                $("#success-error").slideToggle(1000);
            },
            error: function(data) {
                var errors = data.responseJSON;
                var message = '<div class="alert alert-danger text-right"><ul>';
                $.each(errors, function (key, value) {
                    if(key == 'username'){
                        $('#username').addClass('has-error');
                    }
                    if(key == 'url'){
                        $('#url').addClass('has-error');
                    }
                    if(key == 'email'){
                        $('#email').addClass('has-error');
                    }
                    if(key == 'captcha'){
                        $('#captcha').addClass('has-error');
                    }
                    if(key == 'body'){
                        $('#body').addClass('has-error');
                    }
                    message += '<li>' /*+ key + ': '*/ + value + '</li>';
                });
                message += '</ul></div><br />';
                $("#success-error").html(message);
                $("#success-error").slideToggle(1000);
            }
        });
    });

    // تیک زدن یا تیک برداشتن همه چکباکسها
    $('#check-all').click(function(){
        // اگر اتریبیوت چکد وجود ندارد
        if (!$(this).attr('checked')) {
            // اتریبیوت چکد را اضافه کن
            $('input[type="checkbox"]').attr('checked', true);
            // تیکش را هم بزن
            $('input[type="checkbox"]').prop('checked', true);
            $('input[type="checkbox"]').checked = true;
        }
        else{
            // اتریبیوت چکد را حذف کن
            $('input[type="checkbox"]').removeAttr('checked');
            // تیکش را هم بردار
            $('input[type="checkbox"]').prop('checked', false);
            $('input[type="checkbox"]').checked = false;
        }
    });

});