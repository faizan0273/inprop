const express = require('express')
const cors = require("cors");
const dbConnect= require('./database/index')
const {PORT}= require("./config/index");
const router= require("./routes/index");
const app = express()
const port = PORT


dbConnect();
app.use(cors());
app.use(express.json());
app.use(router);
app.get('/', (req, res) => {
  res.send('Server is running!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})