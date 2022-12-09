const Usuarios = require('../models/Usuarios');
const passport = require('passport');
const Vacante = require('../models/Vacante');
exports.authenticateUser = passport.authenticate('local',{
    successRedirect:'/administracion',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true
});

exports.showPanel =async(req,res,next) => {

const vacantes = await Vacante.find({autor:req.user._id}).lean();
    res.render('administracion',{
        nombrePágina:'Panel de Asministración',
        tagline:'Creá y administrá tus vacantes desde acá',
        cerrarSesion:true,
        nombre: req.user.nombre,
        vacantes
        
    })
}

exports.userVerification = (req,res,next) => {
 
    if(req.isAuthenticated()){
         return next()
    }
}