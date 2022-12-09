
const passport = require('passport');
exports.authenticateUser = passport.authenticate('local',{
    successRedirect:'/adminitracion',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true
})