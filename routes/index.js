const express= require('express');
const router=express.Router();
const authController=require('../controller/authController')

//testing

router.get('/test',(req,res)=>res.json({mesg:"Hello"}))

//admin
//signup
router.post('/signup',authController.signup)
//login
router.post('/login',authController.login)
//logout
router.post('/logout',authController.logout)
//refresh

//agent
//create
router.post('/addAgent',authController.addAgent)
//read
router.get('/getAgent/:id',authController.getAgent)
//update
router.put('/updateAgent/:id',authController.updateAgent)
//delete
router.delete('/deleteAgent/:id',authController.deleteAgent)
//getall
router.get('/getAllAgent',authController.getAllAgent)

//property
//create
router.post('/addProperty',authController.addProperty)
//read
router.get('/getProperty/:id',authController.getProperty)
//update
router.put('/updateProperty/:id',authController.updateProperty)
//delete
router.delete('/deleteProperty/:id',authController.deleteProperty)
//getall
router.get('/getAllProperty',authController.getAllProperty)

//project
//create
router.post('/addProject',authController.addProject)
//read
router.get('/getProject/:id',authController.getProject)
//update
router.put('/updateProject/:id',authController.updateProject)
//delete
router.delete('/deleteProject/:id',authController.deleteProject)
//getall
router.get('/getAllProject',authController.getAllProject)

module.exports=router;