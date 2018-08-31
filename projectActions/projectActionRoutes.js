const express = require('express');
const actionModel = require('../data/helpers/actionModel');

const router = express.Router();


router.get('/', (req, res) => {
  actionModel.get()
  .then(actions => {
    res.status(200).json(actions);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error getting actions'});
  });
})


router.get('/:id', (req, res) => {
  const { id } = req.params;

  actionModel.get(id)
  .then(action => {
    action === undefined || action.length === 0 ? // how should I handle this?? Returns Obj
    res.status(400).json({message: 'Id is not valid'})
    :
    res.status(200).json(action);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error getting action'});
  });
})


router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;

  !project_id || !description || !notes ?
  res.status(400).json({message: 'You need a project ID, description, AND notes'})
  :
  null

  const body = {project_id, description, notes};

  actionModel.insert(body)
  .then(action => {
    res.status(200).json(action);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error adding an action'});
  });
})


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;

  !project_id && !description && !notes ?
  res.status(400).json({message: 'You need a project ID, description, OR notes'})
  :
  null

  const body = {project_id, description, notes};

  actionModel.update(id, body)
  .then(action => {
    action === null ? // returns null when id not found
    res.status(400).json({message: 'Id is not valid'})
    :
    res.status(200).json(action);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error updating the action'});
  });
})


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  actionModel.remove(id)
  .then(action => {
    action === 0 ? // returns 0 when id not found
    res.status(400).json({message: 'Id is not valid'})
    :
    res.status(200).json(action);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error removing action'});
  });
})


module.exports = router;
