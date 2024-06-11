const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = mongoose.model('user', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    city: { type: String, require: false},
})

var url="mongodb://127.0.0.1:27017/SHOP"

exports.registerformmodel=(firstName,lastName,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            if(user){
            mongoose.disconnect()
            reject('email used !!')
            }
            else{
               return bcrypt.hash(password,10)
            }
        }).then((hpassword)=>{
            let user = new User({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hpassword
            })
            return user.save()
        }).then((user)=>{
            mongoose.disconnect()
            resolve('user registered !')
            }).catch((err) => {
                mongoose.disconnect()
                reject(err);})
    })
}
exports.loginformmodel=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
            return User.findOne({email:email})
}).then((user)=>{
   if(user){
       bcrypt.compare(password,user.password).then((verif)=>{
       if(verif){
       mongoose.disconnect()
       resolve(user._id)
       }else{
       mongoose.disconnect()
       reject('incorrect password')
       }
   })
   }else{
    mongoose.disconnect()
    reject('user not found')
   }
   }).catch((err)=>{
    mongoose.disconnect()
    reject(err)
})
})
}

exports.getprofilebyid = async (id) => {
    try{
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            const user = await User.findById(id);
            mongoose.disconnect()
            return user
        }catch (err) {
            // Handle any errors
            throw err;
          }
        };

exports.geteditprofilebyid = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findById(id)
        }).then(user => {
            mongoose.disconnect()
            resolve(user);
        }).catch(err => reject(err))
    })
}
exports.posteditprofile = async (userId,firstName,lastName,image,city) => {
    try {
      await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      await User.updateOne({_id:userId},{firstName:firstName,lastName:lastName,image:image,city:city})
      mongoose.disconnect()
      return 'profile updated !'
    } catch (err) {
      mongoose.disconnect()
      throw err
    }
  }