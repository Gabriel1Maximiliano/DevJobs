exports.newVacantForm = (req,res) => {
    res.render('nuevavacante'
    ,{
        nombrePágina:'Nueva Vacante',
        tagline:'Llena el formulario y publica tu vacante '
    })
} 