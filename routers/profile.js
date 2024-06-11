const router = require('express').Router()
const profilecontroller = require('../controllers/profile')
const guardauth = require('./guardauth')
const admin = require('./isadmin')
const multer =require('multer')



router.get('/profile',guardauth.isauth , profilecontroller.getProfileById)


router.get('/profile/update/:id',guardauth.isauth,profilecontroller.geteditprofileById)
router.post('/profile/update/:id',multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {
            cb(null,'assets/uploads')
        },
        filename:function (req, file, cb) {
            cb(null, Date.now() +'-'+ file.originalname)
        }
})}).single('image'),guardauth.isauth,profilecontroller.posteditprofileById)



module.exports = router 