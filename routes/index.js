const express = require('express');
const homeController = require('../controller/homeController');
const vacantController =require('../controller/vacantController');
const userController = require('../controller/userController');
const router = express.Router();

module.exports = () =>{ 

    router.get('/vacante/nueva',vacantController.newVacantForm );
    router.get('/', homeController.showjobs);
    router.post('/vacantes/nueva',vacantController.addVacant);
    // edit vacant 
    router.get('/vacante/editar/:url',vacantController.getVacant);
    // show vacant (only one)
    router.get('/vacantes/:url',vacantController.showVacant);
    // edit vacant 
    router.post('/vacantes/editar/:url', vacantController.editVacant)
    // create count
    router.get('/crear-cuenta', userController.getCountForm);
    router.post('/crear-cuenta', userController.createCountForm);
        return router;
 }

