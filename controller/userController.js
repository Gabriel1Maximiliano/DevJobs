
const { validationResult } = require('express-validator');

const Usuarios = require('../models/Usuarios');

exports.getCountForm=(req,res,next) => {
    res.render('crear-cuenta',{
      nombrePagina:'Crea tu cuenta en devJobs',
        tagline:'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
}
exports.createCountForm =async (req,res,next) => {
   
  try {
    const query = await Usuarios.findOne({ 'email': req.body.email });
    if(query){
        req.flash('error',['El usuario ya existe']);
       return res.redirect('/crear-cuenta'); 
     }
    
  } catch (error) {
    console.log(error)
  }
    
   
   
   
 const result= validationResult(req);
  if(result){
 
     req.flash('error',result.errors.map(er=>(er.msg)));

    res.render('crear-cuenta',{
      nombrePagina:'Crea tu cuenta en devJobs',
         tagline:'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
         mensajes: req.flash()
     })
  return;
  }
  try {
    const usuario = new Usuarios(req.body);  
    const nuevoUsuario = await usuario.save();
    if(!nuevoUsuario){ 
        return next();
    }
    res.redirect('/iniciar-sesion');
  } catch (error) {
    console.log(error);
  }

   
}
exports.logInUser = (req,res,next) => {

    res.render('iniciar-sesion',{
      nombrePagina:'Iniciar Sesión devJobs',
        
    })
}
exports.getProfile= (req,res,next) => {

 const data = {
      email: req.user.email,
       nombre:req.user.nombre,
     }
  res.render('editar-perfil',{
    nombrePagina:'Edita tu perfil en devJobs',
    usuario:data,
    cerrarSesion:true,
    nombre: req.user.nombre,
    
})
}
exports.editProfile= async(req,res,next) => {
  const data = {
    email: req.user.email,
     nombre:req.user.nombre,
   }
  const errores= validationResult(req);
    
    if(errores) {
         errores.errors.map(error => error.msg)
       
        req.flash('error', errores.errors.map(error => error.msg));
       
       return res.render('editar-perfil',{
          nombrePagina:'Edita tu perfil en devJobs',
          usuario:data,
          cerrarSesion:true,
          nombre: req.user.nombre,
          mensajes:req.flash()
          
      })
    }

  const usuario = await Usuarios.findById(req.user._id);
  usuario.nombre= req.body.nombre;
  usuario.email= req.body.email;
  if(req.body.password){
    usuario.password= req.body.password;
  }
  await usuario.save();
  // redirect
 req.flash('correcto', 'Cambios Guardados Correctamente')
  res.redirect('/administracion');
}