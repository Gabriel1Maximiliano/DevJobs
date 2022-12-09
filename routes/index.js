const express = require('express');
const homeController = require('../controller/homeController');
const vacantController = require('../controller/vacantController');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const router = express.Router();
const { check } = require('express-validator');


module.exports = () => {

    router.get('/vacantes/nueva',vacantController.newVacantForm);
    router.get('/', homeController.showjobs);
    router.post('/vacantes/nueva',authController.userVerification, vacantController.addVacant);
    // edit vacant 
    router.get('/vacante/editar/:url',authController.userVerification, vacantController.getVacant);
    // show vacant (only one)
    router.get('/vacante/:url',authController.userVerification, vacantController.showVacant);
    // edit vacant 
    router.post('/vacantes/editar/:url', authController.userVerification,authController.userVerification,vacantController.editVacant)
    // create count 
    router.get('/crear-cuenta', userController.getCountForm); //confirmar
    router.post('/crear-cuenta', [check('nombre', 'El nombre es oligatorio').notEmpty(),
    check('nombre', 'El nombre debe tener al menos tres caracteres').isLength({ min: 3 }),
    check('email', 'El email es Obligatorio').notEmpty(),
    check('email', 'El email ingresado es inválido').isEmail(),
    check('password', 'El password es Obligatorio').notEmpty(),
    check('password', 'El password ingresado es inválido').isLength({ min: 3 }),
    check('confirmar', 'El password es Obligatorio').notEmpty(),
    check('confirmar', 'El password ingresado es inválido').isLength({ min: 3 }),
    check('confirmar', 'El ambas claves deben ser iguales').equals('password')
    ], userController.createCountForm);
     // user authentication 
     router.get('/iniciar-sesion', userController.logInUser);
     router.post('/iniciar-sesion', authController.authenticateUser);
  // panel administration
  router.get('/administracion', authController.userVerification,authController.showPanel)
  //edit perfil
  router.get('/editar-perfil',authController.userVerification,
  userController.editProfile) 
    return router;
}

