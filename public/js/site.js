$( function() {

	// console.log($('.bigass-wrapper').scrollTop());

	// $('.splash').each(function(){

		setTimeout(function() {
			$('.scroll-down').addClass('activate');
			console.log('show arrow');
		}, 1000);

	// 	$(window).scroll(function(event){
	// 		$(window).off('scroll');
	// 		$('.splash-wrapper').addClass('deactivate');
	// 		setTimeout(function() {
	// 			$('.splash-wrapper').remove();
	// 		}, 750);
	// 	});

	// }); // splash each

	var windowheight = $(window).height();

	var scrollHandler = function(){
		if ($(window).scrollTop() > windowheight) {
			$('.splash-wrapper').remove();
			$(this).scrollTop(0);
			$(window).off('scroll', scrollHandler);
		}
	}

	$(window).on('touchmove scroll', scrollHandler);

});