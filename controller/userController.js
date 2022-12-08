exports.createCountForm=(req,res,next) => {
    res.render('crear-cuenta',{
        nombrePágina:'Crea tu cuenta en devJobs',
        tagline:'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
}