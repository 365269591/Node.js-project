var express = require('express');
var router = express.Router();
var GoodsModel = require("../model/Goods");


router.get('/add', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/page', function(req, res, next) {
	var condition = req.query.condition;
	// 注意代码的健壮性
	// 测试中，有异常系测试。 后端最头疼的是异常系测试。
	var pageNo = req.query.pageNo || 1;
	var perPageCnt = req.query.PerPageCnt || 3;
	
	GoodsModel.count({username:{$regex:condition}},function(err,count){
		console.log("数量" + count);
		var query = GoodsModel.find({uesername : {$regex:condition}})
		.skip((pageNo -1)*perPageCnt).limit(perPageCnt);
		query.exec(function(err,docs){
			console.log(err,docs);
			var result = {
				total : count,
				data:docs,
				pageNo:pageNo
			}
			res.json(result);
		});
		
	})
});

module.exports = router;
