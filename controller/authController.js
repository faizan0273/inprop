const Admin = require('../models/adminSchema');
const Agent = require('../models/agentSchema');
const Property = require('../models/propertySchema');
const Project = require('../models/projectSchema');

const authController={
    async signup(req, res,next) {
        try {
            // Logic for adding an agent
            const adminData = req.body;
            const admin = await Admin.create(adminData);
      
            return res.status(201).json(admin);
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
          const agentData = req.body;
    
          const agent = await Agent.create(agentData);
    
          return res.status(201).json(agent);
        } catch (error) {
          next(error);
        }
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