const authmodel = require('../models/auth')


exports.getregisterpage=(req,res,next)=>{
        res.render('registre',{verifuser:req.session.userId,message:req.flash('error:')[0]})
    }

exports.postregisterpage=(req,res,next)=>{
    authmodel.registerformmodel(req.body.firstName,req.body.lastName,req.body.email,req.body.password).then((user)=>{
        res.redirect('/login')
    }).catch((err)=>{
        req.flash('error:',err)
        res.redirect('/register')
    })
}

exports.getloginpage=(req,res,next)=>{
    res.render('login',{verifuser:req.session.userId,message:req.flash('error:')[0]})
}
exports.postloginpage=(req,res,next)=>{
    authmodel.loginformmodel(req.body.email,req.body.password).then((id)=>{
        req.session.userId=id
        res.redirect('/')
    }).catch((err)=>{
        req.flash('error:',err)
        res.redirect('/login')
    })
}

exports.postlogout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}





