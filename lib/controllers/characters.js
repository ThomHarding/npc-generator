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

// .use('/insert/:regionid/:name', async (req, res, next) => {
//   try {
//     const item = await Character.namedInsert(req.params.regionid, req.params.name);
//     res.json(item);
//   } catch (e) {
//     next(e);
//   }
// })

  .use('/insert/:regionid', async (req, res) => {
    const item = await Character.insert(req.params.regionid);
    res.json(item);
  })

  .use('/insert', async (req, res) => {
    const item = await Character.insert(3);
    res.json(item);
  })



;
