const express = require('express');
const homeController = require('../controller/homeController');
const vacantController =require('../controller/vacantController');
const router = express.Router();

module.exports = () =>{ 
    router.get('/vacante/nueva',vacantController.newVacantForm );
    router.get('/', homeController.showjobs);
    router.post('/vacantes/nueva',vacantController.addVacant);
    // edit vacant 
    router.get('/vacante/editar/:url', vacantController.editVacant);
    // show vacant (only oune)
router.get('/vacantes/:url',vacantController.showVacant);

       return router;
}

