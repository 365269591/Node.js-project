var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
    username   : String,
    numbr        : String,
    priace        : Number,
    num 		  : Number,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var GoodsModel = mongoose.model('goods', Goods);
// 公开对象，暴露接口
module.exports = GoodsModel;