const Vacante = require('../models/Vacante');

exports.showjobs = async(req,res, next) => {

    const vacantes = await Vacante.find().lean();// el punto lean elimina el error de acceso a las properties
    if( !vacantes ){
        return next();
    }
    res.render('home',{
        nombrePagina: 'devJobs',
        tagline:'Encuentra y publica trabajos para desarrolladores web',
        barra:true,
        boton:true,
        vacantes:vacantes 
    })
}