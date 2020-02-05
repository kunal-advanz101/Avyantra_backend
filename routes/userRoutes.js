const express = require('express')
const userController = require('../controllers/userController')

const urouter = express.Router()

urouter.post('/resetPassword',userController.resetPassword);

urouter.post('/login',userController.login);

urouter.post('/forgotPassword',userController.forgetPassword)

urouter.post('/signup',userController.signup)

// urouter.post('/search_general',userController.searchGeneral)

// urouter.post('/search_parent_hospital',userController.searchParentHospital)

module.exports= urouter
