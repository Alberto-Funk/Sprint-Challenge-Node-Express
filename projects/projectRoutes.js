const express = require('express');
const projectModel = require('../data/helpers/projectModel');

const router = express.Router();


router.get('/', (req, res) => {
  projectModel.get()
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error getting projects'})
  });
})


router.get('/:id', (req, res) => {
  const { id } = req.params;

  projectModel.get(id)
  .then(project => {
    project === null ?
    res.status(400).json({message: 'Id is not valid'})
    :
    res.status(200).json(project);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error getting projects'})
  });
})


router.get('/:id/actions', (req, res) => {
  const { id } = req.params;

  projectModel.getProjectActions(id)
  .then(project => {
    console.log(project)
    // Unable to handle due to what the db returns -> if !project(id) || project(id) with no actions = []
    project.length === 0 ? 
    res.status(400).json({message: 'Id is not valid'})
    :
    res.status(200).json(project);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error getting projects'})
  });
})


router.post('/', (req, res) => {
  const { name, description } = req.body;

  !name || !description ?
  res.status(400).json({message: 'You need a name AND description'})
  :
  null

  const body = {name, description};

  projectModel.insert(body)
  .then(project => {
    res.status(200).json(project);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error adding an project'});
  });
})


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  !name && !description ?
  res.status(400).json({message: 'You need a description OR name'})
  :
  null

  const body = {name, description};

  projectModel.update(id, body)
  .then(project => {
    project === null ?
    res.status(400).json({message: 'Id is not valid'})
    :
    res.status(200).json(project);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error updating the project'});
  });
})


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  projectModel.remove(id)
  .then(project => {
    project === 0 ?
    res.status(400).json({message: 'Id is not valid'})
    :
    res.status(200).json(project);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error removing projects'})
  });
})


module.exports = router;
