var falg = true;
$(".b1_li-2 a").click(function(){
	if(falg == true){
	$('.b1_li-2').css("background","url(/images/menu1_1.png) 23px 0 no-repeat");
	falg = false;
	$("ol").toggle();
	}else if(falg == false){
		$('.b1_li-2').css("background","url(/images/menu_1.png) 23px 0 no-repeat");
	$("ol").toggle();
	 falg = true;
	}
});


backstage();
function backstage(){
	$.ajax({
		url:"/api/backstage",
		type:"post",
		success : function(res){
			console.log(res);
			var len = res.length;
			for(var i = len-1;i >= 0;i--){
				var tr = $("<tr></tr>")
				$(".b3-2 table").append(tr);
				
			var str = "<td><input type='checkbox'/><span>"+res[i].num+"</span></td>"+
				"<td>"+res[i].username+"</td>"+
				"<td>"+res[i].numbr+"</td>"+
				"<td>"+res[i].priace+"</td>"+
				"<td><img src='../images/yes.gif'/></td>"+
				"<td><img src='../images/yes.gif'/></td>"+
				"<td><img src='../images/yes.gif'/></td>"+
				"<td><img src='../images/yes.gif'/></td>"+
				"<td>"+100+"</td>"+
				"<td>"+100+"</td>"+
				"<td>"+100+"</td>"+
				"<td><a href='javascript:;'><img src='/images/icon_view.gif'/></a><a href='javascript:;'><img src='/images/icon_edit.gif'</a><a href='javascript:;'><img src='/images/icon_copy.gif'</a><a href='javascript:;'><img src='../images/icon_trash.gif'</a></td>"
				$(str).appendTo(tr);
			}
		}
	})
}

setTime()
function setTime(){
	setTimeout(function(){
		$.each($(".b3-2 table tr"),function(index,value){
			$(this).find("td").eq(11).find('a').eq(3).click(function(){
				$(this).parents("tr").remove();
				
				var numbr =  $(this).parent().siblings("td").eq(2).html();
				$.ajax({
					type:"post",
					url:"/api/detal",
					data:{
						numbr : numbr
					},
					success:function(res){
						console.log(res);
					}
				})
				
			})
			$(this).find("td").eq(11).find('a').eq(1).click(function(){
				window.location="list"
			})
		})
	},1000)
}

Add()
function Add(){
	$(".b3-2 .b3-3 select").click(function(){
		$(".b3-2 .b3-3 select").find("option").each(function(ind,val){
			$(val).click(function(){
				var va = $(this).val();
				alert(val);
			})
		})
	})
}









