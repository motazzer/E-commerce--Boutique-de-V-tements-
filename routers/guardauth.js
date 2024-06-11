
exports.isauth=(req,res,next)=>{
    if(req.session.userId){
        next()
    }else{
        res.redirect('/login')
    }
}
exports.notauth=(req,res,next)=>{
    if(req.session.userId){
        res.redirect('/')
    }else{
        next()
    }
}