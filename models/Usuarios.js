const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const slug = require('slug');
const bcrypt = require('bcrypt');
const shortid = require('shortid');


const usuariosSchema = new mongoose.Schema(
    { 
        email:{
            type:String,
            trim:true,
            unique:true,
            lowercase:true,

        },
        nombre:{
           type:String,
            required:'El nombre es obliatorio',
            trim:true,
        },
        password:{
            type:String,
            trim:true,
            required:true

        },
        token: String,
        expira:String,
    }
);

//hashear password

usuariosSchema.pre('save',async function(next){
// if the password has been hashed
if(!this.isModified('password')){
  return next();
}
// if the password has not been hashed
const hash= await bcrypt.hash(this.password,10);
this.password = hash;
next();
})

module.exports = mongoose.model('Usuarios',usuariosSchema)
 