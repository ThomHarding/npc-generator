const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .post('/', (req, res) => {
    res.send('POST request to the homepage');
  })
  
  .use('/create/:age/:species/:background/:name/:regionid', async (req, res) => {
    const charAge = req.params.age;
    const charSpecies = req.params.species;
    const charName = req.params.name;
    const charRegion = req.params.regionid;
    const charBackground = req.params.background;
    try {
      const item = await Character.insertForm(charAge, charSpecies, charBackground, charName, charRegion);
      res.json(item);
    } catch (e) {
      console.log('ya broke it', e);
    }
  })

  .use('/insert/:regionid', async (req, res) => {
    const item = await Character.insert(req.params.regionid);
    res.json(item);
  })
  
  .use('/insert', async (req, res) => {
    const item = await Character.insert(3);
    res.json(item);
  })

  .use('/allcharacters', async(req, res) => {
    const characters = await Character.getAll();
    res.json(characters);
  })
  
;
