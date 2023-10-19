const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/', async(req, res) => {
    const characters = await Character.getAll();
    res.json(characters);
  })
  
  .post('/', (req, res) => {
    res.send('POST request to the homepage');
  })

  .use('/insert/:regionid', async (req, res) => {
    console.log('req param ', req.params.regionid);
    const item = await Character.insert(req.params.regionid);
    res.json(item);
  })
  
  .use('/insert', async (req, res) => {
    const item = await Character.insert(3);
    res.json(item);
  })

  .post('/create/:regionid/:name', async ({ name, body }, res, next) => {
  
    try {
      const item = await Character.insert(name, body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })
  
  
;
