const route = require('express').Router()
const authcontroller = require('../controllers/auth')
const body = require('express').urlencoded({extended:true})
const guardauth = require('./guardauth')


route.get('/registre',guardauth.notauth,authcontroller.getregisterpage)
route.post('/registre',body,authcontroller.postregisterpage)

route.get('/login',guardauth.notauth,authcontroller.getloginpage)
route.post('/login',body,authcontroller.postloginpage)

route.post('/logout',authcontroller.postlogout)


module.exports = route 