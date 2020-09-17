const express = require('express');
const router = express.Router();
const rolesController = require('./Controller/roles.controller');
 
router.post('/signup', rolesController.signup);
 
router.post('/login', rolesController.login);
 
router.get('/user/:userId', rolesController.allowIfLoggedin, rolesController.getUser);
 
router.get('/users', rolesController.allowIfLoggedin, rolesController.grantAccess('readAny', 'profile'), rolesController.getUsers);
 
router.put('/user/:userId', rolesController.allowIfLoggedin, rolesController.grantAccess('updateAny', 'profile'), rolesController.updateUser);
 
router.delete('/user/:userId', rolesController.allowIfLoggedin, rolesController.grantAccess('deleteAny', 'profile'), rolesController.deleteUser);
 
module.exports = router;