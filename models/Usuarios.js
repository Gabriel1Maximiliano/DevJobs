const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const slug = require('slug');
const bcrypt = require('bcrypt');



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
usuariosSchema.post('save', function(error,doc,next){

})
usuariosSchema.methods = {
    compararPassword: function(password){
        return bcrypt.compareSync(password, this.password);
    }
}
module.exports = mongoose.model('Usuarios',usuariosSchema)
 