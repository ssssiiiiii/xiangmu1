var GLOBAL=GLOBAL||{};
$(function(){
	//欢迎页面开始
	function welcomeAniamate(){
		setTimeout(function(){
			$('#welcomeImg').animate({top:0},function(){
				$('.aaa').each(function(index){
					var $this=$(this);
					setTimeout(function(){
						$this.show().addClass("animated fadeInUp");
					},400*index);
				});
			});
		},4000)
		setTimeout(function(){
			$('.xiaoniao').slideUp();
			GLOBAL.welcomeAnimate=true;
		},7000)
	};
	welcomeAniamate();
	$('.xiaoniao').dblclick(function(){
		$('.xiaoniao').slideUp();
		GLOBAL.welcomeAnimate=true;
	})
	//欢迎页面结束
	//全屏轮播开始
	function setSize(){
		$('.Big,.box,.div1').width($(window).width());
		$('.Big,.div1').height($(window).height()-50);
	};
	setSize();
	$(window).resize(function(){
		setSize();
		scrollMove();
	});
	//滚轮滚动事件
	window.onmousewheel=mouseScroll;//ie chrome
	window.addEventListener("DOMMouseScroll",mouseScroll);//firefox
	function mouseScroll(ev){
		var oEvent=event||ev;
		if (oEvent.wheelDelta) {//IE chrome
			if (oEvent.wheelDelta>0) {
				scrollUp();
			}else{
				scrollDown();
			}
		}else{//firefox
			if (oEvent.detail<0) {
				scrollUp();
			}else{
				scrollDown();
			}
		}
	};
	GLOBAL.mouseScrollIndex=0;
	GLOBAL.slidingTimer=null;
	GLOBAL.slidingDelay=1000;
	GLOBAL.slidingGoing=false;
//	var index=0;
	
	//true 第一次	不允许翻页		false 不是第一次，就允许翻页
	GLOBAL.isFirstSlide=true;
	GLOBAL.firstTimer=null;
	function scrollUp(){
		if (!GLOBAL.slidingGoing) {
			GLOBAL.slidingGoing=true;
			GLOBAL.slidingTimer=setTimeout(function(){
				GLOBAL.slidingGoing=false;
			},GLOBAL.slidingDelay);
		}else{
			return;
		};
		if (GLOBAL.isFirstSlide) {
			if (!GLOBAL.firstTimer) {
				GLOBAL.firstTimer=setTimeout(function(){
					GLOBAL.isFirstSlide=false;
					GLOBAL.firstTimer=null;
				},100)
			}
			return;
		};
		GLOBAL.mouseScrollIndex--;
		if(GLOBAL.mouseScrollIndex<=0){
			GLOBAL.mouseScrollIndex=0;
		}
		scrollMove();
	};
	GLOBAL.welcomeAnimate=false;
	function scrollDown(){
		if (!GLOBAL.slidingGoing) {
			GLOBAL.slidingGoing=true;
			GLOBAL.slidingTimer=setTimeout(function(){
				GLOBAL.slidingGoing=false;
			},GLOBAL.slidingDelay)
		}else{
			return;
		}
		if (GLOBAL.isFirstSlide) {
			if (!GLOBAL.firstTimer) {
				GLOBAL.firstTimer=setTimeout(function(){
					GLOBAL.isFirstSlide=false;
					GLOBAL.firstTimer=null;
				},100)
			}
			return;
		};
		if (!GLOBAL.welcomeAnimate) {
			return;
		}
		GLOBAL.mouseScrollIndex++;
		if(GLOBAL.mouseScrollIndex>$('.div1').length-1){
			GLOBAL.mouseScrollIndex=$('.div1').length-1;
		};
		scrollMove();
	};
	
	function scrollMove(){
		if(GLOBAL.mouseScrollIndex == 0 || GLOBAL.mouseScrollIndex == 1){
				$(".nav li").removeClass("now");
				$(".nav li").eq(0).addClass("now");
		}else if(GLOBAL.mouseScrollIndex  == 4){
				$(".nav li").removeClass("now");
				$(".nav li").eq(3).addClass("now");
				$(".nav li").eq(4).addClass("now")
		}else {
			$(".nav li").removeClass("now");
			$(".nav li").eq(GLOBAL.mouseScrollIndex-1).addClass("now");
		}
		$('.box').animate({top:-GLOBAL.mouseScrollIndex*($(window).height()-50)})
	};
	$('.nav li').click(function(){
		var index=$(this).index();
		if (index==4) {
			GLOBAL.mouseScrollIndex=4;
		}else if(index==5){
			return;
		}else{
			GLOBAL.mouseScrollIndex=index+1;
		}
			
		scrollMove();
	});
	//全屏轮播结束
	//概述轮播开始
	(function(){
		$('.gaishu-box,.gaishu-wrap.gaishu').height($(window).height()-50);
		var num=0;
		$('.next').click(function(){
			num++;
			if (num>$('.gaishu').length-2) {
				$(this).addClass('noMore');
			}
			if (num>$('.gaishu').length-1) {
				num=$('.gaishu').length-1;
				return;
			}
			$('.prev,.next').removeClass('noMore');
			$('.gaishu-wrap').animate({left:-num*1100});
		});
		$('.prev').click(function(){
			num--;
			if (num<1) {
				$(this).addClass('noMore');
			}
			if (num<0) {
				num=0;
				return;
			}
			$('.prev,.next').removeClass('noMore');
			$('.gaishu-wrap').animate({left:-num*1100});
		})
	})();
		//概述第一页跳第二页
		$('.xiaoniao-box .more').click(function(){
			$('.nav li').removeClass('now').eq(0).addClass('now');
			$('.box').animate({top:-($(window).height()-50)})
		});
	//概述轮播结束
	//掌云开始
	(function(){
//		$('.cloud ul').css("top",$(window).height()-100)
		$('.left').click(function(){
			$('.right div').animate({left:-78},1000);
			$(this).find('div').animate({left:0},1000);
			$('.cloud-txt').removeClass("fadeInRight fadeInLeft")
			.hide().eq(0).show().addClass("animated fadeInLeft");
		})
		$('.right').click(function(){
			$('.left div').animate({left:78},1000);
			$(this).find('div').animate({left:0},1000);
			$('.cloud-txt').removeClass("fadeInRight fadeInLeft")
			.hide().eq(1).show().addClass("animated fadeInRight");
		})
	})();
	//掌云结束
	//页面跳转到相应位置开始
	var num=location.hash.substr(1);
	if (num) {
		$('.xiaoniao').hide();
		GLOBAL.welcomeAnimate=false;
		GLOBAL.mouseScrollIndex=num;
		scrollMove()
	}
	//页面跳转到相应位置结束
})