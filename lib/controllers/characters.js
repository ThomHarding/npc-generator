const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/', async(req, res) => {
    console.log('you know at least get works');
    const characters = await Character.getAll();
    res.json(characters);
  })
  
  .post('/', (req, res) => {
    console.log('lpease let me die');
    res.send('POST request to the homepage');
  })

  .use('/testinsert', async (req, res) => {
    const item = await Character.testInsert(3);
    res.json(item);
  })

  .post('/create/:regionid/:name', async ({ name, body }, res, next) => {
    console.log('AAAAAAAAAAAAAAAAAAA');
    try {
      const item = await Character.insert(name, body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

;
