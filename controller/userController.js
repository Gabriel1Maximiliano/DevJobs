
const Usuarios = require('../models/Usuarios');

exports.getCountForm=(req,res,next) => {
    res.render('crear-cuenta',{
        nombrePágina:'Crea tu cuenta en devJobs',
        tagline:'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
}
exports.createCountForm =async (req,res,next) => {

    const usuario = new Usuarios(req.body); 
    const nuevoUsuario = await usuario.save();
    if(!nuevoUsuario){
        return next();
    }
    res.redirect('/iniciar-sesion');
}