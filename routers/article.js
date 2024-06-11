const articlecontroller = require('../controllers/article')
const router = require('express').Router()
const guardauth = require('./guardauth')
const multer = require('multer')





router.get('/',articlecontroller.getindexarticlebycategory)

router.get('/categories/:categoryId',guardauth.isauth, articlecontroller.getArticlesByCategory)





router.get('/products',articlecontroller.allproductsarticleController)

router.get('/products/:articleName/:id',guardauth.isauth,articlecontroller.detailscontroller)



router.get('/profile/addproduct',guardauth.isauth,articlecontroller.getaddproductcontroller)
router.post('/profile/addproduct',multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {
            cb(null,'assets/uploads')
        },
        filename:function (req, file, cb) {
            cb(null, Date.now() +'-'+ file.originalname)
        }
})}).single('image'),guardauth.isauth,articlecontroller.postaddproductcontroller)

router.get('/profile/editproduct/:id',guardauth.isauth,articlecontroller.geteditarticlecontroller)
router.post('/profile/editproduct/:id',multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {
            cb(null,'assets/uploads')
        },
        filename:function (req, file, cb) {
            cb(null, Date.now() +'-'+ file.originalname)
        }
})}).single('image'),guardauth.isauth,articlecontroller.posteditarticlecontroller)

router.post('/profile/deleteproduct/:id',guardauth.isauth,articlecontroller.deletearticlecontroller)


module.exports= router