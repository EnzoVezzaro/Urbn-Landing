/* Template: Blink SaaS App Website Bootstrap HTML Template
   Description: Custom JS file
*/


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
	

	/* Image Slider - Swiper */
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
		},
        loop: false,
        spaceBetween: 50,
        slidesPerView: 3,
		breakpoints: {
            // when window is <= 575px
            575: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 767px
            767: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 991px
            991: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1199px
            1199: {
                slidesPerView: 3,
                spaceBetween: 20
            },

        }
    });
    

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 5000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 2,
		spaceBetween: 40,
        breakpoints: {
            // when window is <= 991px
            991: {
                slidesPerView: 1
            }
        }
    });


    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});


    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var token = url.searchParams.get("token_id");
    console.log(token);

    if (token){
        checkIten(token);
    }

    /* Verify Item with Token ID */
    function checkIten(token_id){
        console.log('getting item with token id: ', token_id);
        $.ajax({url: `https://urbn-backoffice.herokuapp.com/nf-ts?token_id=${token_id}`,
            contentType: "application/json",
            type:'GET',
            success: function(result) {
                console.log(result[0])

                let html = '';
                if (result.length > 0){
                    let item = result[0];
                    console.log(item);
                    // check if there's a certificate
                    if (item.certificate){
                        console.log(item.certificate.url);
                        html = `
                        <iframe src="${item.certificate_url}" width="100%" height="500px">
                        `;
                    } else {
                        html = '<p>Certificate not available, yet. Retry later.</p>';
                    }
                } else {
                    html = '<p>Item not Found</p>';
                }
                $('#certification').html(html);
            },
            fail: function(xhr, status, error) {
                // error handling
                console.log(xhr, status, error);
            }

        });
    }

    $('button#checkItem').click( function(e) {
        e.preventDefault();

        let token_id = $('form#verifyForm').find('input[name="token_id"]').val()
        console.log('token: ', token_id);
        
        checkIten(token_id);
        
    });

    

})(jQuery);