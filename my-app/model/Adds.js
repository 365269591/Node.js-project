var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Adds = new Schema({
	goods_name : String,
	price : String,
	imgPath : String,
	create_date :{type : Date,default:Date.now}
});
//创建model对象
var AddsModel = mongoose.model('adds',Adds);
//公开对象,暴露接口
module.exports = AddsModel;