
const Vacante = require('../models/Vacante')

exports.newVacantForm = (req,res) => {
    res.render('nueva-vacante'
    ,{
        nombrePágina:'Nueva Vacante',
        tagline:'Llena el formulario y publica tu vacante '
    })
} 

// add a vacat to data base
exports.addVacant=async(req,res) => { 

    const vacante = new Vacante(req.body);
    // array skills is created
    vacante.skills = req.body.skills.split(',');
   // add a vacant in the database
   const nuevaVacante= await vacante.save();
   //redirection
   res.redirection(`/vacantes/${nuevaVacante.url}`);
}   