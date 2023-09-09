const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/', async(req, res) => {
    const characters = await Character.getAll();
    res.json(characters);
  })
  .put('/:regionid', async ({ name, regionid }, res, next) => {
    //unless body has region id?
    const regionInfo = Character.fetchRegionInfo(regionid);
    //region info just be what you get from selecting id = regionid on region
    const species = generateSpecies(regionInfo);
    const age_group = generateAge();
    const background = generateBackground(regionInfo);
    const alignment_good_evil = generateGoodEvil(regionInfo);
    const alignment_law_chaos = generateLawChaos(regionInfo);
    const technophobia = generateTechnophobe(regionInfo);
    const cult_member = generateCultMember();
    try {
      const item = await Character.insert(name, species, age_group, background, regionid, alignment_good_evil, alignment_law_chaos, technophobia, cult_member);
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

function generateSpecies(regionInfo) {
  const species = regionInfo.slice(7); //all columns but the first 7 as those aren't species
  const rng = Math.round(Math.random() * 100);
  for (let i = 0; i < species.length; i++) {
    if (rng >= species[i]) {
      return 'human';//the name of the row? wait how do i do that
    }
  }
}

function generateAge() {
  const rngAge = Math.round(Math.random() * 10);
  if (rngAge === 0) {
    return 1;
  } else if (rngAge > 0 <= 2) {
    return 2;
  } else if (rngAge > 2 <= 8) {
    return 3;
  } else {
    return 4;
  }
}

function generateBackground(regionInfo) {
  const isPrefBackground = Math.round(Math.random() * 100);
  if (isPrefBackground <= 30) {
    return regionInfo.pref_background;
  } else {
    return Math.round(Math.random() * 27);
  }
}

function generateGoodEvil(regionInfo) {
  const isPrefGoodEvil = Math.round(Math.random() * 100);
  if (isPrefGoodEvil <= 50) {
    return regionInfo.avg_align_good_evil;
  } else {
    return Math.round(Math.random() * 100);
  }
}

function generateLawChaos(regionInfo) {
  const isPrefLawChaos = Math.round(Math.random() * 100);
  if (isPrefLawChaos <= 50) {
    return regionInfo.pref_avg_align_law_chaos;
  } else {
    return Math.round(Math.random() * 100);
  }
}

function generateTechnophobe(regionInfo) {
  const isPrefTechnophobe = Math.round(Math.random() * 100);
  if (isPrefTechnophobe <= 60) {
    return regionInfo.pref_Technophobe;
  } else {
    return Math.round(Math.random() * 100);
  }
}

function generateCultMember() {
  const isCultMember = Math.round(Math.random() * 100);
  return (isCultMember <= 2);
}
