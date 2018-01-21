var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var ListModel = require("../model/List");
var AddsModel = require("../model/Adds");
var md5 = require("md5");
var multiparty = require("multiparty");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});
router.get('/backstage', function(req, res, next) {
  res.render('backstage', {});
});
router.get('/list', function(req, res, next) {
  res.render('list', {});
});
router.get('/list1', function(req, res, next) {
  res.render('list1', {});
});

router.post('/api/goods_upload', function(req, res, next) {
  var form = new multiparty.Form({
  	uploadDir : "public/images"
  });
  var result = {
  	code: 1,
  	message:"商品信息保存成功"
  };
  form.parse(req,function(err,body,files){
  	if(err){
  		console.log(err);
  	}
  	console.log(body);
  	var imgPath = files["img"][0].path.replace("public\\","");
  	var gm = new AddsModel();
  	gm.imgPath = imgPath;
  	gm.save(function(err){
  		if(err){
  			result.code = -99;
  			result.message = "商品保存失败";
  		}
  		res.json(result);
  	})
  })
});


router.post('/api/backstage', function(req, res, next) {
  ListModel.find(function(err,docs){
  	res.json(docs)
  });
});
router.post('/api/detal', function(req, res, next) {
	var numbr = req.body.numbr;
	ListModel.remove({numbr:numbr},function(err,docs){
		console.log(docs);
		res.json(docs)
	})
  
});

var num = 0;
router.post('/api/listajax', function(req, res, next) {
  var username = req.body.username;
  var numbr = req.body.numbr;
  var priace = req.body.priace;
  num ++;
  var um = new ListModel();
  um.username = username;
  um.numbr = numbr;
  um.priace = priace;
  um.num = num;
  um.save(function(err){
  	var result = {
  		code : 1,
  		message : "保存成功"
  	};
  	if(err){
  		result.code = -110;
  		result.message = "保存失败";
  		res.send("保存失败");
  	}
  	res.json(result);
  })
});


router.post('/api/loginajax', function(req, res, next) {
//	if(req.body.username == "good" && req.body.psw == "123") {
//		res.send("登录成功");
//	} else {
//		res.send("登录失败");
//	}
	var username = req.body.username;
	var psw = req.body.psw;
	var result = {
		code : 1,
		message : "登录成功"
	};
	UserModel.find({username:username,psw:md5(psw)},function(err,docs){
		if(docs.length == 0){
			result.code = -101;
			result.message = "您的账号或者密码有误,重新登录."
		}else{
			//登录成功时候生成session
			req.session.username = username;
		}
		res.json(result);
	})
});

module.exports = router;

router.get('/dashboard', function(req, res, next) {
  //判断用户是否注册,没注册则返回登录页面
  console.log(req.session);
  if(req.session == null || req.session.username == null){
//	res.render('login', { title: '登录页面' });
//	console.log(req.session);
    	res.redirect("/login");//重定向
  	return;
  }
  res.render('dashboard',{});
});

//分页

router.get('/list', function(req, res, next) {
	var condition = req.query.condition;
	// 注意代码的健壮性
	// 测试中，有异常系测试。 后端最头疼的是异常系测试。
	var pageNO = req.query.pageNO || 1;
	pageNO = parseInt(pageNO);
	var perPageCnt = req.query.perPageCnt || 3;
	perPageCnt = parseInt(perPageCnt);

	GoodsModel.count({goods_name: {$regex: condition}}, function(err, count){
		console.log("数量:" + count);
		var query = GoodsModel.find({goods_name: {$regex: condition}})
		.skip((pageNO-1)*perPageCnt).limit(perPageCnt);
		query.exec(function(err, docs){
			console.log(err, docs);
			var result = {
				total: count,
				data: docs,
				pageNO: pageNO
			}
			res.json(result);
		});
	})
});

module.exports = router;
