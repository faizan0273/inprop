const express= require('express');
const router=express.Router();
const authController=require('../controller/authController')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, filename+ ext);
    }
  });
  var upload = multer({ storage: storage });

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
router.post('/addAgent',upload.fields([{ name: 'profileImage', maxCount: 1 }]),authController.addAgent)
//read
router.get('/getAgent/:id',authController.getAgent)
//update
router.put('/updateAgent/:id',authController.updateAgent)
//delete
router.delete('/deleteAgent/:id',authController.deleteAgent)
//getall
router.get('/getAllAgent',authController.getAllAgent)
//get Agent Profile Picture
router.get('/image/:imageName',authController.getAgentProfilePicture)

//property
//create
router.post('/addProperty', upload.array('propertyImages', 5), authController.addProperty);
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