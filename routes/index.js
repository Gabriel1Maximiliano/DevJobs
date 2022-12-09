const express = require('express');
const homeController = require('../controller/homeController');
const vacantController = require('../controller/vacantController');
const userController = require('../controller/userController');
const router = express.Router();
const { check } = require('express-validator');


module.exports = () => {

    router.get('/vacante/nueva', vacantController.newVacantForm);
    router.get('/', homeController.showjobs);
    router.post('/vacantes/nueva', vacantController.addVacant);
    // edit vacant 
    router.get('/vacante/editar/:url', vacantController.getVacant);
    // show vacant (only one)
    router.get('/vacantes/:url', vacantController.showVacant);
    // edit vacant 
    router.post('/vacantes/editar/:url', vacantController.editVacant)
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
     router.get('/iniciar-sesion', userController.logInUser)
    return router;
}

