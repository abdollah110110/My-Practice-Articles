$(document).ready(function(){
	
	$('.inputmodal').blur(function()
	{
	          $(this).addClass('warning');
	});
	$(".questionsend").click(function(){
		$(".question_send").show();
	});
	$(".users").click(function(){
		$(".question_send").hide();
	});
	$(document).on('click', '.close', function() { $(".ns-box").hide(); });
	headerResizer();
	function headerResizer(){
		if($(document).scrollTop() == 0){
			$("#header").removeClass("moved", 10, 'easeOutBounce');
		}else{
			$("#header").addClass("moved", 10, 'easeOutBounce');
		}
	}
	$(window).scroll(function(){
		headerResizer();
	});
	$(window).resize(function(){
		headerResizer();
	});
	$(".part").click(function(){
		var link = jQuery(this).find(".link").text();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		$(".big iframe").attr("src", link);
	});
	$(".search").click(function(){
			$(".gsc-input").attr("placeholder", "دنبال چی می گردی؟");
	})
	moment.loadPersian(), $("time").each(function(e, t) {
			var r = moment($(t).attr("datetime")),
					o = moment(),
					s = moment($(t).attr("datetime"));
			$(t).html(o.diff(s, "days") < 5 ? "<span>" + r.fromNow() + "</span>" : "<span>" + r.format("jDD, jMMMM, jYYYY, h:mm") + "</span>")
	});
	
	$('body').on('submit', '.ajaxForm3', function (e) {
			Materialize.toast("منتظر بمانید", 500);
			$(".continuousarticle .name").addClass('disabled');
			$('.continuousarticle .submit').attr('disabled', 'disabled');

			e.preventDefault();
			$.ajax({
					type: $(this).attr('method'),
					url: $(this).attr('action'),
					data: $(this).serialize()
			})
			.done(function (data){
					if (typeof data.message !== 'undefined'){
						if(data.message == "1"){
							Materialize.toast("خطا در پردازش. صفحه را مجددا بارگزاری کنید!", 4000);
							$(".continuousarticle .name").removeClass('disabled');
							$('.continuousarticle .submit').removeAttr('disabled');
							$(".ns-box").hide();
						}else if(data.message == "3"){
							Materialize.toast("ایمیل وارد شده نا معتبر است!", 4000);
							$(".continuousarticle .name").removeClass('disabled');
							$('.continuousarticle .submit').removeAttr('disabled');
						}else if(data.message == "4"){
							Materialize.toast("شما عضو خبرنامه بوده اید!", 4000);
							$(".continuousarticle .name").removeClass('disabled');
							$('.continuousarticle .submit').removeAttr('disabled');
							$(".ns-box").hide();
						}else{
							Materialize.toast("شما به عضویت خبرنامه هیتوس در آمدید!", 4000);
							$(".ns-box").hide();
						}
					}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
					if (typeof jqXHR.responseJSON !== 'undefined') {
							if (jqXHR.responseJSON.hasOwnProperty('form')) {
									$('#form_body').html(jqXHR.responseJSON.form);
							}

							$('.form_error').html(jqXHR.responseJSON.message);

					} else {
							alert(errorThrown);
					}

			});
	});

    $('body').on('submit', '.ajaxForm2', function (e) {
		$(".newsletter-input").addClass('disabled');
		$('.newsletter .success').css('display', 'none');
		$('.newsletter .process').css('display', 'block');
		$('.newsletter .process').css('opacity', '1');
		$('.newsletter-submit').attr('disabled', 'disabled');

        e.preventDefault();
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize()
        })
        .done(function (data){
            if (typeof data.message !== 'undefined'){
            	if(data.message == "1"){
            		Materialize.toast("خطا در پردازش. صفحه را مجددا بارگزاری کنید!", 4000);
								$(".newsletter-input").removeClass('disabled');
								$('.newsletter .process').css('opacity', '0');
								$('.newsletter-submit').removeAttr('disabled');
            	}else if(data.message == "2"){
            		Materialize.toast("ایمیل وارد شده نا معتبر است!", 4000);
								$(".newsletter-input").addClass('orangeborder');
								$(".newsletter-input").removeClass('disabled');
								$('.newsletter .process').css('opacity', '0');
								$('.newsletter-submit').removeAttr('disabled');
            	}else if(data.message == "3"){
            		Materialize.toast("شما عضو خبرنامه هیتوس بوده اید!", 4000);
								$(".newsletter-input").removeClass('orangeborder');
								$(".newsletter-input").removeClass('disabled');
								$('.newsletter .process').css('opacity', '0');
								$('.newsletter-submit').removeAttr('disabled');
            	}else{
            		Materialize.toast("شما به عضویت خبرنامه هیتوس در آمده اید.", 4000);
								$(".newsletter-input").removeClass('orangeborder');
								$(".newsletter-input").removeClass('disabled');
								$('.newsletter .process').css('display', 'none');
								$('.newsletter .success').css('display', 'block');
								$('.newsletter-submit').removeAttr('disabled');
            	}
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (typeof jqXHR.responseJSON !== 'undefined') {
                if (jqXHR.responseJSON.hasOwnProperty('form')) {
                    $('#form_body').html(jqXHR.responseJSON.form);
                }

                $('.form_error').html(jqXHR.responseJSON.message);

            } else {
                alert(errorThrown);
            }

        });
    });

    $('body').on('submit', '.ajaxForm', function (e) {
		$(".comments .name, .comments textarea, .submit").attr('readonly', 'readonly');
		$('.comments .success').css('display', 'none');
		$('.comments .process').css('display', 'block');
		$('.comments .process').css('opacity', '1');
        e.preventDefault();
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize()
        })
        .done(function (data){
            if (typeof data.message !== 'undefined'){
            	if(data.message == "1"){
            		Materialize.toast("خطا در پردازش. صفحه را مجددا بارگزاری کنید!", 4000);
					$(".comments .name, .comments textarea, .submit, .content .title, .checkbox").hide();
            	}else if(data.message == "2"){
            		Materialize.toast("نام وارد شده حاوی کاراکتر غیر مجاز و یا کوچکتر از 3 کاراکتر است!", 4000);
            		$(".comments .name, .comments textarea, .submit").removeAttr('readonly');
					$(".namefield").addClass('orangeborder');
					$('.comments .process').css('opacity', '0');
            	}else if(data.message == "3"){
            		Materialize.toast("ایمیل وارد شده نا معتبر است!", 4000);
					$(".emailfield").addClass('orangeborder');
            		$(".comments .name, .comments textarea, .submit").removeAttr('readonly');
					$('.comments .process').css('opacity', '0');
				}else if(data.message == "4"){
            		Materialize.toast("نظر را وارد کنید!", 4000);
					$("textarea").addClass('orangeborder');
					$(".comments .name, .comments textarea, .submit").removeAttr('readonly');
					$('.comments .process').css('opacity', '0');
            	}else{
					Materialize.toast("پیام شما با موفقیت ثبت شد", 4000);
					$(".comments .name, .comments textarea, .submit, .content .title, .checkbox").hide();
					$('.comments .process').css('display', 'none');
					$('.comments .success').css('display', 'block');
            	}
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (typeof jqXHR.responseJSON !== 'undefined') {
                if (jqXHR.responseJSON.hasOwnProperty('form')) {
                    $('#form_body').html(jqXHR.responseJSON.form);
                }

                $('.form_error').html(jqXHR.responseJSON.message);

            } else {
                alert(errorThrown);
            }

        });
    });

    $('body').on('submit', '.ajaxForm4', function (e){
    	Materialize.toast("لطفا منتظر بمانید!", 4000);
    	tinymce.activeEditor.setMode("readonly");
    	$("#send-question .inputmodal, #send-question .submit").attr('readonly', 'readonly');
        e.preventDefault();
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize()
        })
        .done(function (data){
            if (typeof data.message !== 'undefined'){
            	if(data.message == "1"){
            		Materialize.toast("خطا در پردازش. صفحه را مجددا بارگزاری کنید!", 4000);
					$(".comments .name, .comments textarea, .submit, .content .title, .checkbox").hide();
            	}else if(data.message == "2"){
            		Materialize.toast("عنوان را وارد کنید!", 4000);
			    	tinymce.activeEditor.setMode();
			    	$("#send-question .inputmodal, #send-question .submit").removeAttr('readonly');
            	}else if(data.message == "3"){
            		Materialize.toast("عنوان وارد شده بسیار بلند است!", 4000);
			    	tinymce.activeEditor.setMode();
			    	$("#send-question .inputmodal, #send-question .submit").removeAttr('readonly');
				}else if(data.message == "4"){
            		Materialize.toast("سوال را وارد کنید!", 4000);
			    	tinymce.activeEditor.setMode();
			    	$("#send-question .inputmodal, #send-question .submit").removeAttr('readonly');
            	}else if(data.message == "5"){
            		Materialize.toast("موضوع را وارد کنید2!", 4000);
			    	tinymce.activeEditor.setMode();
			    	$("#send-question .inputmodal, #send-question .submit").removeAttr('readonly');
            	}else{
            		window.location = data.redirect;
            	}
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown){
            if(typeof jqXHR.responseJSON !== 'undefined'){
                if(jqXHR.responseJSON.hasOwnProperty('form')){
                    $('#form_body').html(jqXHR.responseJSON.form);}
                $('.form_error').html(jqXHR.responseJSON.message);
            }else{
                alert(errorThrown);
            }
        });
    });
	$('.modal-trigger').leanModal();

	$("#mobile-nav, .mobileoverlay").click(function(){

		$("#header").css("max-height", $("#mobile-nav").height());
		$("#mobile-nav").css("max-height", $("#mobile-nav").height());

		$("body").toggleClass("body-mobile");
		$("#mobile-menu").toggle();
		if($("body").hasClass("body-mobile")){
			var mobilewidth= $(document).width();
			$("#bigheader, .main, footer").css({"width": mobilewidth});
			$("html").css({"overflow": "hidden"});
			$("body").stop().animate({right: "251px"});
			$("#mobile-menu").stop().animate({width: "260px"});
		}else{
			$("#bigheader, .main, footer").css({"width": "auto"});
			$("html").css({"overflow": "auto"});
			$("body").stop().animate({right: "0px"});
			$("#mobile-menu").stop().animate({width: "0px"});
		}
	})

	$(".mobile-menu-close").click(function(){
		$(".mobile-menu-close").hide();
		$(".mobile-ul").hide();
		$("#mobile-menu").stop().animate({height: "0%"});
	})

	$(".mobile-search").click(function(){
		$(this).addClass('mobile-search-full');
	})
})