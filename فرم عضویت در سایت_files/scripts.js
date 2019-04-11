// Check window width
$(document).ready(function ($) {
	var w = $(window).width();
	if(w < 280){
		$("body").empty(); 
		$("body").append('<p class="p-3">متاسفانه نمایشگر شما قابلیت نشان دادن این سایت را ندارد<br /><br /> لطفاً از یک نمایشگر با ابعاد بزرگتر از 280 پیکسل استفاده نمایید<br /><br /> با تشکر</p>'); 
	}
});
/*************************************************************************************************************************************/
// Add slideDown animation to Bootstrap dropdown when expanding.
$('.dropdown').on('show.bs.dropdown', function () {
	$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

// Add slideUp animation to Bootstrap dropdown when collapsing.
$('.dropdown').on('hide.bs.dropdown', function () {
	$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});
/*************************************************************************************************************************************/
// Activate Carousel
//$("#myCarousel").carousel();
/*************************************************************************************************************************************/
// Activate Modal
$(".modal").modal('show');
/*************************************************************************************************************************************/
// Scroll to top
$(document).ready(function ($) {
	$(window).scroll(function () {
		if ($(this).scrollTop() < 150) {
			$('#Scroll_to_top').fadeOut();
			$('.navbar').removeClass('py-0');
			$('.dropdown-menu').removeClass('mt-0');
			$('#basket').removeClass('top-basket');
		} 
		else {
			$('#Scroll_to_top').fadeIn();
			$('.navbar').addClass('py-0');
			$('.dropdown-menu').addClass('mt-0');
			$('#basket').addClass('top-basket');
		}
	});
	$('#Scroll_to_top').on('click', function () {
		$('html, body').animate({scrollTop: 0}, 1000);
		return false;
	});
});
/*************************************************************************************************************************************/
// Scroll to Contact form
$(function() {
  $('#contact').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	  if (target.length) {
		$('html,body').animate({
		  scrollTop: target.offset().top-60 /* 60 is space in padding top of contact us */
		}, 1000);
		return false;
	  }
	}
  });
});

/*************************************************************************************************************************************/