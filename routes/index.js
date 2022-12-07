const express = require('express');
const homeController = require('../controller/homeController');
const router = express.Router();

module.exports = () =>{
    router.use('/', homeController.showjobs);

       return router;
}