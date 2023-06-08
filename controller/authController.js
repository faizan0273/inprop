const Admin = require('../models/adminSchema');
const Agent = require('../models/agentSchema');
const Property = require('../models/propertySchema');
const Project = require('../models/projectSchema');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'DO00VEVHP872BQHADNCW',
  secretAccessKey: 'WT1H8ePdR4p8+yoLJsZ6qpod7q0gcBcJ+8kcFx34d2s',
  s3ForcePathStyle: true,
});
const authController={
    async signup(req, res,next) {
        try {
            // Logic for adding an agent
            const adminData = req.body;
            const {username} = req.body;
            const checkExists= await Admin.find({username});
            if(!checkExists){
              const admin = await Admin.create(adminData);
              return res.status(201).json(admin);
            }
            return res.status(201).json({message:"Admin already exists"});
          } catch (error) {
            next(error);
          }
      },
    async login(req, res) {
        try {
          const { username, password } = req.body;
          const admin = await Admin.findOne({ username });
          if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
          }
    
          if (admin.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
          }
          return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
          
        }
      },
    
      async logout(req, res, next) {
        try {    
          return res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
          next(error);
        }
      },
    
      async addAgent(req, res, next) {
        try {
          // Logic for adding an agent
          if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
          }
      
          const file = req.files.profileImage[0];
          // Read the file data and convert it to a buffer
          const fileData = fs.readFileSync(file.path);
      
          // Generate a unique filename or use any other logic to determine the filename
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          
          // Upload the file to DigitalOcean Spaces
          const params = {
            Body: fileData, // Pass the fileData buffer as the Body parameter
            Bucket: 'technician',
            Key: filename
          };
      
          s3.putObject(params,async function(err, data) {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              const agentData = req.body;
              const updatedAgentData = {
                ...agentData, // Copy all properties from agentData
                profilePicture: "https://dolphin-app-ldyyx.ondigitalocean.app/image/"+filename // Update the profileImage property
              };
              fs.unlinkSync(file.path);
              const agent = await Agent.create(updatedAgentData);
              return res.status(201).json(agent);
            }
          });
          
        } catch (error) {
          next(error);
        }
      },

      async getAgentProfilePicture(req, res, next) {
        const bucketName = 'technician';
        const imageKey = `${req.params.imageName}`;
        const imageStream = fs.createWriteStream(imageKey);
        const getObjectParams = { Bucket: bucketName, Key: imageKey };
        const s3Stream = s3.getObject(getObjectParams).createReadStream();
        s3Stream.pipe(imageStream)
          .on('error', (err) => {
            res.status(501).send('Internal Server Error');
          })
          .on('close', () => {
            res.sendFile(imageKey, { root: __dirname }, (err) => {
              if (err) {
                res.status(500).send('Internal Server Error');
              }
            });
          });
      },
    
      async deleteAgent(req, res, next) {
        try {
          // Logic for deleting an agent
          const agentId = req.params.id;
    
          const deletedAgent = await Agent.findByIdAndDelete(agentId);
    
          if (!deletedAgent) {
            return res.status(404).json({ error: 'Agent not found' });
          }
    
          return res.status(200).json({ message: 'Agent deleted successfully' });
        } catch (error) {
          next(error);
        }
      },
    
      async updateAgent(req, res, next) {
        try {
          // Logic for updating an agent
          const agentId = req.params.id;
          const agentData = req.body;
    
          const updatedAgent = await Agent.findByIdAndUpdate(agentId, agentData, {
            new: true,
          });
    
          if (!updatedAgent) {
            return res.status(404).json({ error: 'Agent not found' });
          }
    
          return res.status(200).json(updatedAgent);
        } catch (error) {
          next(error);
        }
      },
    
      async getAgent(req, res, next) {
        try {
          // Logic for getting an agent
          const agentId = req.params.id;
    
          const agent = await Agent.findById(agentId);
    
          if (!agent) {
            return res.status(404).json({ error: 'Agent not found' });
          }
    
          return res.status(200).json(agent);
        } catch (error) {
          next(error);
        }
      },
      async getAllAgent(req, res, next) {
        try {
    
          const agent = await Agent.find();
    
          if (!agent) {
            return res.status(404).json({ error: 'Agent not found' });
          }
    
          return res.status(200).json(agent);
        } catch (error) {
          next(error);
        }
      },
      async addProperty(req, res, next) {
        try {
          // Logic for adding a property
          const propertyData = req.body;
      
          // Check if there are any files uploaded
          if (req.files && req.files.length > 0) {
            const propertyImages = [];
      
            // Process each uploaded file
            for (const file of req.files) {
              const fileData = fs.readFileSync(file.path);
              const filename = `${uuidv4()}${path.extname(file.originalname)}`;
      
              // Upload the file to DigitalOcean Spaces
              const params = {
                Body: fileData,
                Bucket: 'technician',
                Key: filename
              };
      
              await s3.putObject(params).promise();
      
              // Add the image URL to the propertyImages array
              propertyImages.push(`https://dolphin-app-ldyyx.ondigitalocean.app/image/${filename}`);
      
              // Remove the uploaded file
              fs.unlinkSync(file.path);
            }
      
            // Add the propertyImages array to the propertyData object
            propertyData.propertyImages = propertyImages;
          }
      
          const property = await Property.create(propertyData);
      
          return res.status(201).json(property);
        } catch (error) {
          next(error);
        }
      },
      async deleteProperty(req,res,next){
        try {
            // Logic for deleting an agent
            const propertyId = req.params.id;
      
            const deletedProperty = await Property.findByIdAndDelete(propertyId);
      
            if (!deletedProperty) {
              return res.status(404).json({ error: 'Property not found' });
            }
      
            return res.status(200).json({ message: 'Property deleted successfully' });
          } catch (error) {
            next(error);
          }
        },
    async updateProperty(req,res,next){
        try {
            // Logic for updating an agent
            const propertyId = req.params.id;
            const propertyData = req.body;
      
            const updatedproperty = await Property.findByIdAndUpdate(propertyId, propertyData, {
              new: true,
            });
      
            if (!updatedproperty) {
              return res.status(404).json({ error: 'Property not found' });
            }
      
            return res.status(200).json(updatedproperty);
          } catch (error) {
            next(error);
          }
    },
    async getProperty(req,res,next){
        try {
            // Logic for getting an agent
            const propertyId = req.params.id;
      
            const property = await Property.findById(propertyId);
      
            if (!property) {
              return res.status(404).json({ error: 'Property not found' });
            }
      
            return res.status(200).json(property);
          } catch (error) {
            next(error);
          }
    },
    async getAllProperty(req,res,next){
      try {
    
          const property = await Property.find();
    
          if (!property) {
            return res.status(404).json({ error: 'Property not found' });
          }
    
          return res.status(200).json(property);
        } catch (error) {
          next(error);
        }
  },
    async addProject(req, res, next) {
        try {
          // Logic for adding a property
          const projectData = req.body;
    
          const project = await Project.create(projectData);
    
          return res.status(201).json(project);
        } catch (error) {
          next(error);
        }
      },
    async deleteProject(req,res,next){
        try {
            // Logic for deleting an agent
            const projectId = req.params.id;
      
            const deletedProject = await Project.findByIdAndDelete(projectId);
      
            if (!deletedProject) {
              return res.status(404).json({ error: 'Project not found' });
            }
      
            return res.status(200).json({ message: 'Project deleted successfully' });
          } catch (error) {
            next(error);
          }
    },
    async updateProject(req,res,next){
        try {
            // Logic for updating an agent
            const projectId = req.params.id;
            const projectData = req.body;
      
            const updatedproperty = await Project.findByIdAndUpdate(projectId, projectData, {
              new: true,
            });
      
            if (!updatedproperty) {
              return res.status(404).json({ error: 'Project not found' });
            }
      
            return res.status(200).json(updatedproperty);
          } catch (error) {
            next(error);
          }
    },
    async getProject(req,res,next){
        try {
            // Logic for getting an agent
            const projectId = req.params.id;
      
            const project = await Project.findById(projectId);
      
            if (!project) {
              return res.status(404).json({ error: 'Project not found' });
            }
      
            return res.status(200).json(project);
          } catch (error) {
            next(error);
          }
    },
    async getAllProject(req,res,next){
      try {
          const project = await Project.find();
    
          if (!project) {
            return res.status(404).json({ error: 'Project not found' });
          }
    
          return res.status(200).json(project);
        } catch (error) {
          next(error);
        }
  },
    
}

module.exports=authController;