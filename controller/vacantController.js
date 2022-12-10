
const Vacante = require('../models/Vacante')
const { validationResult } = require('express-validator');
exports.newVacantForm = (req,res) => {
    res.render('nueva-vacante'
    ,{
        nombrePagina:'Nueva Vacante',
        tagline:'Llena el formulario y publica tu vacante ',
        cerrarSesion:true,
        nombre: req.user.nombre,
    })
} 

// add a vacat to data base
exports.addVacant=async(req,res) => { 
    
    const errores= validationResult(req);
    
    if(errores) {
       const data =  errores.errors.map(error => error.msg)
       
        req.flash('error', errores.errors.map(error => error.msg));
       
      return  res.render('nueva-vacante', {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el formulario y publica tu vacante',
            cerrarSesion: true,
            nombre : req.user.nombre,
            mensajes: req.flash()
        })
    }

    
   
    const vacante = new Vacante(req.body);
 // author of vacant
 vacante.autor = req.user._id;
    // array skills is created
    vacante.skills = req.body.skills.split(',');
   // add a vacant in the database
   const nuevaVacante= await vacante.save();
   //redirection
   res.redirect(`/vacante/${nuevaVacante.url}`);
}  
// show a vacant  
exports.showVacant= async(req,res,next) => {
    console.log('entre a get vacnates ')
    const vacante = await Vacante.findOne( {url:req.params.url }).lean();
    if(!vacante){
        return next();
    }
    res.render('vacante',{
        vacante,
        nombrePagina:vacante.titulo,
        barra:true,
        cerrarSesion:true,
        nombre: req.user.nombre,
        

    })
}
exports.getVacant=async(req,res,next)=>{
   

    const vacante = await Vacante.findOne({url:req.params.url }).lean();
    if(!vacante){
        return next();
    };
  

     res.render('editar-vacante',{
         vacante,
         nombrePagina:`Editar-${vacante.titulo}`
     })
}
exports.editVacant= async(req,res,next) => {
    const vacanteActualizada = req.body;
    console.log(vacanteActualizada)
    vacanteActualizada.skills = req.body.skills.split(',');

    const vacante = await Vacante.findOneAndUpdate(
        {url:req.params.url },
        vacanteActualizada,{
            new: true,
            runValidators:true
        }).lean(); 
        res.redirect(`/vacantes/${vacante.url}`); 
  
}

exports.vacantValidator = (req,res,next) => { 

   

    // validar
    

    const { validationResult } = require('express-validator');
    const errores= validationResult(req);
    if(errores) {
        // Recargar la vista con los errores
        //req.flash('error', errores.map(error => error.msg));
        console.log(errores.errors)

        res.render('nueva-vacante', {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el formulario y publica tu vacante',
            cerrarSesion: true,
            nombre : req.user.nombre,
            mensajes: req.flash()
        })
    }

    next(); // siguiente middleware
}
exports.deleteVacant= async (req,res,next) => {
    //loza-gabriel-m4tnrlwdk loza-gabriel-m4tnrlwdk
    
    const vacanteBorrada = await Vacante.findOneAndDelete(req.params.id)
    res.json({
        data: vacanteBorrada
    })
  
}