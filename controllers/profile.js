const authmodel = require('../models/auth')
const Articlemodel = require('../models/article');




exports.getProfileById = async (req, res) => {
  try {
    let userId = req.session.userId
    const user = await authmodel.getprofilebyid(userId)
    const articles = await Articlemodel.getProfileArticles(userId)
      res.render('profile', { user,articles , verifadmin : req.params.id , verifuser:req.session.userId })
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving user profile');
    }
  };

exports.geteditprofileById = (req, res) => {
  let userId = req.session.userId
  authmodel.geteditprofilebyid(userId).then(user => {
    res.render('editprofile', { user , verifuser:req.session.userId,smessage:req.flash('successmessage')[0],emessage:req.flash('errormessage')[0]})
  })
}
exports.posteditprofileById = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file.filename)
    const msg = await authmodel.posteditprofile(
      req.session.userId,
      req.body.firstName,
      req.body.lastName,
      req.file.filename,
      req.body.city,
    );
    req.flash('successmessage', msg);
    res.redirect('/profile');
  } catch (err) {
    console.log(err)
    req.flash('errormessage', err.message);
    res.redirect('/profile');
  }
};
