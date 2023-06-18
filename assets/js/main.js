/*

*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},

		};

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 350,
			noOpenerFade: true,
			alignment: 'center'
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Nav.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Carousels.
		$('.carousel').each(function() {

			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

			// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {

							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								xf.removeClass('loading');

							}, settings.carousels.fadeDelay);

						}
					});

				}
            
				const carouselVideos = document.querySelectorAll('.carousel-video');
				const carouselBlur = document.querySelector('.carousel-blur');
				const body = document.querySelector('body');
				
				carouselVideos.forEach(function (carouselVideo) {
				  carouselVideo.addEventListener('click', function () {
					this.classList.toggle('active');
					carouselBlur.classList.toggle('active');
					body.classList.toggle('video-playing');
				
					if (this.classList.contains('active')) {
					  this.querySelector('video').play();
					} else {
					  this.querySelector('video').pause();
					}
				  });
				});
				
				
						
			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;

							if (pos >= leftLimit) {

								window.clearInterval(timerId);
								pos = leftLimit;

							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Init.
				$window.on('load', function() {

					reelWidth = $reel[0].scrollWidth;

					if (browser.mobile) {

						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();

					}
					else {

						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();

					}

					$t._update();

					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});

		});
	//testimonial.

		$(document).ready(function() {
			$(".testimonial-carousel").owlCarousel({
			loop: true,
			margin: 10,
			responsiveClass: true,
			responsive: {
				0: {
				items: 1,
				nav: false
				},
				600: {
				items: 3,
				nav: false
				},
				1000: {
				items: 5,
				nav: false,
				loop: false
				}
			}
			});
		});
		
   //owl
     /* Add your custom JavaScript code here */
	 
		$(document).ready(function() {
			$(".owl-carousel").owlCarousel({
			loop: true,
			margin: 10,
			responsiveClass: true,
			responsive: {
				0: {
				items: 1,
				nav: false
				},
				600: {
				items: 3,
				nav: false
				},
				1000: {
				items: 5,
				nav: false,
				loop: false
				}
			}
			});
		});
  
		  
})(jQuery);