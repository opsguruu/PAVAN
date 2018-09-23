(function($) {
	
	'use strict';
	
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var activateSearch = false;
	
	$(document).ready(function(e) {
				
		// global
		var Modernizr = window.Modernizr;
		
		// support for CSS Transitions & transforms
		var support = Modernizr.csstransitions && Modernizr.csstransforms;
		var support3d = Modernizr.csstransforms3d;
		// transition end event name and transform name
		// transition end event name
		var transEndEventNames = {
								'WebkitTransition' : 'webkitTransitionEnd',
								'MozTransition' : 'transitionend',
								'OTransition' : 'oTransitionEnd',
								'msTransition' : 'MSTransitionEnd',
								'transition' : 'transitionend'
							},
		transformNames = {
						'WebkitTransform' : '-webkit-transform',
						'MozTransform' : '-moz-transform',
						'OTransform' : '-o-transform',
						'msTransform' : '-ms-transform',
						'transform' : 'transform'
					};
					
		if( support ) {
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.PMMain';
			this.transformName = transformNames[ Modernizr.prefixed( 'transform' ) ];
			//console.log('this.transformName = ' + this.transformName);
		}
				
		//Check for element animations
		animateMilestones();
		animateProgressBars();
		animatePieCharts();
		setDimensionsPieCharts();
		
		//Initialize WOW plugin for element animations
		new WOW().init();
		
		
	/* ==========================================================================
	   Countdowns
	   ========================================================================== */
		if ($('.pm-countdown-container').length > 0){
			 
			 $('.pm-countdown-container').countdown('2014/08/25', function(event) {
				$(this).html(event.strftime('%w weeks %d days %H:%M:%S'));
			 });
				
		}
		
	/* ==========================================================================
	   Main menu interaction
	   ========================================================================== */
			if( $('#pm-nav').length > 0 ){
							
				//superfish activation
				$('#pm-nav').superfish({
					delay: 0,
					animation: {opacity:'show',height:'show'},
					speed: 300,
					dropShadows: false,
				});
							
			};	
				
	/* ==========================================================================
	   Checkout expandable forms
	   ========================================================================== */
		if ($('#pm-returning-customer-form-trigger').length > 0){
			
			var $returningFormExpanded = false;
			
			$('#pm-returning-customer-form-trigger').on('click', function(e) {
				
				e.preventDefault();
				
				if( !$returningFormExpanded ) {
					$returningFormExpanded = true;
					$('#pm-returning-customer-form').fadeIn(700);
					
				} else {
					$returningFormExpanded = false;
					$('#pm-returning-customer-form').fadeOut(300);
				}
				
			});
			
		}
		
		if ($('#pm-promotional-code-form-trigger').length > 0){
			
			var $promotionFormExpanded = false;
			
			$('#pm-promotional-code-form-trigger').on('click', function(e) {
				
				e.preventDefault();
				
				if( !$promotionFormExpanded ) {
					$promotionFormExpanded = true;
					$('#pm-promotional-code-form').fadeIn(700);
					
				} else {
					$promotionFormExpanded = false;
					$('#pm-promotional-code-form').fadeOut(300);
				}
				
			});
			
		}
		
		
	/* ==========================================================================
	   animateMilestones
	   ========================================================================== */
	
		function animateMilestones() {
	
			$(".milestone:in-viewport").each(function() {
				
				var $t = $(this);
				var	n = $t.find(".milestone-value").attr("data-stop");
				var	r = parseInt($t.find(".milestone-value").attr("data-speed"));
					
				if (!$t.hasClass("already-animated")) {
					$t.addClass("already-animated");
					$({
						countNum: $t.find(".milestone-value").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							$t.find(".milestone-value").text(Math.floor(this.countNum));
						},
						complete: function() {
							$t.find(".milestone-value").text(this.countNum);
						}
					});
				}
				
			});
	
		}
		
	/* ==========================================================================
	   animateProgressBars
	   ========================================================================== */
	
		function animateProgressBars() {
				
			$(".pm-progress-bar .pm-progress-bar-outer:in-viewport").each(function() {
				
				var $t = $(this),
				progressID = $t.attr('id'),
				numID = progressID.substr(progressID.lastIndexOf("-") + 1),
				targetDesc = '#pm-progress-bar-desc-' + numID,
				$target = $(targetDesc).find('span'),
				dataWidth = $t.attr("data-width");
								
				
				if (!$t.hasClass("already-animated")) {
					$t.addClass("already-animated");
					$t.animate({
						width: dataWidth + "%"
					}, 2000);
					$target.animate({
						"left" : dataWidth + "%",
						"opacity" : 1
					}, 2000);
				}
				
			});
	
		}
		
	/* ==========================================================================
	   setDimensionsPieCharts
	   ========================================================================== */
		
		function setDimensionsPieCharts() {
	
			$(".pm-pie-chart").each(function() {
	
				var $t = $(this);
				var n = $t.parent().width();
				var r = $t.attr("data-barSize");
				
				if (n < r) {
					r = n;
				}
				
				$t.css("height", r);
				$t.css("width", r);
				$t.css("line-height", r + "px");
				
				$t.find("i").css({
					"line-height": r + "px",
					"font-size": r / 3
				});
				
			});
	
		}
	
	/* ==========================================================================
	   animatePieCharts
	   ========================================================================== */
	
		function animatePieCharts() {
	
			if(typeof $.fn.easyPieChart != 'undefined'){
	
				$(".pm-pie-chart:in-viewport").each(function() {
		
					var $t = $(this);
					var n = $t.parent().width();
					var r = $t.attr("data-barSize");
					
					if (n < r) {
						r = n;
					}
					
					$t.easyPieChart({
						animate: 1300,
						lineCap: "square",
						lineWidth: $t.attr("data-lineWidth"),
						size: r,
						barColor: $t.attr("data-barColor"),
						trackColor: $t.attr("data-trackColor"),
						scaleColor: "transparent",
						onStep: function(from, to, percent) {
							$(this.el).find('.pm-pie-chart-percent span').text(Math.round(percent));
						}
		
					});
					
				});
				
			}
	
		}
				
	/* ==========================================================================
	   isTouchDevice - return true if it is a touch device
	   ========================================================================== */
	
		function isTouchDevice() {
			return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
		}
				
		
		//dont load parallax on mobile devices
		function runParallax() {
			
			//enforce check to make sure we are not on a mobile device
			if( !isMobile.any()){
							
				//stellar parallax
				$.stellar({
				  horizontalOffset: 0,
				  verticalOffset: 0,
				  horizontalScrolling: false,
				});
				
				$('.pm-parallax-panel').stellar();
								
			}
			
		}//end of function
		
	/* ==========================================================================
	   Checkout form - Account password activation
	   ========================================================================== */
	   
	   if( $('#pm-create-account-checkbox').length > 0){
			  			
			$('#pm-create-account-checkbox').change(function(e) {
				
				if( $('#pm-create-account-checkbox').is(':checked') ){
					
					$('#pm-checkout-password-field').fadeIn(500);
					
				} else {
					$('#pm-checkout-password-field').fadeOut(500);	
				}
				
			});
			   
	   }
	   
	   
	 /* ==========================================================================
	   Accordion and Tabs
	   ========================================================================== */
	   
	    $('#accordion').collapse({
		  toggle: false
		})
	    $('#accordion2').collapse({
		  toggle: false
		})
	   
		if($('.panel-title').length > 0){
			
			var $prevItem = null;
			var $currItem = null;
			
			$('.pm-accordion-link').click(function(e) {
				
				var $this = $(this);
				
				if($prevItem == null){
					$prevItem = $this;
					$currItem = $this;
				} else {
					$prevItem = $currItem;
					$currItem = $this;
				}				
				
				
				if( $currItem.attr('href') != $prevItem.attr('href') ) {
										
					//toggle previous item
					if( $prevItem.parent().find('i').hasClass('fa fa-minus') ){
						$prevItem.parent().find('i').removeClass('fa fa-minus').addClass('fa fa-plus');
					}
					
					$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					
				} else if($currItem.attr('href') == $prevItem.attr('href')) {
										
					//else toggle same item
					if( $currItem.parent().find('i').hasClass('fa fa-minus') ){
						$currItem.parent().find('i').removeClass('fa fa-minus').addClass('fa fa-plus');
					} else {
						$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					}
						
				} else {
					
					//console.log('toggle current item');
					$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					
				}
				
				
			});

			
		}
		
		//tab menu
		if($('.nav-tabs').length > 0){
			//actiavte first tab of tab menu
			$('.nav-tabs a:first').tab('show');
			$('.nav.nav-tabs li:first-child').addClass('active');
		}
	   
		
	/* ==========================================================================
	   Header button redirects - for demo purposes only
	   ========================================================================== */

		if($('#pm-login-btn').length > 0){
			$('#pm-login-btn').on('click', function(e) {
				e.preventDefault();
				window.location.href = 'members-area.html';
			});
		}
		
		if($('.checkout-button').length > 0){
			$('.checkout-button').on('click', function(e) {
				e.preventDefault();
				window.location.href = 'checkout.html';
			});
		}
		
		
	/* ==========================================================================
	   Member archive widget drop menu
	   ========================================================================== */
		if($('.pm-dropdown.pm-member-archive-menu').length > 0){
			$('.pm-dropdown.pm-member-archive-menu').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		
		
		//destroy parallax effect on desktop < 980 else enable > 980
		var $window = $(window);
		var $windowsize = 0;
		
		function checkWidth() {
			$windowsize = $window.width();
			if ($windowsize < 980) {
				//if the window is less than 980px, destroy parallax...
				$.stellar('destroy');
			} else {
				runParallax();	
			}
		}
		
		// Execute on load
		checkWidth();
		// Bind event listener
		$(window).resize(checkWidth);
		
				
		//used for quick nav toggle
		var navHeight =  $('header').outerHeight(); //outerHeight gets height with padding
		var quickNavActive = false;
		
	/* ==========================================================================
	   When the window is scrolled, do
	   ========================================================================== */
		$(window).scroll(function () {
			
			animateMilestones();
			animateProgressBars();
			animatePieCharts();
			
			//toggle back to top btn
			if ($(this).scrollTop() > 50) {
				if( support ) {
					
					$('#back-top').css({ bottom : 0 });
				} else {
					$('#back-top').animate({ bottom : 0 });
				}
				
			} else {
				if( support ) {
					$('#back-top').css({ bottom : -70 });
				} else {
					$('#back-top').animate({ bottom : -70 });
				}
				
			}
			
			//toggle fixed nav
			if( $(window).width() > 991 ){
				
				if ($(this).scrollTop() > 47) {
					
					$('header').addClass('fixed');
									
				} else {
					
					$('header').removeClass('fixed');
										
				}
			
			}
			
			
						
		});
		
	/* ==========================================================================
	   Detect page scrolls on buttons
	   ========================================================================== */
		if( $('.pm-page-scroll').length > 0 ){
			
			$('.pm-page-scroll').click(function(e){
								
				e.preventDefault();
				var $this = $(e.target);
				var sectionID = $this.attr('href');
				
				
				$('html, body').animate({
					scrollTop: $(sectionID).offset().top - 80
				}, 1000);
				
			});
			
		}
		
		
	/* ==========================================================================
	   OWL Carousels
	   ========================================================================== */
		
		if ( $('#pm-presentation-owl').length > 0 ){
			
			//Activate presentation post interaction
			$('.pm-presentation-post-container').PMHoverPanel({
				slideType: 'presentationPostPanel',
				animationSpeed: 600,
				easing : "easeOutCubic",
				scaleValue : 1.2
			});
			
			//Activate Own Carousel
			$("#pm-presentation-owl").owlCarousel({
			
				 // Most important owl features
				items : 3,
				itemsCustom : false,
				itemsDesktop : [5000,3],
				itemsDesktopSmall : [991,2],
				itemsTablet: [767,2],
				itemsTabletSmall: [720,1],
				itemsMobile : [320,1],
				singleItem : false,
				itemsScaleUp : false,
				 
				//Basic Speeds
				slideSpeed : 500,
				paginationSpeed : 800,
				rewindSpeed : 1000,
				 
				//Autoplay
				autoPlay : false,
				stopOnHover : false,
				 
				// Navigation
				navigation : true,
				navigationText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
				rewindNav : true,
				scrollPerPage : false,
				 
				//Pagination
				pagination : false,
				paginationNumbers: false,
				 
				// Responsive
				responsive: true,
				responsiveRefreshRate : 200,
				responsiveBaseWidth: window,
				 
				// CSS Styles
				baseClass : "owl-carousel",
				theme : "owl-theme",
				 
				//Lazy load
				lazyLoad : false,
				lazyFollow : true,
				lazyEffect : "fade",
				 
				//Auto height
				autoHeight : false,
				 
				//Mouse Events
				dragBeforeAnimFinish : true,
				mouseDrag : true,
				touchDrag : true,
				 
			});
			
		}
		
		if ( $('#pm-partners-carousel-owl').length > 0 ){
			
			//Activate Own Carousel
			$("#pm-partners-carousel-owl").owlCarousel({
			
				 // Most important owl features
				items : 4,
				itemsCustom : false,
				itemsDesktop : [1200,3],
				itemsDesktopSmall : [991,3],
				itemsTablet: [767,2],
				itemsTabletSmall: [720,1],
				itemsMobile : [320,1],
				singleItem : false,
				itemsScaleUp : false,
				 
				//Basic Speeds
				slideSpeed : 500,
				paginationSpeed : 800,
				rewindSpeed : 1000,
				 
				//Autoplay
				autoPlay : false,
				stopOnHover : false,
				 
				// Navigation
				navigation : true,
				navigationText : ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
				rewindNav : true,
				scrollPerPage : false,
				 
				//Pagination
				pagination : false,
				paginationNumbers: false,
				 
				// Responsive
				responsive: true,
				responsiveRefreshRate : 200,
				responsiveBaseWidth: window,
				 
				// CSS Styles
				baseClass : "owl-carousel",
				theme : "owl-theme",
				 
				//Lazy load
				lazyLoad : false,
				lazyFollow : true,
				lazyEffect : "fade",
				 
				//Auto height
				autoHeight : true,
				 
				//Mouse Events
				dragBeforeAnimFinish : true,
				mouseDrag : true,
				touchDrag : true,
				 
			});
			
		}
		
		
		if ( $('#pm-testimonials-carousel-owl').length > 0 ){
			
			//Activate Own Carousel
			$("#pm-testimonials-carousel-owl").owlCarousel({
			
				 // Most important owl features
				items : 1,
				itemsCustom : false,
				itemsDesktop : [1200,1],
				itemsDesktopSmall : [991,1],
				itemsTablet: [767,1],
				itemsTabletSmall: [720,1],
				itemsMobile : [320,1],
				singleItem : false,
				itemsScaleUp : false,
				 
				//Basic Speeds
				slideSpeed : 800,
				paginationSpeed : 800,
				rewindSpeed : 1000,
				 
				//Autoplay
				autoPlay : false,
				stopOnHover : false,
				 
				// Navigation
				navigation : true,
				navigationText : ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
				rewindNav : true,
				scrollPerPage : false,
				 
				//Pagination
				pagination : false,
				paginationNumbers: false,
				 
				// Responsive
				responsive: true,
				responsiveRefreshRate : 200,
				responsiveBaseWidth: window,
				 
				// CSS Styles
				baseClass : "owl-carousel",
				theme : "owl-theme",
				 
				//Lazy load
				lazyLoad : false,
				lazyFollow : true,
				lazyEffect : "fade",
				 
				//Auto height
				autoHeight : true,
				 
				//Mouse Events
				dragBeforeAnimFinish : true,
				mouseDrag : true,
				touchDrag : true,
				 
			});
			
		}
		
		
		if ( $('#pm-interactive-panels-owl').length > 0 ){
			
			//Activate Own Carousel
			$("#pm-interactive-panels-owl").owlCarousel({
			
				 // Most important owl features
				items : 3,
				itemsCustom : false,
				itemsDesktop : [1200,3],
				itemsDesktopSmall : [991,2],
				itemsTablet: [767,1],
				itemsTabletSmall: [720,1],
				itemsMobile : [320,1],
				singleItem : false,
				itemsScaleUp : false,
				 
				//Basic Speeds
				slideSpeed : 800,
				paginationSpeed : 800,
				rewindSpeed : 1000,
				 
				//Autoplay
				autoPlay : false,
				stopOnHover : false,
				 
				// Responsive
				responsive: true,
				responsiveRefreshRate : 200,
				responsiveBaseWidth: window,
				 
				// CSS Styles
				baseClass : "owl-carousel",
				theme : "owl-theme",
				 
				//Lazy load
				lazyLoad : false,
				lazyFollow : true,
				lazyEffect : "fade",
				 
				//Auto height
				autoHeight : true,
				 
				//Mouse Events
				dragBeforeAnimFinish : true,
				mouseDrag : true,
				touchDrag : true,
				 
			});
			
		}
		
	/* ==========================================================================
	   Blog posts interaction
	   ========================================================================== */
		if( $('.pm-blog-post-img-container').length > 0 ) {
			$('.pm-blog-post-img-container').PMHoverPanel({
				slideType: 'blogPostPanel',
				animationSpeed: 600,
				easing : "easeOutCubic",
				scaleValue : 1.2
			});
		}
		
		
	/* ==========================================================================
	   Mobile menu button toggle
	   ========================================================================== */
		if( $('#pm-mobile-menu-btn').length > 0 ){
			
			var menuCollapsed = false;
			
			$('#pm-mobile-menu-btn').on('click', function(e) {
				
				var $icon = $(this).find('i');
				
				if( !menuCollapsed ){
					
					menuCollapsed = true;
					
					$icon.removeClass('fa-bars').addClass('fa-minus');
					
				} else {
					
					menuCollapsed = false;
					
					$icon.removeClass('fa-minus').addClass('fa-bars');
						
				}
				
			});
			
		}
	
	/* ==========================================================================
	   Back to top button
	   ========================================================================== */
		$('#back-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
	/* ==========================================================================
	   Accordion menu
	   ========================================================================== */
		if($('#accordionMenu').length > 0){
			$('#accordionMenu').collapse({
				toggle: false,
				parent: false,
			});
		}
		
		
	/* ==========================================================================
	   Tab menu
	   ========================================================================== */
		if($('.pm-nav-tabs').length > 0){
			//actiavte first tab of tab menu
			$('.pm-nav-tabs a:first').tab('show');
			$('.pm-nav-tabs li:first-child').addClass('active');
		}

		
	/* ==========================================================================
	   Window resize call
	   ========================================================================== */
		$(window).resize(function(e) {
			methods.windowResize();
		});

		
	
		if( $('#pm-search-btn').length > 0 ){
						
			var $searchBtn = $('#pm-search-btn');
			
			$searchBtn.click(function(e) {
				
				//CALL METHODS FUNCTION
				methods.displaySearch();
								
				$('#pm-search-exit').click(function(e) {
					methods.hideSearch();
				});
											
				e.preventDefault();
			
			});
			
		}
		
	/* ==========================================================================
	   Tooltips
	   ========================================================================== */
		if( $('.pm_tip').length > 0 ){
			$('.pm_tip').PMToolTip();
		}
		if( $('.pm_tip_static_bottom').length > 0 ){
			$('.pm_tip_static_bottom').PMToolTip({
				floatType : 'staticBottom'
			});
		}
		if( $('.pm_tip_static_top').length > 0 ){
			$('.pm_tip_static_top').PMToolTip({
				floatType : 'staticTop'
			});
		}
		
	/* ==========================================================================
	   TinyNav
	   ========================================================================== */
		$("#pm-footer-nav").tinyNav();
		$("#pm-members-nav").tinyNav();
		
			
	}); //end of document ready

	
	/* ==========================================================================
	   Options
	   ========================================================================== */
		var options = {
			dropDownSpeed : 100,
			slideUpSpeed : 200,
			slideDownTabSpeed: 50,
			changeTabSpeed: 200,
		}
	
	/* ==========================================================================
	   Methods
	   ========================================================================== */
		var methods = {
	
			displaySearch : function(e) {
							
				var searchContainer = $("#pm-search-container");
				
				searchContainer.css({
					'height' : $(window).height(),
					'opacity' : 1
				});
				
			},
			
			hideSearch : function(e) {
				
				var searchContainer = $("#pm-search-container");
				
				searchContainer.css({
					'opacity' : 0,
					'height' : 0
				});
				
			},

			
			dropDownMenu : function(e){  
					
				var body = $(this).find('> :last-child');
				var head = $(this).find('> :first-child');
				
				if (e.type == 'mouseover'){
					body.fadeIn(options.dropDownSpeed);
				} else {
					body.fadeOut(options.dropDownSpeed);
				}
				
			},
			
					
			windowResize : function() {
				//resize calls
			},
			
		};
		
	
	
})(jQuery);


function SubcribeBSBFooter(formId){
	var $form = formId && $(formId) || $('#pm-footer-subscribe');
	var data = $form.serialize();
	if(data.search("Name=")==-1)
		data += "&Name="

      var jqxhr = $.ajax({
        url: subscriber_sheet,
        method: "GET",
        dataType: "json",
        data: data
      }).success(
        function(data){
            $form[0].reset();
        }
      );
}

$('#mc-embedded-subscribe').on("click",function(e){
	e.preventDefault();
	SubcribeBSBFooter("#home-page-subscribe");
});