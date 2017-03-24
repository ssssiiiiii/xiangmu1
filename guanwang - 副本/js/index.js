$(function(){
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	$('#map').load('Map.html');
	//banner开始
	(function(){
		var oBanner=$('.banner');
		var arrBanner=oBanner.find('.b')
		var arrLi=oBanner.find('li');
		var left=oBanner.find('.left1');
		var right=oBanner.find('.right1');
		var index=0;
		arrLi.click(function(){
			index=$(this).index();
			arrBanner.stop().fadeOut(400).eq(index).stop().fadeIn(500);
			arrLi.removeClass('active');
			$(this).addClass('active');
			animate();
		})
		left.click(function(){
			index--;
			if (index<0) {
				index=arrLi.length-1;
			}
			arrBanner.stop().fadeOut(400).eq(index).stop().fadeIn(500);
			arrLi.removeClass('active').eq(index).addClass('active');
			animate();
		})
		right.click(function(){
			index++;
			if (index>arrLi.length-1) {
				index=0;
			}
			arrBanner.stop().fadeOut(400).eq(index).stop().fadeIn(500);
			arrLi.removeClass('active').eq(index).addClass('active');
			animate();
		})
		animate();
		function animate(){
			$('.banimg').eq(index).find('img')
			.show().eq(0).addClass("animated bounceInLeft");
			setTimeout(function(){
				$('.banimg').eq(index).find('img')
				.show().eq(1).addClass("animated bounceInRight");
				$('.banimg').eq(index).find('img')
				.show().eq(2).addClass("animated fadeIn");
			},300)
		}
	})();
	//banner结束
	//主要产品开始
	(function(){
		var oProduct=$('.product');
		var arrProTent=oProduct.find('.product_tent');
		var arrLi=oProduct.find('li');
		var left=oProduct.find('.left1');
		var right=oProduct.find('.right1');
		var index=0;
		arrLi.each(function(index){
			$(this).css("top",index*(arrLi.width()+56));
		})
		arrLi.click(function(){
			var action=""
			if ($(this).index()>index) {
				action="fadeInRight";
			} else{
				action="fadeInLeft";
			}
			index=$(this).index();
			move(action);
		})
		right.click(function(){
			index++;
			if (index>arrLi.length-1) {
				index=0;
			}
			move("fadeInRight");
		})
		left.click(function(){
			index--;
			if (index<0) {
				index=arrLi.length-1;
			}
			move("fadeInLeft");
		})
		function move(action){
			arrProTent.hide().eq(index).show();
			arrLi.removeClass('act').eq(index).addClass('act');
			arrProTent.removeClass("fadeInLeft fadeInRight")
			.eq(index).addClass("animated "+action);
		}
		
	})();
	//主要产品结束
	//公司简介开始
	(function(){
		var oCompany=$('.company');
		var arrProTent=oCompany.find('.product_tent');
		var left=oCompany.find('.left1');
		var right=oCompany.find('.right1');
		var index=0;
		right.click(function(){
			index++;
			if (index>arrProTent.length-1) {
				index=0;
			}
			move("fadeInRight");
		})
		left.click(function(){
			index--;
			if (index<0) {
				index=arrProTent.length-1;
			}
			move("fadeInLeft");
		})
		function move(action){
			arrProTent.hide().eq(index).show();
			arrProTent.removeClass("fadeInLeft fadeInRight")
			.eq(index).addClass("animated "+action);
		}
	})();
	//公司简介结束
	//业务范围开始
	(function(){
		var oBusiness=$('.business');
		var oMore=oBusiness.find('.bns-li-more');
		var moreCon=oBusiness.find('.bns-more-con');
		var img=oBusiness.find('ul').find('img');
		oMore.hover(function(){$(this).addClass("animated tada");},
		function(){$(this).removeClass("animated tada");})
		img.hover(function(){$(this).addClass("animated tada");},
		function(){$(this).removeClass("animated tada");})
		oMore.click(function(){
			var index=$(this).index('.bns-li-more');
			if($(this).hasClass("open")){
				moreCon.slideUp();
				$(this).removeClass("open");
			}else{
				moreCon.slideUp().eq(index).delay(300).slideDown(function(){
					oMore.removeClass('open').eq(index).addClass('open');
				});
			}
		})
		img.click(function(){
			var index=$(this).index(".bns_list li img");
			if(oMore.eq(index).hasClass("open")){
				moreCon.slideUp();
				oMore.eq(index).removeClass("open");
			}else{
				moreCon.slideUp().eq(index).delay(300).slideDown(function(){
					oMore.removeClass('open').eq(index).addClass('open');
				});
			}
		})
		
	})();
	//业务范围结束
	//团队介绍开始
	(function (){
		var oTeam=$('.team');
		var oTeamList=oTeam.find('.team_list');
		var arrLi=oTeam.find('.cen1').find('li');
		var left=oTeam.find('.left1');
		var right=oTeam.find('.right1');
		var index=0;
		right.click(function(){
			index++;
			if (index>arrLi.length-1) {
				index=0;
			}
			oTeamList.stop().animate({left:100}).delay(100).animate({left:-1100},function(){
				oTeamList.find('ul').first().appendTo(oTeamList);
				oTeamList.css("left",0);
				arrLi.removeClass("active").eq(index).addClass("active");
			})
		})
		left.click(function(){
			index--;
			if (index<0) {
				index=arrLi.length-1;
			}
			oTeamList.find('ul').last().prependTo(oTeamList);
			oTeamList.css("left",-1130);
			oTeamList.stop().animate({left:-1230}).delay(100).animate({left:0},function(){
				arrLi.removeClass("active").eq(index).addClass("active");
			})
		})
	})()
	//团队介绍结束
	//回到顶部开始
	$(window).scroll(function(){
		if ($(window).scrollTop()>500) {
			$('.top').fadeIn();
		}else{
			$('.top').fadeOut();
		}
	});
	$('.fixed_top').click(function(){
		$('body').animate({scrollTop:0},500)
	})
})