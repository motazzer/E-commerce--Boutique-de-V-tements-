
exports.isadmin=(req,res,next)=>{
    if(req.session.userId == '64dba2a4a4aac729ef51107e'){
        res.render('profile-admin')
    }
}
exports.notadmin=(req,res,next)=>{
    if(req.session.userId != '64dba2a4a4aac729ef51107e'){
        res.render('profile')
    }
}