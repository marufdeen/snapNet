const { Router } = require('express');
const citizenController = require('../controllers/citizenController');
const verifyToken = require('../middlewares/verifyToken');   
const router = Router();

 
router.post('/citizens', verifyToken, citizenController.createCitizen);
   
module.exports = router;