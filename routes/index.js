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
    //create vacant
    router.post('/vacantes/nueva',authController.userVerification,[check('titulo', 'Agrega un Titulo a la Vacante').notEmpty(),
    check('empresa', 'Agrega una Empresa').notEmpty(),
    check('ubicacion', 'Agrega una Ubicación').notEmpty(),
    check('contrato', 'Selecciona el Tipo de Contrato').notEmpty(),
    check('skills', 'Agrega al menos una habilidad').notEmpty()], vacantController.addVacant);
    // edit vacant 
    router.get('/vacante/editar/:url',authController.userVerification, vacantController.getVacant);
    // show vacant (only one)
    router.get('/vacante/:url',authController.userVerification, vacantController.showVacant);
    // edit vacant 
    router.post('/vacantes/editar/:url', authController.userVerification,[check('titulo', 'Agrega un Titulo a la Vacante').notEmpty(),
    check('empresa', 'Agrega una Empresa').notEmpty(),
    check('ubicacion', 'Agrega una Ubicación').notEmpty(),
    check('contrato', 'Selecciona el Tipo de Contrato').notEmpty(),
    check('skills', 'Agrega al menos una habilidad').notEmpty()],authController.userVerification,vacantController.editVacant)
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
  userController.getProfile);
  router.post('/editar-perfil',authController.userVerification,
  userController.editProfile);
  // close session 
  router.get('/cerrar-sesion',authController.userVerification,
  authController.getSession,)
    return router;
}

