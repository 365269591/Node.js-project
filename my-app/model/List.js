var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var List = new Schema({
    username   : String,
    numbr        : String,
    priace        : Number,
    num 		  : Number,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var ListModel = mongoose.model('list', List);
// 公开对象，暴露接口
module.exports = ListModel;