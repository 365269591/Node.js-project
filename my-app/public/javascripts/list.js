	function list1(){
		$.ajax({
			url:"/api/listajax",
			type:"post",
			data : {
				username : $('.btn1').val(),
				numbr : $('.t1').val(),
				priace : $('.t_4').val()
			},
			success : function(res){
				console.log(res);
				if(res.code == 1){
					alert(res.message);
					location.href = "/backstage?r=" + new Date().getTime();
				}else{
					alert(res.message);
				}
				
			}
		});

	}
