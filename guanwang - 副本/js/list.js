var GLOBAL=GLOBAL||{};
//存储全局变量
$(function(){
	$('#header').load("header.html");
	$('#footer').load("footer.html");
	$('h1>span').click(function(){
		$('h1').css("background-position-X",-950).css('width',150)
		.stop().animate({backgroundPositionX:0,width:1100},2500)
	});
	loadArticleList();
	$('.list-more-con').click(function(){
		if (GLOBAL.pageStart>=GLOBAL.pageCount) {
			$('.list-more').addClass('nomore');			
			$('.list-more-con').fadeTo(100,0.5);
			alert("没有更多了，傻货");
		} else{
			loadArticleList();
		}
	})
	$('#list').delegate(".list_list","click",function(){
		var articleId =$(this).attr("articleId");
		window.open("article.html?articleId="+articleId+"&type=xiaoniaoNews")
	});
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
});
function loadArticleList(){
	//清空假数据
	if (!GLOBAL.pageStart) {
		$('#list').html("");
		GLOBAL.pageStart=0;
	}
	//请求数据
	$.ajax({
		type:"get",
		url:"http://localhost:/ajax/listData.php",
		data:{
			page:GLOBAL.pageStart,
		},
		success:function(data){
			//从服务器获取到字符串数据
			showData(data);
		}
	})
}
function showData(data){
	//将字符串转换为json
	var dataList=JSON.parse(data);
	var list=dataList.data.list;
	for (var i = 0; i < list.length; i++) {
		var muban=$('#list_model').html();
		var updateTime=list[i].creatAt||updateTime;
		muban=muban.replace("$articleId$",list[i].sysId)
		.replace("$listImg$",list[i].coverImg)
		.replace("$listTitle$",list[i].title)
		.replace("$listContent$",list[i].describe)
		.replace("$listDate$",updateTime)
		$('#list').append(muban);
		$('#list>li:odd').css("margin-right",0);
	}
	GLOBAL.pageStart++;
	GLOBAL.pageCount=Math.ceil(dataList.data.count/dataList.data.pageSize);
	if (GLOBAL.pageStart>=GLOBAL.pageCount) {
		return;
	}
}
//function loadArticleList(){
//	//第一次加载数据，将列表清空
//	//pageStart数据开始位置
//	if (!GLOBAL.pageStart) {
//		GLOBAL.pageStart=0;
//		$('#list').html("");
//	}
//	//请求到的数据
//	var Datelist=listData["listData0"+GLOBAL.pageStart];
//	var list=Datelist.data.list;
//	//找到模板
//	for (var i = 0; i < list.length; i++) {
//		var muban=$('#list_model').html();
//		var updateTime=list[i].creatAt||updateTime;
//		muban=muban.replace("$articleId$",list[i].sysId)
//		.replace("$listImg$",list[i].coverImg)
//		.replace("$listTitle$",list[i].title)
//		.replace("$listContent$",list[i].describe)
//		.replace("$listDate$",updateTime)
//		$('#list').append(muban);
//		$('#list>li:odd').css("margin-right",0);
//	}
//	GLOBAL.pageStart++;
//	GLOBAL.pageCount=Math.ceil(Datelist.data.count/Datelist.data.pageSize);
//	if (GLOBAL.pageStart>GLOBAL.pageCount) {
//		alert("你是傻逼吗");
//		$('.list-more').addClass('nomore')
//	}
//}
