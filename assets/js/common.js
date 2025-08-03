//LNB
var scrollEnabled = true;
function lnb(obj){
	return false;
};
//반응형 리사이즈
var triggerpoint = 720;
$(window).resize(function (){
  if(window.innerWidth > triggerpoint) {
	if(typeof(desktop) == "undefined") {
	  desktop = true;
	  mobile = undefined;
	  pc();
	}
  }else{
	if (typeof(mobile) == "undefined") {
	  mobile = true;
	  desktop = undefined;
	  mo();
	}
  }
  $("html").removeClass("nav-opened");
});
function pc(){
	$(".wrap").removeClass("wrap-mo").addClass("wrap-pc");
	$(".wrap-pc .header .nav").children("li").each(function(){
		$(this).hover(
			function(e){ 
				$(this).addClass("activate");
				$(this).siblings("li").addClass("inactive");
			},
			function(e){
				$(this).removeClass("activate");
				$(this).siblings("li").removeClass("inactive");
			} 
		);
	});
	$(".wrap-pc .depth2").css("display","");
	$(".wrap-pc .depth2 a.link").off("click").on("click" , function(){
		$(this).closest(".depth1").removeClass("activate");
		$(this).closest(".depth2").css("display","");
	});
	if($(".btn-comm").length) { 
        var position = $(window).scrollTop(),
			dh = $(document).height(),
			footer = $(".footer").height(),
			wh = $(window).height();
		if(position>=dh-wh-footer){
			$(".btn-comm").addClass("float");
		}else{
			$(".btn-comm").removeClass("float");
		};
        $(window).scroll(function() {
			var position = $(window).scrollTop(),
				dh = $(document).height(),
				footer = $(".footer").height(),
				wh = $(window).height();
			if(position>=dh-wh-footer){
				$(".btn-comm").addClass("float");
			}else{
				$(".btn-comm").removeClass("float");
			};
        });
    };
};
function mo(){
	$(".wrap").removeClass("wrap-pc").addClass("wrap-mo");
	$(".header .nav").children("li").removeClass("activate inactive");
	$(".wrap-mo .header .nav").children("li").unbind('mouseenter mouseleave')
	$(".wrap-mo .header .depth1").children("a").each(function(){
		$(this).off("click").on("click" , function(e){
			e.preventDefault();
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				$(this).next(".depth2").stop().slideUp(300);
			}else{
				$(this).closest(".depth1").siblings(".depth1").find("a").removeClass("active");
				$(this).closest(".depth1").siblings(".depth1").find(".depth2").stop().slideUp(300);
				$(this).addClass("active");
				$(this).next(".depth2").stop().slideDown(300);
			};
		});
	});
	$(".footer .sitemap").find("dt").each(function(){
		$(this).off("click").on("click" , function(e){
			if($(this).hasClass("is-active")){
				$(this).removeClass("is-active");
				$(this).next("dd").stop().slideUp(300);
			}else{
				$(this).closest("li").siblings("li").find("dt").removeClass("is-active");
				$(this).closest("li").siblings("li").find("dd").stop().slideUp(300);
				$(this).addClass("is-active");
				$(this).next("dd").stop().slideDown(300);
			};
		});
	});
	//tabPos();
	if($(".res-tabs").length){
		var ww = $(window).width();
		var mySwiper = undefined;
		function initSwiper() {
		  if (ww <= 720 && mySwiper == undefined) {
			mySwiper = new Swiper(".res-tabs", {
				observer: true,
				observeParents: true,
				preventClicks: true,
				preventClicksPropagation: false,
				slidesPerView: "auto",
				spaceBetween:0,
				freeMode: {
					enabled: false,
					sticky: false,
					momentumBounce: false
				}
			});
		  } else if (ww > 720 && mySwiper != undefined) {
			mySwiper.destroy();
			mySwiper = undefined;
		  }
		};

		initSwiper();

		$(window).on('resize', function () {
		  ww = $(window).width();
		  initSwiper();
		});
		// 클릭요소 중앙정렬
		function tabPos(){
			var snbwrap = $(".tabs-wrapper");
			var target = $(".res-tabs a.on").parent("li");
			var targetPos = $(".res-tabs a.on").parent("li").position();
			var boxWidth = $(".res-tabs").width();
			var wrapWidths=0;
			var wrapWidth=0;
			snbwrap.find(".swiper-slide").each(function(){
				wrapWidths += $(this).outerWidth() ;
			});
			var wrapWidth = wrapWidths ;
			var selectTargetPos = targetPos.left + target.outerWidth()/2;
			var pos;
			if(selectTargetPos <= boxWidth/2){
				pos = 0
			}else if(wrapWidth - selectTargetPos <= boxWidth/2){
				pos = wrapWidth-boxWidth;
			}else{
				pos = targetPos.left - (boxWidth/2) + (target.outerWidth()/2);
			}
			if(wrapWidth > boxWidth) {
				setTimeout(function(){snbwrap.css({
					"transform": "translate3d("+ ((pos*-1)) +"px, 0, 0)",
					"transition-duration": "300ms"
				})}, 200);
			}
		};
		tabPos()
		/*var $lankTitle = $(".tabs .swiper-slide a");
		$lankTitle.click(function(e){
			var target = $(this).parent();
			var idx = target.index();
			$lankTitle.parent().removeClass("on")
			target.addClass("on");
			muCenter(target);
			$(".tab-area .tab-cont").removeClass("on");
			$(".tab-area .tab-cont").eq(idx).addClass("on");
			return false;
		});*/
	};
	if($(".list-board").length) {
		$(".board-tb .board-title-wrap a").each(function(e){			
			if($(this).height()>52){
				$(this).closest(".board-title").addClass("line");
			};
		});
	};
	//wing버튼     
	if($(".btn-comm").length) { 
		var $class = $(".main-container").length ? "float single" : "float";
        var position = $(window).scrollTop(),
			dh = $(document).height(),
			wh = $(window).height();
		if(position>=dh-wh){
			$(".btn-comm").addClass("maximize");
		}else{
			$(".btn-comm").removeClass("maximize");
		};
        $(window).scroll(function() {
			var position = $(window).scrollTop(),
				dh = $(document).height(),
				wh = $(window).height();
			if(position>=dh-wh){
				$(".btn-comm").addClass("maximize");
			}else{
				$(".btn-comm").removeClass("maximize");
			};
        });
    };
};	

$(function(){
	var triggerpoint = 720;
	var ww = window.innerWidth;
	if(ww <= triggerpoint){
		mo();
	}else{
		pc();
	};
	var $scroll = $(window).scrollTop();
	if($scroll > 50){
		$("html").addClass("scrolled");
	};
	$(window).scroll(function(){
		var $scroll = $(window).scrollTop();
		var $scrollLeft = -this.scrollX    
		$(".scroll-x").css({left:$scrollLeft});
		if($scroll > 50){
			$("html").addClass("scrolled");
		}else{
			$("html").removeClass("scrolled");
		};
	});
	//팝업 열기 버튼 공통
	$(".btn-layer").each(function(e){
		$(this).off("click").on("click" , function(e){
			e.preventDefault();
			openpop(this);
		});
	});
	//팝업 닫기 버튼 공통
	$(".layer-close").each(function(){
		$(this).off("click").on("click" , function(e){
			e.preventDefault();
			closepop(this);
			if($(this).hasClass("close-all")){
				$("html").removeClass("is-opened over over2");
				$(".layerpop").each(function(){
					$(this).removeClass("is-opened");
				});
			};
			if($(this).closest(".layerpop").hasClass("type-vd")){
				embed = $(this).attr("data-link");
				$(this).closest(".layerpop").find(".video-wrap").html("");
			};
		});
	});
	//dim 클릭시 팝업 닫기
	$(".dim").each(function(){
		$(this).off("click").on("click" , function(e){
			e.preventDefault();
			$("html").removeClass("is-opened over over2");
			$(".layerpop").each(function(){
				$(this).removeClass("is-opened");
			});
		});
	});
	//nav
	$(".btn-nav").on("click" , function(){
		if($(this).hasClass("is-active")){
			$(this).removeClass("is-active");
			$("html").removeClass("nav-opened");
			if($(".main-wrap").length) {
				$.fn.fullpage.setAllowScrolling(true);
				$.fn.fullpage.setKeyboardScrolling(true);
			};
		}else{
			$(this).addClass("is-active");
			$("html").addClass("nav-opened");
			if($(".main-wrap").length) {
				$.fn.fullpage.setAllowScrolling(false);
				$.fn.fullpage.setKeyboardScrolling(false);
			}
		};
	});
	//메인
	$(".btn-service").on("click" , function(){
		if($(this).hasClass("is-active")){
			$(this).removeClass("is-active");
			$("html").removeClass("is-opened");
			$(".about-service").removeClass("is-active");
			$.fn.fullpage.setAllowScrolling(true);
			$.fn.fullpage.setKeyboardScrolling(true);
		}else{
			$(this).addClass("is-active");
			$("html").addClass("is-opened");
			$(".about-service").addClass("is-active");
			$.fn.fullpage.setAllowScrolling(false);
			$.fn.fullpage.setKeyboardScrolling(false);
		};
	});
	//메인
	$(".about-service").on("click" , function(){
		if($(this).hasClass("is-active")){
			$(this).removeClass("is-active");
			$("html").removeClass("is-opened");
			$(".btn-service").removeClass("is-active");
			$.fn.fullpage.setAllowScrolling(true);
			$.fn.fullpage.setKeyboardScrolling(true);
		}else{
			$(this).addClass("is-active");
			$("html").addClass("is-opened");
			$(".btn-service").addClass("is-active");
			$.fn.fullpage.setAllowScrolling(false);
			$.fn.fullpage.setKeyboardScrolling(false);
		};
	});
	//아코디언
	if($(".accordion").length) { 
		$(".accordion dt").each(function(){
			$(this).off("click").on("click" , function(e){
				if($(this).hasClass("is-active")){
					$(this).removeClass("is-active");
					$(this).next("dd").stop().slideUp(300);
				}else{
					$(this).siblings("dt").removeClass("is-active");
					$(this).siblings("dd").stop().slideUp(300);
					$(this).addClass("is-active");
					$(this).next("dd").stop().slideDown(300);
				};
			});
		});
    };
	if($(".default-tab").length) {
		$(".default-tab dt").each(function(){
			$(this).off("click").on("click" , function(e){
				if(!$(this).hasClass("is-active")){
					$(this).siblings("dt").removeClass("is-active");
					$(this).siblings("dd").stop().slideUp(300);
					$(this).addClass("is-active");
					$(this).next("dd").stop().slideDown(300);
				};
			});
		});
    };
	if($(".tab-list-area").length) {
		$(".tab-list li").each(function(){
			$(this).off("click").on("click" , function(e){
				var $idx = $(this).index();
				if(!$(this).hasClass("is-active")){
					$(this).siblings("li").removeClass("is-active");
					$(this).closest("ul").siblings(".tab-cont-box").find(".tab-cont").removeClass("on");
					$(this).addClass("is-active");
					$(this).closest("ul").siblings(".tab-cont-box").find(".tab-cont").eq($idx).addClass("on");
				};
			});
		});
    };
	if($(".history-swiper").length) {
		var hisSwiper = new Swiper(".history-swiper", {
			spaceBetween: 28,
			slidesPerView: "auto",
			observeParents:true,
			observe:true,
			speed:1000,
			pagination: {
				el: ".history-swiper .swiper-pagination",
				type: "progressbar",
			},
			breakpoints: {
				721: {
				  spaceBetween: 120,
				},
			},
		});
    };
	if($(".partner-swiper").length) {
		var ptSwiper = new Swiper(".partner-swiper", {
			spaceBetween: 40,
			slidesPerView: "auto",
			observeParents:true,
			observe:true,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			},
			speed:1000,
			loop:true,
			allowTouchMove: false,
			breakpoints: {
				721: {
				  spaceBetween: 110,
				},
			},
		});
    };
	//LNB
	$(".cont-wrap .cont-box").each(function(){
		var $head = $(".header").height();
		$(".lnb li").off("click").on("click" , function(e){
			e.preventDefault();
			scrollEnabled = false;
			var $head = 0;
			var idx = $(this).attr("data-idx")
				$contop = $(".cont-wrap .cont-box").eq(idx).offset().top - $head;
			$(this).siblings("li").removeClass("is-active");
			$(this).addClass("is-active");
			if($(this).closest(".lnb").hasClass("type2")){
				if(idx==0){
					$(".wrap").addClass("dark");
				}else{
					$(".wrap").removeClass("dark");
				};
			}else{
				if(idx==1){
					$(".wrap").addClass("dark");
				}else{
					$(".wrap").removeClass("dark");
				};
			};
			$("html, body").animate( { scrollTop : $contop }, 500 );
			setTimeout(function() {
				scrollEnabled = true;
			}, 600);
		});
		//var $head = $(window).width() > 720 ? 70 : 69;
		var $top = $(this).offset().top - $head,
			$bottom = $top + $(this).outerHeight(),
			idx = $(this).index(),
			//$contop = $(".cont-wrap .cont-box").eq(idx).offset().top - $head,
			$scWn = $(window).scrollTop();
		if($scWn>= $top){
			$(".lnb li").removeClass("is-active");
			$(".lnb li").eq(idx).addClass("is-active");
			if($(".lnb").hasClass("type2")){
				if($(".lnb li").eq(0).hasClass("is-active")){
					$(".wrap").addClass("dark");
				}else{
					$(".wrap").removeClass("dark");
				};
			}else{
				if($(".lnb li").eq(1).hasClass("is-active")){
					$(".wrap").addClass("dark");
				}else{
					$(".wrap").removeClass("dark");
				};
			};
		};
		$(window).scroll( function(){
			if (!scrollEnabled) return;
			var wh = $(window).outerHeight(),
			$scWn = $(window).scrollTop();				
			if($(".lnb").hasClass("type2")){
				if($(".lnb li").eq(0).hasClass("is-active")){
					$(".wrap").addClass("dark");
				}else{
					$(".wrap").removeClass("dark");
				};
			}else{
				if($(".lnb li").eq(1).hasClass("is-active")){
					$(".wrap").addClass("dark");
				}else{
					$(".wrap").removeClass("dark");
				};
			};
			$(".cont-wrap .cont-box").each( function(){
				$top = $(this).offset().top - $head,
				$bottom = $top + $(this).outerHeight();
				if($scWn >= $top && $scWn <= $bottom){
					var idx = $(this).index();
					$(".lnb li").removeClass("is-active");
					$(".lnb li").eq(idx).addClass("is-active");
				}else{
					if($bottom >= wh || $scWn >= $top ){
						$(".lnb li").eq(idx).addClass("is-active");
					}
				};
			});
		});
	});
});
