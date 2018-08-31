const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectActionRoutes = require('./projectActions/projectActionRoutes');
const projectRoutes = require('./projects/projectRoutes');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());


server.get('/', (req, res) => {
  res.send('Hello');
})


server.use('/actions', projectActionRoutes);
server.use('/projects', projectRoutes);


server.listen(7000, () => console.log('Listening... 7000'));
