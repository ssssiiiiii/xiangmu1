var GLOBAL=GLOBAL||{}//避免全局变量和系统变量重名
$(function(){
	$('#header').load('header.html');
	$('#footer').load('footer.html');
//	alert(getUrlParams("articleId"));
//	alert(getUrlParams("type"));
	$(window).scroll(function(){
		if ($(window).scrollTop()>500) {
			$('.top').fadeIn();
		}else{
			$('.top').fadeOut();
		}
	});
	$('.fixed_top').click(function(){
		$('body').animate({scrollTop:0},500)
	});
	GLOBAL.articleId=getUrlParams("articleId");
	GLOBAL.type=getUrlParams("type");
	loadArticleData();
	
	var loveStory=["煞笔","二货","笨蛋","再点一下试试"];
	GLOBAL.firstClick=true;//表示第一次点击
	$('.zan').click(function(){
		//判断是否是第一次点击
		if (GLOBAL.firstClick) {
			var index=Math.floor(Math.random()*loveStory.length);
			GLOBAL.firstClick=false;
			$('.like-txt').html(loveStory[index]);
			doMove();
		}else if ($('.like-txt').html()=="再点一下试试") {
			$('.like-txt').html("你是傻逼吗");
			doMove();
		}
	});
	function doMove(){
		$('.like-txt').animate({top:80,opacity:1},600,'elasticOut')
		.delay(600).animate({left:-400,opacity:0},600,"backIn",function(){
			$('.like-txt').css({top:700,left:0})
		})
	};
});
function loadArticleData(){
	if (GLOBAL.type) {
		var articleCon=articleData[GLOBAL.type+GLOBAL.articleId];
		var articleUpdate=articleCon.data.creatAt||articleCon.data.creatAt.updateAt;
//		alert(JSON.stringify(articleCon))
		$('.model h2').html(articleCon.data.typeTitle);
		$('.model p').html(articleCon.data.typeEntitle);
		$('.art-title').html(articleCon.data.title);
		$('#art-img').attr("src",articleCon.data.coverImg);
		$('.act-txt').html(articleCon.data.content);
		$('.art-author').html('<span class="art-date">'+articleUpdate+'</span> '+articleCon.data.creatByFullName);
	
	}
};
function getUrlParams(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r = window.location.search.substr(1).match(reg);
	 if(r!=null)
		 return  r[2];
	 else 
		 return "";
};