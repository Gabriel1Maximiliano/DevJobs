exports.newVacantForm = (req,res) => {
    res.render('nueva-vacante'
    ,{
        nombrePágina:'Nueva Vacante',
        tagline:'Llena el formulario y publica tu vacante '
    })
} 