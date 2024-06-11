const mongoose =require('mongoose')

const article = mongoose.model('article',{

    name: {type: String},
    
    price: {type: Number},

    description: {type: String},

    image: {type:String},
    
    category: { type: mongoose.Schema.Types.ObjectId,
      ref: 'Category' },

    userId: {type:String},

})

var url='mongodb://127.0.0.1:27017/SHOP'

exports.getallarticles=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
            return article.find({})
        }).then(articles=>{
            mongoose.disconnect()
            resolve(articles)
        }).catch(err=>reject(err))
    })
}
exports.getarticlebycategory = async (categoryId) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const articles = await article.find({ category :categoryId });
    mongoose.disconnect();
    return articles;
  } catch (err) {
    throw err;
  }
};


exports.getArticledetailsbyid = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return article.findById(id)
        }).then(articles => {
            mongoose.disconnect()
            resolve(articles);
        }).catch(err => reject(err))
    })
}
exports.addarticlemodel = async (name, price, description, image, category, userId) => {
    try {
      await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      const newarticle = new article({
        name: name,
        price: price,
        description: description,
        image: image,
        category: category,
        userId: userId,
      });
      await newarticle.save();
      mongoose.disconnect();
      return 'added!';
    } catch (err) {
      mongoose.disconnect();
      throw err;
    }
  };


exports.getProfileArticles = async (userId) => {
    try {
      await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      const articles = await article.find({ userId: userId });
      mongoose.disconnect();
      return articles;
    } catch (err) {
      throw err;
    }
  };

  exports.geteditarticlebyid= async (id)=>{
    try{
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const foundarticle = await article.findById(id) ; 
    mongoose.disconnect();
    return foundarticle ;
    }catch (err) {
        throw err;
      }
  };
  exports.posteditarticlebyid= async(id,name,price,description,image,category)=>{
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        await article.updateOne({_id:id},{name:name,price:price,description:description,image:image,category:category})
        mongoose.disconnect()
        return 'product updated !'
      } catch (err) {
        mongoose.disconnect()
        throw err
      }
  };

  exports.deletearticle = async(id)=>{
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        await article.deleteOne({ _id:id })
        mongoose.disconnect();
        return 'product deleted!'
    }catch (err) {
        mongoose.disconnect()
        throw err
    }
  }
  
  
  

