// define tools express and router
const express = require('express')
const Router = express.Router()

// import all controller
const {dashboardController} = require('./../controllers')

Router.get('/getDash', dashboardController.getDash)



module.exports = Router