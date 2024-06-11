const Articlemodel = require('../models/article')
const Categorymodel = require('../models/Category')


/*
exports.productsarticleController=(req,res,next)=>{
    Articlemodel.getallarticles().then(articles=>{
        res.render('index',{articles:articles , verifuser:req.session.userId})
    })
}
*/

/*
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Articlemodel.getallarticles();
    res.render('index', { articles ,verifuser:req.session.userId});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
*/
exports.getArticlesByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Categorymodel.getcategorybyid(categoryId);
    const articles = await Articlemodel.getarticlebycategory(categoryId);
    res.render('category', { articles ,category, verifuser:req.session.userId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getindexarticlebycategory = async (req,res) =>{
  try {
    const categories = await Categorymodel.getcategorylist();
    res.render('index', { categories,verifuser:req.session.userId});
} catch (err) {
  console.error(err);
  res.status(500).send('Internal Server Error');
}};


exports.allproductsarticleController=async(req,res,next)=>{
  try {
    const articles = await Articlemodel.getallarticles() ;
    res.render('products',{articles:articles , verifuser:req.session.userId})
  } catch (err) {
    next(err);
  }
}

exports.detailscontroller=(req,res,next)=>{
  let articleName = req.params.articleName
    let id = req.params.id
    Articlemodel.getArticledetailsbyid(id,articleName).then(article=>{
        res.render('details',{article:article , verifuser:req.session.userId})
    })
}


exports.getaddproductcontroller= async(req,res)=>{
  try {
    const categories = await Categorymodel.getcategorylist();
    res.render('addproduct',{categories , verifuser:req.session.userId,smessage:req.flash('successmessage')[0],emessage:req.flash('errormessage')[0]})
} catch (err) {
    console.log(err)
  }
}
exports.postaddproductcontroller=(req,res,next)=>{
  console.log(req.body)
  console.log(req.file.filename)
  Articlemodel.addarticlemodel(req.body.name,req.body.price,req.body.description,req.file.filename,req.body.category,req.session.userId).then((msg)=>{
    req.flash('successmessage',msg)
    res.redirect('/profile/addproduct')
  }).catch((err)=>{
    req.flash('errormessage',err)
    res.redirect('/profile/addproduct')
  })
}


exports.geteditarticlecontroller=async(req,res)=>{
    let id = req.params.id
    try {
      const categories = await Categorymodel.getcategorylist();
      const article = await Articlemodel.geteditarticlebyid(id)
        res.render('editproduct', { article, categories , verifuser:req.session.userId,smessage:req.flash('successmessage')[0],emessage:req.flash('errormessage')[0] })
    } catch (err) {
      console.log(err)
    }
}
exports.posteditarticlecontroller=async (req,res)=>{
    try {
        console.log(req.body)
        console.log(req.file.filename)
        const msg = await Articlemodel.posteditarticlebyid(
          req.params.id,
          req.body.name,
          req.body.price,
          req.body.description,
          req.file.filename,
          req.body.category,
        );
        req.flash('successmessage', msg);
        res.redirect('/profile');
      } catch (err) {
        console.log(err)
        req.flash('errormessage', err.message);
        res.redirect('/profile');
      }
}


exports.deletearticlecontroller= async(req,res)=>{
    try {
        const msg = await Articlemodel.deletearticle(req.params.id);
        req.flash('successmessage', msg);
        res.redirect('/profile');
      } catch (err) {
        console.log(err)
        req.flash('errormessage', err.message);
        res.redirect('/profile');
      }
};








