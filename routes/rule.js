const router = require('koa-router')()
const model = require('../db/index')
router.prefix('/rule')

router.get('/', async function (ctx, next) {
                await    model.query().then((res)=>{
                       if(res){
                           ctx.body = {
                               code:200,
                               msg:'查找成功',
                           }
                       }else{
                           ctx.body = {
                               code:200,
                               msg:'查找失败'
                           }
                       }
                    })
    })
    router.post('/add', async function (ctx, next) {
        let {ruleName,ruleId} = ctx.request.body 
        await  model.save({ruleName,ruleId}).then((res)=>{
            if(res){
                ctx.body = {
                    code:200,
                    msg:'添加成功'
                }
            }
        })
            
    })

    router.post('/del',async function (ctx, next) {
        ctx.verifyParams({
            ruleName:{
                type:'string',
                required:true
            },
            ruleId:{
                type:'number',
                required:true
            }
        })
        let {ruleName,ruleId} = ctx.request.body
        await model.del({ruleName,ruleId},(res,rej)=>{
            ctx.body = {
                code:200,
                msg:'删除成功'
            }  
        })
    })
    
    module.exports = router