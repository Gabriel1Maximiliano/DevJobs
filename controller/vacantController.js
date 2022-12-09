
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
    const vacante = await Vacante.findOne( {url:req.params.url }).lean();
    if(!vacante){
        return next();
    }
    res.render('vacante',{
        vacante,
        nombrePágina:vacante.titulo,
        barra:true,

    })
}
exports.getVacant=async(req,res,next)=>{
   

    const vacante = await Vacante.findOne({url:req.params.url }).lean();
    if(!vacante){
        return next();
    };
  

     res.render('editar-vacante',{
         vacante,
         nombrePágina:`Editar-${vacante.titulo}`
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