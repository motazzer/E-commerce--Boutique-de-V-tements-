const mongoose = require('mongoose');

const Category = new mongoose.model('Category',{
    
  name: {type : String},
  description: {type : String},
  image : {type:String},

});


var url='mongodb://127.0.0.1:27017/SHOP'

exports.getcategorylist = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const categories = await Category.find({}).exec();
    mongoose.disconnect();
    return categories;
  } catch (err) {
    throw err;
  }
};
exports.getcategorybyid = async(id)=>{
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const category = await Category.findById(id);
    mongoose.disconnect();
    return category;
  } catch (err) {
    throw err;
  }
};
