// db/index.js
const mongoose = require('./db')
const Schema = mongoose.Schema;

const ceshiSchema = new Schema({
    ruleId:Number,
    ruleName:String,
});

const MyModel = mongoose.model('sj', ceshiSchema);


class Mongodb {
  constructor () {
  }
// 查询
    query () {
      return new Promise((resolve, reject) => {
        MyModel.find({}, (err, res) => {
          if(err) {
            reject(err)
          }
          resolve(res)
        })
      })
    }
// 新增
    save (obj) {
      const m = new MyModel(obj)
      return new Promise((resolve, reject)=> {
        m.save((err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
          console.log(res)
        })
      })
      
    }
//   删除
del (obj){
    const m = new MyModel(obj)
    console.log(m)
    return new Promise((res,rej)=>{
        console.log(m)
    })
}
// 修改
edit(obj){
    const m = new MyModel(obj)
    const data = {obj}
    return new Promise((resolve,reject)=>{
            m.updateOne(data,(err,res)=>{
                if(err){
                    reject()
                }else{
                    resolve(res)
                }
            })      
    })
}
}
module.exports = new Mongodb()
