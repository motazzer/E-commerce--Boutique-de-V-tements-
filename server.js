const express = require('express');
const path = require('path');
const routerauth= require('./routers/auth')
const routerarticle= require('./routers/article')
const routerprofile= require('./routers/profile')
const session = require('express-session')
const mongodbstore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const app=express()



app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')


app.use(flash())



var Store = new mongodbstore({
    uri:'mongodb://127.0.0.1:27017/SHOP',
    Collection:'sessions'
})
app.use(session({
    secret:'123654789',
    cookie:{
        maxAge:86400000*3*30
    },
    store:Store,
    resave:true,
    saveUninitialized:true

}))




app.use('/',routerarticle)
app.use('/',routerauth)
app.use('/',routerprofile)




app.get('/about',(req,res)=>{
    res.render('about',{verifuser:req.session.userId})
})
app.get('/contact',(req,res)=>{
    res.render('contact',{verifuser:req.session.userId})
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard',{verifuser:req.session.userId})
})
app.get('/tables',(req,res,next)=>{
    res.render('tables',{verifuser:req.session.userId})
})


app.listen(3003,()=>{
    console.log('server run at port 3003');
})