	function upload(){
		var form = new FormData();//ForData是H5新特性
		form.append("img",document.getElementById("img").files[0]);
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST","/api/goods_upload");
		xhr.onreadystatechange = function(res){
			if(xhr.readyState == 4 && xhr.status == 200){
				console.log(xhr.responseText);
				var res = JSON.parse(xhr.responseText);
				alert(res.message);
			}
		}
		xhr.send(form);
	}