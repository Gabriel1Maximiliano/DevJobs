exports.showjobs = (req,res) => {
    res.render('home',{
        tagline:'Encuentra y publica trabajos para desarrolladores web',
        barra:true,
        boton:true 
    })
}